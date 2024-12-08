import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.category',
  });
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    title: t('title'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      canonical: `/${path}/categories`,
      // languages: {
      //   'zh-CN': '/zh/categories',
      //   'zh-TW': '/tw/categories',
      //   'ko-KR': '/ko/categories',
      //   'ja-JP': '/ja/categories',
      //   'pt-BR': '/pt/categories',
      //   'es-ES': '/es/categories',
      //   'de-DE': '/de/categories',
      //   'fr-FR': '/fr/categories',
      //   'vi-VN': '/vi/categories',
      //   'ar-EG': '/ar/categories',
      //   'nl-NL': '/nl/categories',
      //   'pl-PL': '/pl/categories',
      //   'it-IT': '/it/categories',
      //   'in-ID': '/in/categories',
      //   'ms-MY': '/ms/categories',
      //   'th-TH': '/th/categories',
      //   'tr-TR': '/tr/categories',
      //   'ru-RU': '/ru/categories',
      //   'x-default': '/categories',
      // },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('Category');

  return (
    <div className='flex-y-center mx-auto w-full max-w-pc px-3'>
      <div className='my-5 flex flex-col gap-1 text-balance text-center lg:my-10 lg:gap-3'>
        <h1 className='text-2xl lg:text-5xl'>{t('title')}</h1>
      </div>
      {children}
    </div>
  );
}
