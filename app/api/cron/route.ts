/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/db/pg/client';

import crawler from './crawler';

// submit table empty -> stop

// filter status
// isFeature (priority)
// time order

// when crawler is done
// insert web_nav table (tags <- tags[0] or 'other')
// update submit table status

export async function POST(req: NextRequest) {
  try {
    // 获取请求头中的 Authorization
    const authHeader = req.headers.get('Authorization');

    // 检查 Authorization 是否存在并验证 token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header is missing or malformed' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const cronKey = process.env.CRON_AUTH_KEY;
    // 假设这里有一个函数 `verifyToken` 用于验证 token，如果验证失败则抛出错误
    const isValid = cronKey === token;
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    console.log('supabase connected!');

    const [{ rows: categoryList }, { rows: submitList }] =
      await Promise.all([
        query(`select * from category`, []),
        query(`select * from submit where status = 0 order by is_feature desc, crated_at asc`, [])
      ]);

    console.log('supabase get categoryList succeed!');
    if (!categoryList) {
      return NextResponse.json({ error: 'Category is null' }, { status: 201 });
    }

    if (!submitList || !submitList[0]) {
      return NextResponse.json({ error: 'Submit list is null' }, { status: 202 });
    }
    console.log('supabase get submitList succeed!');

    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/cron_callback`;

    const firstSubmitData = submitList[0];
    const res = await crawler({
      url: firstSubmitData.url!,
      tags: categoryList!.map((item) => item.name),
      callback_url: callbackUrl,
      key: cronKey,
    });

    console.log('api get crawler succeed!');

    if (res.code !== 200) {
      throw new Error(res.msg);
    }
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return Response.json({ error });
  }
}
