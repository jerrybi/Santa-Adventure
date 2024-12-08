/* eslint-disable react/jsx-no-target-blank */

// import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import { query } from '@/db/pg/client';
import { NavigationCategory } from '@/db/supabase/types';
import { CircleArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { WebNavigationDetailData } from '@/lib/data';
// import { TagList1 } from '@/app/[locale]/(with-footer)/(home)/Tag';

export const revalidate = 3600;

export async function getCategory(id: number) {
  const { rows: productTags } = await query('select * from product_tag where product_id = $1 limit 1', [id]);
  let categoryList: NavigationCategory[] | null = null;
  if (productTags && productTags.length > 0) {
    const tagIds = productTags.map((i) => i.tag_id);
    const placeholders = tagIds.map((_, index) => `$${index + 1}`).join(', ');
    const { rows: categoryData } = await query(`select * from category where id in (${placeholders})`,
      tagIds);
    categoryList = categoryData;
  }
  return categoryList;
}

export default async function WebNavCard({ locale, data }: { locale?: string; data: WebNavigationDetailData }) {
  const t = await getTranslations('Home');
  console.log(locale);
  // const getCachedCategory = unstable_cache(async (id) => getCategory(id));
  // const categoryList = await getCachedCategory(data.id);

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
          <h3 className='line-clamp-1 flex-1 text-sm font-bold lg:text-base text-christmas-green'>{data.name}</h3>
        </a>
        <a href={`/p/${data.url_key}`} title={data.name} rel='nofollow' className='hover:opacity-70'>
          <SquareArrowOutUpRight className='size-5' />
          <span className='sr-only'>{data.name}</span>
        </a>
      </div>
      {/*
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
      */}
      <p className='line-clamp-3 px-[6px] text-xs text-white/70 lg:line-clamp-5 lg:text-sm'>{data.content}</p>
    </div>
  );
}
