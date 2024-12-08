import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { query } from '@/db/pg/client';

import { getCategoryField } from '@/lib/data';

import CategoryCard from './CategoryCard';
import CategoryNum from './CategoryNum';

export const revalidate = 36000;

async function getCategory(pid: number, locale: string) {
  const field = getCategoryField(locale);
  const { rows: data } = await query(`select ${field} from category where pid = $1 order by id asc`,
    [pid]);
  return !data || !data![0] ? null : data;
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const getCachedCategory = unstable_cache(async (id, lang) => getCategory(id, lang),
    ['category-data'],
    { revalidate: 3600 });
  const data = await getCachedCategory(0, locale);
  if (!data) {
    notFound();
  }

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4'>
        {data.map((item) => (
          <div className='flex flex-col gap-3 rounded-[12px] bg-[#252A464A] p-2 lg:p-4'>
            <div className='flex items-center justify-between'>
              {item.has_child ? (
                <>
                  <h2 className='pb-1 pt-3 text-sm font-bold text-sky-500 lg:pb-2 lg:pt-6 lg:text-base'>
                    {(item[`name_${locale}` as keyof typeof item] as string) || item.name}
                  </h2>
                  <CategoryCard key={item.id} locale={locale} pid={item.id} />
                </>
              ) : (
                <a
                  href={`/c/${item.categoryName}`}
                  title={(item[`name_${locale}` as keyof typeof item] as string) || item.name}
                  rel='noreferrer'
                  className='hover:opacity-70'
                >
                  <h2 className='pb-1 pt-3 text-sm font-bold text-sky-500 lg:pb-2 lg:pt-6 lg:text-base'>
                    {(item[`name_${locale}` as keyof typeof item] as string) || item.name}
                    <CategoryNum className='text-sky-500' categoryId={item.id} />
                  </h2>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
