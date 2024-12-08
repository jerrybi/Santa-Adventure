import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { query } from '@/db/pg/client';
import { getTranslations } from 'next-intl/server';

import { fillProductDetail, getProductDetailField, WebNavigationDetailData } from '@/lib/data';
import { notFound } from 'next/navigation';
import WebNavCard2 from '@/components/webNav/WebNavCard2';
import { Separator } from '@/components/ui/separator';
import MarkdownProse from '@/components/MarkdownProse';

const websiteName = 'mr-and-mrs-santa-christmas-adventure';

async function getProductDetail(locale: string) {
  const field = getProductDetailField(locale);
  const { rows: data } = await query(`select ${field} from product_detail where url_key = $1`,
    [websiteName]);
  if (!data || !data[0]) {
    return null;
  }
  return data;
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

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });
  const getCachedProductDetail = unstable_cache(async (lang) => getProductDetail(lang),
    ['home-data'],
    { revalidate: 300 });
  const data = await getCachedProductDetail(locale);
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: data && data[0]
      ? (data[0][`title_${locale}` as keyof (typeof data)[0]] as string) || data[0].title
      : `${t('title')}`,
    description: data && data[0] ? (data[0][`content_${locale}` as keyof (typeof data)[0]] as string) || data[0].content : t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${path}`,
      // languages: {
      //   'zh-CN': '/zh',
      //   'zh-TW': '/tw',
      //   'ko-KR': '/ko',
      //   'ja-JP': '/ja',
      //   'pt-BR': '/pt',
      //   'es-ES': '/es',
      //   'de-DE': '/de',
      //   'fr-FR': '/fr',
      //   'vi-VN': '/vi',
      //   'ar-EG': '/ar',
      //   'nl-NL': '/nl',
      //   'pl-PL': '/pl',
      //   'it-IT': '/it',
      //   'in-ID': '/in',
      //   'ms-MY': '/ms',
      //   'th-TH': '/th',
      //   'tr-TR': '/tr',
      //   'ru-RU': '/ru',
      //   'x-default': '/',
      // },
    },
  };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const getCachedProductDetail = unstable_cache(async (lang) => getProductDetail(lang),
    ['home-data'],
    { revalidate: 300 });
  const data = await getCachedProductDetail(locale);
  if (!data || !data[0]) {
    notFound();
  }

  const getCachedRelateProductDetail = unstable_cache(async (lang) => getRelateProductDetail(lang),
    ['home-data'],
    { revalidate: 300 });
  const relateList = await getCachedRelateProductDetail(locale);
  return (
    <div className='mx-auto w-full max-w-pc'>
      <div className='w-full'>
        <div className='flex flex-col px-6 py-5'>
          <div className='flex flex-col items-center lg:items-start'>
            <div className='my-1 space-y-1 text-balance lg:space-y-3'>
              <h1 className='text-christmas-gold text-2xl lg:text-4xl'>
                {data[0][`title_${locale}` as keyof (typeof data)[0]] || data[0].title}
              </h1>
              <h2 className='text-christmas-red text-xl lg:text-2xl'>
                {data[0][`content_${locale}` as keyof (typeof data)[0]] || data[0].content}
              </h2>
            </div>
            {/*
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
            */}
          </div>
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex-1 text-white md:w-3/4'>
              <div
                className='mx-auto mt-5 flex h-fit w-full flex-col items-center justify-between bg-slate-50 dark:bg-slate-900 md:h-[650px] md:flex-row'
              >
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
          <MarkdownProse
            markdown={(data[0][`detail_${locale}` as keyof (typeof data)[0]] as string) || data[0].detail}
          />
        </div>
      </div>
    </div>
  );
}
