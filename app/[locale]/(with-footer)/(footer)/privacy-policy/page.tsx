import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Footer',
  });
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: `${t('privacy')} | ai-findr.com`,
    description: t('subTitle'),
    keywords: '',
    alternates: {
      canonical: `/${path}/privacy-policy`,
      // languages: {
      //   'zh-CN': '/zh/privacy-policy',
      //   'zh-TW': '/tw/privacy-policy',
      //   'ko-KR': '/ko/privacy-policy',
      //   'ja-JP': '/ja/privacy-policy',
      //   'pt-BR': '/pt/privacy-policy',
      //   'es-ES': '/es/privacy-policy',
      //   'de-DE': '/de/privacy-policy',
      //   'fr-FR': '/fr/privacy-policy',
      //   'vi-VN': '/vi/privacy-policy',
      //   'ar-EG': '/ar/privacy-policy',
      //   'nl-NL': '/nl/privacy-policy',
      //   'pl-PL': '/pl/privacy-policy',
      //   'it-IT': '/it/privacy-policy',
      //   'in-ID': '/in/privacy-policy',
      //   'ms-MY': '/ms/privacy-policy',
      //   'th-TH': '/th/privacy-policy',
      //   'tr-TR': '/tr/privacy-policy',
      //   'ru-RU': '/ru/privacy-policy',
      //   'x-default': '//privacy-policy',
      // },
    },
  };
}

export default async function Page() {
  const t = await getTranslations('FooterNavigation.privacyPolicy');

  return (
    <div className='prose mx-auto p-6 text-gray-200 prose-headings:text-gray-200'>
      <h1>{t('1-h1')}</h1>
      <p>{t('1-p')}</p>

      <h2>{t('2-h2')}</h2>
      <p>{t('2-p')}</p>

      <h2>{t('3-h2')}</h2>
      <p>{t('3-p')}</p>

      <h2>{t('4-h2')}</h2>
      <p>{t('4-p')}</p>

      <h2>{t('5-h2')}</h2>
      <p>{t('5-p-1')}</p>
      <ul>
        <li>{t('5-li-1')}</li>
        <li>{t('5-li-2')}</li>
        <li>{t('5-li-3')}</li>
        <li>{t('5-li-4')}</li>
      </ul>
      <p>{t('5-p-2')}</p>

      <h2>{t('6-h2')}</h2>
      <p>{t('6-p')}</p>

      <h2>{t('7-h2')}</h2>
      <p>{t('7-p')}</p>

      <h2>{t('8-h2')}</h2>
      <p>{t('8-p')}</p>
    </div>
  );
}
