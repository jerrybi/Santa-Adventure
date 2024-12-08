/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/db/pg/client';

// submit table empty -> stop

// filter status
// isFeature (priority)
// time order

// when crawler is done
// insert web_nav table (tags <- tags[0] or 'other')
// update submit table status

export async function POST(req: NextRequest) {
  try {
    // Get Authorization
    const authHeader = req.headers.get('Authorization');

    // Check Authorization and Verify token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header is missing or malformed' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const submitKey = process.env.SUBMIT_AUTH_KEY;
    // check key
    const isValid = submitKey === token;
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 从请求体中获取参数
    const { email, url, name } = await req.json();

    // 检查参数是否存在
    if (!email || !url || !name) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // 检查 URL 是否已存在
    const { rows: existingEntry } = await query(`select * from product_detail where url = $1`,
      [url])

    // if (existingEntryError && existingEntryError.code !== 'PGRST116') {
    //   // PGRST116 means no rows found
    //   throw new Error(existingEntryError.message);
    // }

    if (existingEntry) {
      return NextResponse.json({ message: 'Success' });
    }

    // 插入新数据
    await query(`insert into submit (email, url, name) values ($1, $2, $3)`,
      [email, url, name])

    // if (insertError) {
    //   throw new Error(insertError.message);
    // }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: Error }, { status: 500 });
  }
}
