/* eslint-disable react/jsx-no-target-blank */

import Link from 'next/link';
import { CircleArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { WebNavigationDetailData } from '@/lib/data';

export const revalidate = 3600;

export default async function WebNavCard2({ data }: { data: WebNavigationDetailData }) {
  const t = await getTranslations('Home');

  return (
    <div className='flex flex-col gap-3 rounded-xl bg-[#252A464A] p-1'>
      <Link href={`/p/${data.url_key}`} title={data.name} className='group relative'>
        <img
          src={data.thumbnail_url || '/images/default.png'}
          alt={data.name}
          title={data.name}
          width={150}
          height='auto'
          className='w-full rounded-xl bg-white/40 hover:opacity-70'
        />
        <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-xl bg-black bg-opacity-50 text-xl text-white transition-all duration-200 group-hover:flex'>
          {t('checkDetail')} <CircleArrowRight className='size-4' />
        </div>
      </Link>
      <div className='flex items-center justify-between px-[6px]'>
        <a href={`/p/${data.url_key}`} title={data.name} rel='nofollow' className='hover:opacity-70'>
          <h3 className='line-clamp-1 flex-1 text-sm font-bold lg:text-base'>{data.name}</h3>
        </a>
        <a href={`/p/${data.url_key}`} title={data.name} rel='nofollow' className='hover:opacity-70'>
          <SquareArrowOutUpRight className='size-5' />
          <span className='sr-only'>{data.name}</span>
        </a>
      </div>
    </div>
  );
}
