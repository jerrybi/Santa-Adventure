import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { query } from '@/db/pg/client';

import { getCategoryField } from '@/lib/data';

import CategoryNum from './CategoryNum';

export const revalidate = 3600;

async function getCategory(pid: number, locale: string) {
  const field = getCategoryField(locale);
  const { rows: data } = await query(`select ${field} from category where pid = $1 order by id asc`,
    [pid]);
  if (!data || !data[0]) {
    return null;
  }
  return data;
}

export default async function CategoryCard({ locale, pid }: { locale: string; pid: number }) {
  const getCachedCategory = unstable_cache(async (id, lang) => getCategory(id, lang),
    ['category-data'],
    { revalidate: 3600 });
  const data = await getCachedCategory(pid, locale);
  if (!data) {
    notFound();
  }
  return (
    <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4'>
      {data.map((item) => (
        <div className='flex flex-col gap-3 rounded-[12px] bg-[#252A464A] p-2 lg:p-4'>
          <div className='flex items-center justify-between'>
            <a
              href={`/c/${item.categoryName}`}
              title={(item[`name_${locale}` as keyof typeof item] as string) || item.name}
              rel='noreferrer'
              className='hover:opacity-70'
            >
              <h3 className='flex-1 text-sm'>
                {(item[`name_${locale}` as keyof typeof item] as string) || item.name}
                <CategoryNum className='text-white' categoryId={item.id} />
              </h3>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
