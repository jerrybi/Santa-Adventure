import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { query } from '@/db/pg/client';

import { fillProductDetail, getCategoryField, getProductDetailField } from '@/lib/data';
import BasePagination from '@/components/page/BasePagination';
import WebNavCardList from '@/components/webNav/WebNavCardList';

const WEB_PAGE_SIZE = 20;

export const revalidate = 3600;

async function getProduct(categoryName: string, locale: string, currentPage: number) {
  const categoryField = getCategoryField(locale);
  const { rows: category } = await query(`select ${categoryField} from category where category_name = $1`,
    [categoryName]);
  if (!category || category.length === 0) {
    return null;
  }
  const { rows: products } = await query('select * from product_tag where tag_id = $1',
    [category[0].id]);
  if (!products || products.length === 0) {
    return null;
  }
  const field = getProductDetailField(locale);
  const idsArray = products.map((i) => i.product_id);
  const placeholders = idsArray.map((_, index) => `$${index + 1}`).join(', ');
  const sLimit = `$${idsArray.length + 1}`;
  const sOffset = `$${idsArray.length + 2}`;
  const { rows: data } = await query(`select ${field} from product_detail where id in (${placeholders}) limit ${sLimit} offset ${sOffset}`,
    [...idsArray, WEB_PAGE_SIZE, (currentPage - 1) * WEB_PAGE_SIZE]);

  if (!data) {
    return null;
  }

  const list = data.map((item) => fillProductDetail(item, locale));
  return list;
}

export default async function CategoryList({
  locale,
  pageNum,
  categoryName,
}: {
  locale: string;
  pageNum?: string;
  categoryName: string;
}) {
  const currentPage = pageNum ? Number(pageNum) : 1;
  const getCachedProduct = unstable_cache(async (name, lang, page) => getProduct(name, lang, page),
    ['category-data'],
    { revalidate: 3600 });
  const dataDetailList = await getCachedProduct(categoryName, locale, currentPage);
  if (!dataDetailList) {
    notFound();
  }
  return (
    <div className='w-full flex-col justify-center items-center'>
      <WebNavCardList dataList={dataDetailList} locale={locale} />
      <div className='w-full flex justify-center items-center'>
        <BasePagination
          currentPage={currentPage}
          pageSize={WEB_PAGE_SIZE}
          total={20}
          route='/explore'
          subRoute='/page'
          className='my-5 lg:my-10'
        />
      </div>
    </div>
  );
}
