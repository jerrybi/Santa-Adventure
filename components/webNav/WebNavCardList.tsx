import { WebNavigationDetailData } from '@/lib/data';

import WebNavCard from './WebNavCard';

export default function WebNavCardList({
  locale,
  dataList,
}: {
  locale?: string;
  dataList: WebNavigationDetailData[] | null;
}) {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,_15rem)] gap-4'>
      {dataList?.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WebNavCard key={item.id} data={item} locale={locale} />
      ))}
    </div>
  );
}
