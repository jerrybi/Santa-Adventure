import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { query } from '@/db/pg/client';
import { getTranslations } from 'next-intl/server';

import Faq from '@/components/Faq';

async function getProductCount() {
  const { rows } = await query('select count(*) as count from product_detail', []);
  return rows[0].count;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.explore',
  });

  const getCachedProductCount = unstable_cache(async () => getProductCount(),
    ['explore-data'],
    { revalidate: 3600 });
  const count = await getCachedProductCount();
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    title: t('title', { num: count }),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      canonical: `/${path}/explore`,
      // languages: {
      //   'zh-CN': '/zh/explore',
      //   'zh-TW': '/tw/explore',
      //   'ko-KR': '/ko/explore',
      //   'ja-JP': '/ja/explore',
      //   'pt-BR': '/pt/explore',
      //   'es-ES': '/es/explore',
      //   'de-DE': '/de/explore',
      //   'fr-FR': '/fr/explore',
      //   'vi-VN': '/vi/explore',
      //   'ar-EG': '/ar/explore',
      //   'nl-NL': '/nl/explore',
      //   'pl-PL': '/pl/explore',
      //   'it-IT': '/it/explore',
      //   'in-ID': '/in/explore',
      //   'ms-MY': '/ms/explore',
      //   'th-TH': '/th/explore',
      //   'tr-TR': '/tr/explore',
      //   'ru-RU': '/ru/explore',
      //   'x-default': '/explore',
      // },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('Explore');
  const getCachedProductCount = unstable_cache(async () => getProductCount(),
    ['explore-data'],
    { revalidate: 3600 });
  const count = await getCachedProductCount();

  return (
    <div className='flex-y-center mx-auto w-full max-w-pc px-3'>
      <div className='my-5 flex flex-col gap-1 text-balance text-center lg:my-10 lg:gap-3'>
        <h1 className='text-2xl lg:text-4xl text-christmas-gold'>{t('title', { num: count && count > 500 ? count : '' })}</h1>
      </div>
      {children}
      <Faq />
    </div>
  );
}
