export type WebNavigationListRow = {
  content: string;
  id: string;
  image_url: string | null;
  name: string;
  thumbnail_url: string | null;
  title: string;
  url: string;
  category_name: string;
};

export type WebNavigationDetailData = {
  id: number;
  collection_time: string;
  content: string;
  detail: string;
  image_url: string;
  name: string;
  star_rating: number;
  thumbnail_url: string;
  title: string;
  url: string;
  website_data: string;
  url_key: string;
};

export type CategoryData = {
  category_name: string;
  name: string;
  pid: number;
  has_child: boolean;
  id: number;
};

export function fillProductDetail(item: WebNavigationDetailData, lang: string) {
  return {
    id: item.id,
    collection_time: item.collection_time,
    content: (item[`content_${lang}` as keyof typeof item] as string) || item.content,
    detail: (item[`detail_${lang}` as keyof typeof item] as string) || item.detail,
    image_url: item.image_url,
    name: (item[`name_${lang}` as keyof typeof item] as string) || item.name,
    star_rating: item.star_rating,
    thumbnail_url: item.thumbnail_url,
    title: (item[`title_${lang}` as keyof typeof item] as string) || item.title,
    url: item.url,
    website_data: item.website_data,
    url_key: item.url_key,
  };
}

export function getProductDetailField(locale: string) {
  let field =
    'id, collection_time, content, detail, image_url, name, thumbnail_url, title, url, traffic, url_key, website_data';
  if (locale && locale !== 'en') {
    field += `,title_${locale}, detail_${locale}, content_${locale}`;
  }
  return field;
}

export function getCategoryField(locale: string) {
  let field = 'id,name,pid,has_child,category_name,title,content,h1';
  if (locale && locale !== 'en') {
    field += `,name_${locale},title_${locale}, h1_${locale}, content_${locale}`;
  }
  return field;
}
