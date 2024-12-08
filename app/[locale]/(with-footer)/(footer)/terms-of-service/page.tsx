import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Footer',
  });
  const path = !locale || locale.length === 0 || locale === 'en' ? '' : locale;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: `${t('termsConditions')} | ai-findr.com`,
    description: t('subTitle'),
    keywords: '',
    alternates: {
      canonical: `/${path}/terms-of-service`,
      // languages: {
      //   'zh-CN': '/zh/terms-of-service',
      //   'zh-TW': '/tw/terms-of-service',
      //   'ko-KR': '/ko/terms-of-service',
      //   'ja-JP': '/ja/terms-of-service',
      //   'pt-BR': '/pt/terms-of-service',
      //   'es-ES': '/es/terms-of-service',
      //   'de-DE': '/de/terms-of-service',
      //   'fr-FR': '/fr/terms-of-service',
      //   'vi-VN': '/vi/terms-of-service',
      //   'ar-EG': '/ar/terms-of-service',
      //   'nl-NL': '/nl/terms-of-service',
      //   'pl-PL': '/pl/terms-of-service',
      //   'it-IT': '/it/terms-of-service',
      //   'in-ID': '/in/terms-of-service',
      //   'ms-MY': '/ms/terms-of-service',
      //   'th-TH': '/th/terms-of-service',
      //   'tr-TR': '/tr/terms-of-service',
      //   'ru-RU': '/ru/terms-of-service',
      //   'x-default': '/terms-of-service',
      // },
    },
  };
}

export default async function Page() {
  const t = await getTranslations('FooterNavigation.termsConditions');

  return (
    <div className='prose mx-auto p-6 text-gray-200 prose-headings:text-gray-200'>
      <h1>{t('1-h1')}</h1>
      <p>{t('1-p')}</p>

      <h2>{t('2-h2')}</h2>
      <ul>
        <li>{t('2-p')}</li>
      </ul>

      <h2>{t('3-h2')}</h2>
      <ul>
        <li>{t('3-p')}</li>
      </ul>

      <h2>{t('4-h2')}</h2>
      <ul>
        <li>
          {t('4-p')}{' '}
          <Link href='/terms-of-service' className='font-bold text-white hover:text-white'>
            {t('terms-of-service')}
          </Link>
        </li>
      </ul>

      <h2>{t('5-h2')}</h2>
      <ul>
        <li>{t('5-p')}</li>
      </ul>

      <h2>{t('6-h2')}</h2>
      <ul>
        <li>{t('6-p')}</li>
      </ul>

      <h2>{t('7-h2')}</h2>
      <ul>
        <li>{t('7-p')}</li>
      </ul>

      <p>{t('last-p')}</p>
    </div>
  );
}
