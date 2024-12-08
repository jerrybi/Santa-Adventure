import { HTMLAttributeAnchorTarget } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { CONTACT_US_EMAIL } from '@/lib/env';

function InfoLink({
  href,
  title,
  target,
  type,
}: {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  type?: string;
}) {
  return (
    <Link
      href={href}
      title={title}
      className='whitespace-nowrap text-xs hover:opacity-70 lg:text-sm'
      target={target}
      type={type}
    >
      {title}
    </Link>
  );
}

export default async function Footer() {
  const t = await getTranslations('Footer');

  const SupportLinks = [
    {
      title: 'AIStage',
      text: 'AIStage',
      href: 'https://aistage.net',
    },
    {
      title: 'Sprunki Mod',
      text: 'Sprunki Mod',
      href: 'https://sprunki-mod.com/',
    },
    {
      title: 'toolpilot.ai',
      text: 'toolpilot.ai',
      href: 'https://toolpilot.ai',
    },
    {
      title: 'AI WITH ME',
      text: 'AIWITH.ME',
      href: 'https://aiwith.me',
    },
    {
      title: 'ToolsFine',
      text: 'ToolsFine',
      href: 'https://toolsfine.com/',
    },
    {
      title: 'AI Tool Center',
      text: 'AI Tool Center',
      href: 'https://aitoolcenter.com/',
    },
    {
      title: 'AI Tool Net',
      text: 'AI Tool Net',
      href: 'https://www.aitoolnet.com/',
    },
    {
      title: 'Dang',
      text: 'Dang',
      href: 'https://dang.ai/',
    },
  ];

  const INFO_LIST = [
    {
      title: t('privacy'),
      href: '/privacy-policy',
    },
    {
      title: t('termsConditions'),
      href: '/terms-of-service',
    },
  ];

  return (
    <footer className='w-full bg-gradient-to-r from-green-950/95 via-red-950/95 to-green-950/95 backdrop-blur-sm border-t border-white/10'>
      <div className='mx-auto flex min-h-[251px] max-w-pc flex-col items-center justify-between p-10 pb-5 lg:h-[180px] lg:flex-row lg:px-0 lg:pb-10'>
        <div className='flex flex-col items-center lg:items-stretch'>
          <p className='text-xl font-bold text-white lg:h-8 lg:text-[32px]'>{t('title')}</p>
          <p className='text-l'>{t('subTitle')}</p>
        </div>
        <div className='mt-5 flex flex-col items-center gap-y-5 lg:mt-0 lg:flex-row lg:items-stretch lg:gap-x-10'>
          <div className='flex w-full gap-2 flex-wrap'>
            {SupportLinks.map((item) => (
              <a
                href={item.href}
                key={item.href}
                target='_blank'
                rel='noreferrer'
                className='text-xs hover:opacity-70 lg:text-sm text-green-100/80'
                title={item.title}
              >
                {item.text}
              </a>
            ))}
          </div>
          <div className='grid grid-cols-2 gap-x-10 gap-y-5 lg:grid-cols-1 lg:gap-3'>
            {INFO_LIST.map((item) => (
              <InfoLink key={item.href} href={item.href} title={item.title} />
            ))}
            <a
              href={`mailto:${CONTACT_US_EMAIL}`}
              className='whitespace-nowrap text-xs hover:opacity-70 lg:text-sm text-green-100/80 hover:text-red-400'
              title={t('contactUs')}
              type='email'
            >
              {t('contactUs')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
