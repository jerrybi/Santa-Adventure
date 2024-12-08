import { unstable_cache } from 'next/cache';
import { query } from '@/db/pg/client';
import { getTranslations } from 'next-intl/server';

import { fillProductDetail, getProductDetailField, WebNavigationDetailData } from '@/lib/data';
import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';
import WebNavCardList from '@/components/webNav/WebNavCardList';

// import { TagList } from '../(home)/Tag';

const WEB_PAGE_SIZE = 15;

// async function getCategory(locale: string) {
//   const t = await getTranslations('Explore');
//   const field = getCategoryField(locale);
//   // 取出已经有游戏的分类
//   const { rows: uniqueTags } = await query('select tag_id from product_tag', []);
//   // @ts-ignore
//   const tagIds = [...new Set(uniqueTags?.map((tag) => tag.tag_id))];
//   let inCondition = '';
//   let sLimit = '$1';
//   let sOffset = '$2';
//   if (tagIds) {
//     const placeholders = tagIds.map((_, index) => `$${index + 1}`).join(', ');
//     inCondition = ` and id in (${placeholders})`;
//     sLimit = `$${tagIds.length + 1}`;
//     sOffset = `$${tagIds.length + 2}`;
//   }
//   const { rows: data } = await query(`select ${field} from category where has_child = false ${inCondition} limit ${sLimit} offset ${sOffset}`,
//     [...tagIds, 10, 0]);
//   if (!data || !data[0]) {
//     return [];
//   }
//   const tagList = data.map((item) => ({
//     id: String(item.id),
//     name: locale ? (item[`name_${locale}` as keyof typeof item] as string) || item.name : item.name,
//     href: `/c/${item.categoryName}`,
//   }));
//   tagList.push({
//     id: '-100',
//     name: t('more'),
//     href: '/categories',
//   });
//   return tagList;
// }

async function getProductDetail(locale: string, offset: number) {
  const field = getProductDetailField(locale);
  const { rows: list } = await query(`select ${field} from product_detail order by collection_time desc limit $1 offset $2`,
    [WEB_PAGE_SIZE, offset]);
  const result = await query('select count(*) as count from product_detail', []);
  const { count } = result.rows[0];
  if (!list || !list[0]) {
    return { count, data: list };
  }
  const navigationDetailList = list.map((item: WebNavigationDetailData) => fillProductDetail(item, locale));
  return { count, data: navigationDetailList };
}

export default async function ExploreList({ locale, pageNum }: { locale?: string; pageNum?: string }) {
  const t = await getTranslations('Explore');
  const currentPage = pageNum ? Number(pageNum) : 1;

  // start and end
  const offset = (currentPage - 1) * WEB_PAGE_SIZE;
  // const getCachedCategory = unstable_cache(async (lang) => getCategory(lang));
  // const tagList = await getCachedCategory(locale);
  const getCachedProductDetail = unstable_cache(async (lang, o) => getProductDetail(lang, o),
    ['explore-data'],
{ revalidate: 3600 });
  const { count, data: navigationDetailList } = await getCachedProductDetail(locale, offset);

  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <SearchForm />
      </div>
      {/*
            <div className='mb-10 mt-5'>
        <TagList data={tagList} />
      </div>
      */}
      <div className='w-full mt-5 flex flex-col items-center gap-5'>
        <h2 className='text-left text-[18px] lg:text-[32px] text-christmas-red'>{t('all')}</h2>
        <div className='w-full flex-col justify-center items-center'>
          <WebNavCardList dataList={navigationDetailList!} locale={locale} />
          <div className='w-full flex justify-center items-center'>
            <BasePagination
              currentPage={currentPage}
              pageSize={WEB_PAGE_SIZE}
              total={count!}
              route='/explore'
              subRoute='/page'
              className='my-5 lg:my-10'
            />
          </div>
        </div>
      </div>
    </>
  );
}
