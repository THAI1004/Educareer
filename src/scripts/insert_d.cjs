const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const dGroup = {
    code: 'D',
    name: 'D – Thống trị (Quyết đoán)',
    full_name: 'Dominance - Nhóm Thống trị, Quyết đoán & Mục tiêu cao',
    characteristics: 'Quyết đoán, tập trung kết quả, chấp nhận thách thức, thích dẫn đầu và giải quyết vấn đề nhanh chóng.',
    color: '#EF4444',
    bg_light: '#fef2f2',
    border_color: '#fca5a5',
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
  };

  const query = `
    INSERT INTO disc_groups (code, name, full_name, characteristics, color, bg_light, border_color, status, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (code) DO UPDATE
    SET name = EXCLUDED.name,
        full_name = EXCLUDED.full_name,
        characteristics = EXCLUDED.characteristics,
        color = EXCLUDED.color,
        status = EXCLUDED.status,
        image_url = EXCLUDED.image_url
    RETURNING *;
  `;

  const values = [
    dGroup.code,
    dGroup.name,
    dGroup.full_name,
    dGroup.characteristics,
    dGroup.color,
    dGroup.bg_light,
    dGroup.border_color,
    dGroup.status,
    dGroup.image_url
  ];

  const res = await pool.query(query, values);
  console.log('Inserted/Updated group D successfully:', res.rows[0]);

  const all = await pool.query('SELECT code, name, status FROM disc_groups ORDER BY code ASC');
  console.log('Current disc_groups:', all.rows);

  await pool.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
