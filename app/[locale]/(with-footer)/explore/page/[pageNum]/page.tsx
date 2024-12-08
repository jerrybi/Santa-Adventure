import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { query } from '@/db/pg/client';
import { getTranslations } from 'next-intl/server';

import ExploreList from '../../ExploreList';

export const revalidate = 21600;

async function getProductCount() {
  const { rows } = await query('select count(*) as count from product_detail', []);
  return rows[0].count;
}

export async function generateMetadata({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string | undefined };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.explore',
  });
  const currentPage = pageNum ? Number(pageNum) : 1;

  const getCachedProductCount = unstable_cache(async () => getProductCount(),
    ['explore-data'],
    { revalidate: 3600 });
  const count = await getCachedProductCount();
  let title = '';
  if (currentPage === 1) {
    title = t('title', { num: count || 1 });
  } else {
    title = t('titlePage', { page: currentPage, num: count || 1 });
  }
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    title,
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      canonical: `/${path}/explore/page/${currentPage}`,
      // languages: {
      //   'zh-CN': `/zh/explore/page/${currentPage}`,
      //   'zh-TW': `/tw/explore/page/${currentPage}`,
      //   'ko-KR': `/ko/explore/page/${currentPage}`,
      //   'ja-JP': `/ja/explore/page/${currentPage}`,
      //   'pt-BR': `/pt/explore/page/${currentPage}`,
      //   'es-ES': `/es/explore/page/${currentPage}`,
      //   'de-DE': `/de/explore/page/${currentPage}`,
      //   'fr-FR': `/fr/explore/page/${currentPage}`,
      //   'vi-VN': `/vi/explore/page/${currentPage}`,
      //   'ar-EG': `/ar/explore/page/${currentPage}`,
      //   'nl-NL': `/nl/explore/page/${currentPage}`,
      //   'pl-PL': `/pl/explore/page/${currentPage}`,
      //   'it-IT': `/it/explore/page/${currentPage}`,
      //   'in-ID': `/in/explore/page/${currentPage}`,
      //   'ms-MY': `/ms/explore/page/${currentPage}`,
      //   'th-TH': `/th/explore/page/${currentPage}`,
      //   'tr-TR': `/tr/explore/page/${currentPage}`,
      //   'ru-RU': `/ru/explore/page/${currentPage}`,
      //   'x-default': `/explore/page/${currentPage}`,
      // },
    },
  };
}

export default function page({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string | undefined };
}) {
  return <ExploreList locale={locale} pageNum={pageNum} />;
}
