import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { query } from '@/db/pg/client';

import { getCategoryField } from '@/lib/data';

import CategoryList from './CategoryList';

export const revalidate = 3600;

async function getCategory(categoryName: string, locale: string) {
  const field = getCategoryField(locale);
  const { rows: data } = await query(`select ${field} from category where category_name = $1`,
    [categoryName]);
  if (!data || !data[0]) {
    return null;
  }
  return data;
}

export async function generateMetadata({
  params: { locale, categoryName },
}: {
  params: { locale: string; categoryName: string };
}): Promise<Metadata> {
  const getCachedCategory = unstable_cache(async (name, lang) => getCategory(name, lang),
    ['category-data'],
    { revalidate: 3600 });
  const data = await getCachedCategory(categoryName, locale);
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    title: data && data[0] ? (data[0][`title_${locale}` as keyof (typeof data)[0]] as string) || data[0].title : '',
    description:
      data && data[0] ? (data[0][`content_${locale}` as keyof (typeof data)[0]] as string) || data[0].content : '',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      canonical: `/${path}/c/${categoryName}`,
      // languages: {
      //   'zh-CN': `/zh/c/${categoryName}`,
      //   'zh-TW': `/tw/c/${categoryName}`,
      //   'ko-KR': `/ko/c/${categoryName}`,
      //   'ja-JP': `/ja/c/${categoryName}`,
      //   'pt-BR': `/pt/c/${categoryName}`,
      //   'es-ES': `/es/c/${categoryName}`,
      //   'de-DE': `/de/c/${categoryName}`,
      //   'fr-FR': `/fr/c/${categoryName}`,
      //   'vi-VN': `/vi/c/${categoryName}`,
      //   'ar-EG': `/ar/c/${categoryName}`,
      //   'nl-NL': `/nl/c/${categoryName}`,
      //   'pl-PL': `/pl/c/${categoryName}`,
      //   'it-IT': `/it/c/${categoryName}`,
      //   'in-ID': `/in/c/${categoryName}`,
      //   'ms-MY': `/ms/c/${categoryName}`,
      //   'th-TH': `/th/c/${categoryName}`,
      //   'tr-TR': `/tr/c/${categoryName}`,
      //   'ru-RU': `/ru/c/${categoryName}`,
      //   'x-default': `/c/${categoryName}`,
      // },
    },
  };
}

export default async function Page({
  params: { locale, pageNum, categoryName },
}: {
  params: {
    locale: string;
    pageNum: string | undefined;
    categoryName: string;
  };
}) {
  const getCachedCategory = unstable_cache(async (name, lang) => getCategory(name, lang),
    ['category-data'],
    { revalidate: 3600 });
  const data = await getCachedCategory(categoryName, locale);
  if (!data) {
    notFound();
  }
  // @ts-ignore
  const title = data[0][`h1_${locale}`] || data[0].h1;
  const description = data[0][`content_${locale}` as keyof (typeof data)[0]] || data[0].content;
  return (
    <>
      <div className='my-5 flex flex-col gap-1 text-balance text-center lg:my-10 lg:gap-3'>
        <h1 className='text-2xl lg:text-3xl text-christmas-gold'>{title}</h1>
        <h2 className='text-xl text-christmas-red'>{description}</h2>
      </div>
      <CategoryList locale={locale} pageNum={pageNum} categoryName={categoryName} />
    </>
  );
}
