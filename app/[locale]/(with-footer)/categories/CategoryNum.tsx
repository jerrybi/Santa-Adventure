import { Suspense } from 'react';
import { unstable_cache } from 'next/cache';
import { query } from '@/db/pg/client';

export const revalidate = 3600;

async function getProductTag(categoryId: number) {
  const { rows: data } = await query('select count(*) as count from product_tag where tag_id = $1',
    [categoryId]);
  if (!data || !data[0]) {
    return 0;
  }
  return data[0].count;
}

export default async function CategoryNum({ className, categoryId }: { className: string; categoryId: number }) {
  const getCachedProductTag = unstable_cache(async (id) => getProductTag(id),
    ['category-data'],
    { revalidate: 3600 });
  const count = await getCachedProductTag(categoryId);
  return (
    <Suspense fallback='(0)'>
      <span className={className}> ({count})</span>
    </Suspense>
  );
}
