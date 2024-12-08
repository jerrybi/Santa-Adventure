/* eslint-disable import/prefer-default-export */

import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PWD,
  port: 5432,
  max: 30,
  connectionTimeoutMillis: 5000, // 连接超时时间（毫秒）
  idleTimeoutMillis: 10000, // 空闲超时时间（毫秒）
});
// console.log('pool', pool);
// async function testConnection() {
//   try {
//     const client = await pool.connect();
//     console.log('Database connected successfully!');
//     client.release();
//   } catch (err) {
//     console.error('Database connection failed:', err);
//   }
// }
// testConnection();
export const query = (text: string, params: any) => {
  // console.log('query', text);
  return pool.query(text, params);
};
