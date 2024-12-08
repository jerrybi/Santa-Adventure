import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { query } from '@/db/pg/client';
import { getTranslations } from 'next-intl/server';

import { fillProductDetail, getProductDetailField } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import Empty from '@/components/Empty';
import Faq from '@/components/Faq';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import Loading from './loading';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export const revalidate = 1800;

export default async function Page({ params }: { params: { search?: string; locale: string } }) {
  const t = await getTranslations('Home');
  // const categoryField = getCategoryField(params.locale);
  // const { data: categoryList } = await supabase.from('category').select(categoryField as '*');
  const field = getProductDetailField(params.locale);
  const { rows: dataList } = await query(`select ${field} from product_detail where detail ilike $1`,
    [`%${decodeURI(params?.search || '')}%`]);

  const dataDetailList = dataList?.map((item) => fillProductDetail(item, params.locale));

  return (
    <Suspense fallback={<Loading />}>
      {/* <div className='mb-10 mt-5'> */}
      {/*  {params?.search && ( */}
      {/*    <TagList */}
      {/*      data={categoryList!.map((item) => ({ */}
      {/*        id: String(item.id), */}
      {/*        name: item[`name_${params?.locale}` as keyof typeof item] as string || item.name, */}
      {/*        href: `/c/${item.categoryName}`, */}
      {/*      }))} */}
      {/*    /> */}
      {/*  )} */}
      {/* </div> */}
      <section className='flex flex-col gap-5'>
        {dataDetailList && !!dataDetailList.length && params?.search ? (
          <>
            <h2 className='mb-1 text-left text-[18px] lg:text-2xl'>{t('result')}</h2>
            <WebNavCardList dataList={dataDetailList!} locale={params.locale} />
          </>
        ) : (
          <Empty title={t('empty')} />
        )}
      </section>
      <Separator className='mx-auto my-10 h-px w-4/5 bg-[#2C2D36] lg:my-16' />
      <Faq />
      <ScrollToTop />
    </Suspense>
  );
}
