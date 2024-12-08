import CategoryList from '../../../c/[categoryName]/CategoryList';

export default function page({
  params: { locale, pageNum, categoryName },
}: {
  params: { locale: string; pageNum: string | undefined; categoryName: string };
}) {
  return <CategoryList locale={locale} pageNum={pageNum} categoryName={categoryName} />;
}
