import { getTranslations } from 'next-intl/server';

import Spinning from './Spinning';

export default async function Loading({ className }: { className?: string }) {
  const t = await getTranslations('Common');

  return (
    <div role='status' className='flex flex-col items-center gap-1'>
      <Spinning className={className} />
      <span className='text-xs'>{t('loading')}</span>
    </div>
  );
}
