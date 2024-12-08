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
    const submitKey = process.env.CRON_AUTH_KEY;
    // check key
    const isValid = submitKey === token;
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // get response data
    const { description, detail, name, screenshot_data, screenshot_thumbnail_data, tags, title, url } =
      await req.json();

    // Check if name already exists
    const { rows: existingEntry } = await query(`select id from product_detail where name = $1`,
      [name]);

    // if (existingEntryError && existingEntryError.code !== 'PGRST116') {
    //   // PGRST116 means no rows found
    //   throw new Error(existingEntryError.message);
    // }

    if (existingEntry) {
      // Update existing entry
      await query(`update product_detail set content = $1, detail = $2, img_url = $3, thumbnail_url = $4, title = $5, url = $6 where id = $7`,
        [description, detail, screenshot_data, screenshot_thumbnail_data, title, url, existingEntry[0].id])

      // if (updateWebNavigationError) {
      //   throw new Error(updateWebNavigationError.message);
      // }

      console.log('Update result succeed!');
    } else {
      // Insert new entry
      await query(`insert into product_detail (content, detail, name, img_url, thumbnail_url, title, url) values ($1, $2, $3, $4, $5, $6, $7)`,
        [description, detail, name, screenshot_data, screenshot_thumbnail_data, title, url]);

      console.log('Save result succeed!');
    }

    // Update submit table
   await query(`update submit set status = 1 where url = $1`, [url]);

    console.log('Update submit succeed!');
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: Error }, { status: 500 });
  }
}
