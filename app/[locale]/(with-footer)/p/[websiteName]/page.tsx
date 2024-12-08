import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { query } from '@/db/pg/client';
import { NavigationCategory } from '@/db/supabase/types';
import { getTranslations } from 'next-intl/server';

import { fillProductDetail, getCategoryField, getProductDetailField, WebNavigationDetailData } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import MarkdownProse from '@/components/MarkdownProse';
import WebNavCard2 from '@/components/webNav/WebNavCard2';
import { TagList1 } from '@/app/[locale]/(with-footer)/(home)/Tag';

export const revalidate = 3600;

async function getProductDetail(name: string, locale: string) {
  const field = getProductDetailField(locale);
  const { rows: data } = await query(`select ${field} from product_detail where url_key = $1 or name = $2`,
    [decodeURIComponent(name), decodeURIComponent(name)]);
  if (!data || !data[0]) {
    return null;
  }
  return data;
}

async function getProductCategory(id: number, locale: string) {
  const field = getCategoryField(locale);
  const { rows: tags } = await query('select * from product_tag where product_id = $1', [id]);
  let categoryList: NavigationCategory[] | null = null;
  if (tags && tags.length > 0) {
    const tagIds = tags.map((i) => i.tag_id);
    const placeholders = tagIds.map((_, index) => `$${index + 1}`).join(', ');
    const { rows } = await query(`select ${field} from category where id in (${placeholders})`,
      tagIds);
    categoryList = rows;
  }
  return categoryList;
}

async function getRelateProductDetail(locale: string) {
  const field = getProductDetailField(locale);
  const { rows: list } = await query(`select ${field} from product_detail order by collection_time desc limit 3 offset 1`, []);
  if (!list || !list[0]) {
    return list;
  }
  const navigationDetailList = list.map((item: WebNavigationDetailData) => fillProductDetail(item, locale));
  return navigationDetailList;
}

export async function generateMetadata({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ai',
  });
  const getCachedProductDetail = unstable_cache(async (name, lang) => getProductDetail(name, lang),
    ['product-data'],
    { revalidate: 3600 });
  const data = await getCachedProductDetail(websiteName, locale);
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    title:
      data && data[0]
        ? (data[0][`title_${locale}` as keyof (typeof data)[0]] as string) || data[0].title
        : `${t('titleSubfix')}`,
    description:
      data && data[0] ? (data[0][`content_${locale}` as keyof (typeof data)[0]] as string) || data[0].content : '',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      canonical: `/${path}/p/${websiteName}`,
      // languages: {
      //   'zh-CN': `/zh/p/${websiteName}`,
      //   'zh-TW': `/tw/p/${websiteName}`,
      //   'ko-KR': `/ko/p/${websiteName}`,
      //   'ja-JP': `/ja/p/${websiteName}`,
      //   'pt-BR': `/pt/p/${websiteName}`,
      //   'es-ES': `/es/p/${websiteName}`,
      //   'de-DE': `/de/p/${websiteName}`,
      //   'fr-FR': `/fr/p/${websiteName}`,
      //   'vi-VN': `/vi/p/${websiteName}`,
      //   'ar-EG': `/ar/p/${websiteName}`,
      //   'nl-NL': `/nl/p/${websiteName}`,
      //   'pl-PL': `/pl/p/${websiteName}`,
      //   'it-IT': `/it/p/${websiteName}`,
      //   'in-ID': `/in/p/${websiteName}`,
      //   'ms-MY': `/ms/p/${websiteName}`,
      //   'th-TH': `/th/p/${websiteName}`,
      //   'tr-TR': `/tr/p/${websiteName}`,
      //   'ru-RU': `/ru/p/${websiteName}`,
      //   'x-default': `/p/${websiteName}`,
      // },
    },
  };
}

export default async function Page({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}) {
  const getCachedProductDetail = unstable_cache(async (name, lang) => getProductDetail(name, lang),
    ['product-data'],
    { revalidate: 3600 });
  const data = await getCachedProductDetail(websiteName, locale);
  if (!data || !data[0]) {
    notFound();
  }
  const getCachedProductCategory = unstable_cache(async (id, lang) => getProductCategory(id, lang),
    ['product-data'],
    { revalidate: 3600 });
  const categoryList = await getCachedProductCategory(data[0].id, locale);

  const getCachedRelateProductDetail = unstable_cache(async (lang) => getRelateProductDetail(lang),
    ['product-data'],
    { revalidate: 3600 });
  const relateList = await getCachedRelateProductDetail(locale);

  return (
    <div className='w-full'>
      <div className='flex flex-col px-6 py-5'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='my-1 space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-christmas-gold text-2xl lg:text-4xl'>
              {data[0][`title_${locale}` as keyof (typeof data)[0]] || data[0].title}
            </h1>
            <h2 className='text-christmas-red text-xl lg:text-2xl text-wrap'>
              {data[0][`content_${locale}` as keyof (typeof data)[0]] || data[0].content}
            </h2>
          </div>
          <div className='mt-5'>
            {categoryList ? (
              <TagList1
                data={categoryList.map((item) => ({
                  id: String(item.id),
                  name: locale ? (item[`name_${locale}` as keyof typeof item] as string) || item.name : item.name,
                  href: `/c/${item.category_name}`,
                }))}
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='flex-1 text-white md:w-3/4'>
            <div className='mx-auto mt-5 flex h-fit w-full flex-col items-center justify-between bg-slate-50 dark:bg-slate-900 md:h-[650px] md:flex-row'>
              <iframe
                title={data[0].name}
                id='game'
                width='100%'
                height='100%'
                className='min-h-[300px] bg-slate-50 dark:bg-slate-900'
                frameBorder='0'
                scrolling='no'
                allowFullScreen
                src={data[0].website_data}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 p-4 text-white w-[210px]'>
            {relateList?.map((item) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <WebNavCard2 key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
      <Separator className='bg-[#010101]' />
      <div className='mb-5 mt-5 px-3 lg:px-0'>
        <MarkdownProse markdown={(data[0][`detail_${locale}` as keyof (typeof data)[0]] as string) || data[0].detail} />
      </div>
    </div>
  );
}
