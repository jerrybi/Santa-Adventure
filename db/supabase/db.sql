create table
  public.submit (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    name text null,
    url text null,
    email text null,
    constraint submit_pkey primary key (id)
  ) tablespace pg_default;


  create table
    public.product (
        id bigint generated by default as identity,
        created_at timestamp with time zone not null default now(),
        content text null,
        image_url text null,
        name text null,
        thumbnail_url text null,
        title text null,
        url text null,
        title_jp text null,
        content_jp text null,
        title_de text null,
        content_de text null,
        title_es text null,
        content_es text null,
        title_fr text null,
        content_fr text null,
        title_pt text null,
        content_pt text null,
        title_ru text null,
        content_ru text null,
        title_cn text null,
        content_cn text null,
        title_tw text null,
        content_tw text null,
      constraint product_pkey primary key (id)
    ) tablespace pg_default;


  create table
    public.product_detail (
        id bigint generated by default as identity,
        created_at timestamp with time zone not null default now(),
        category_name text null,
        collection_time text null,
        content text null,
        detail text null,
        image_url text null,
        name text null,
        star_rating text null,
        tagName text null,
        thumbnail_url text null,
        title text null,
        url text null,
        website_data text null,
        title_jp text null,
        detail_jp text null,
        content_jp text null,
        tagName_jp text null,
        category_name_jp text null,
        title_de text null,
        detail_de text null,
        content_de text null,
        tagName_de text null,
        category_name_de text null,
        title_es text null,
        detail_es text null,
        content_es text null,
        tagName_es text null,
        category_name_es text null,
        title_fr text null,
        detail_fr text null,
        content_fr text null,
        tagName_fr text null,
        category_name_fr text null,
        title_pt text null,
        detail_pt text null,
        content_pt text null,
        tagName_pt text null,
        category_name_pt text null,
        title_ru text null,
        detail_ru text null,
        content_ru text null,
        tagName_ru text null,
        category_name_ru text null,
        title_cn text null,
        detail_cn text null,
        content_cn text null,
        tagName_cn text null,
        category_name_cn text null,
        title_tw text null,
        detail_tw text null,
        content_tw text null,
        tagName_tw text null,
        category_name_tw text null,
      constraint product_detail_pkey primary key (id)
    ) tablespace pg_default;
