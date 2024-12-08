import ExploreList from './ExploreList';

export const revalidate = 21600;

export default function Page({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string | undefined };
}) {
  return <ExploreList locale={locale} pageNum={pageNum} />;
}
