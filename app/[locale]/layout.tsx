import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/home/Navigation';

import './globals.css';

import { Suspense } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SpeedInsights } from '@vercel/speed-insights/next';

import GoogleAdScript from '@/components/ad/GoogleAdScript';
import PlausibleScript from '@/components/seo/PlausibleScript';
import SeoScript from '@/components/seo/SeoScript';

import Loading from './loading';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className='dark'>
      <body className='relative mx-auto flex min-h-screen flex-col bg-christmas-deepBlue text-christmas-snowWhite'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster
            position='top-center'
            toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'text-green-400',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}
          />
          <Navigation />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>
        <SeoScript />
        <PlausibleScript />
        <GoogleAdScript />
        <SpeedInsights />
      </body>
    </html>
  );
}