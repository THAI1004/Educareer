require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const emails = ['hoanganhbvh@gmail.com', 'anhnh136@fpt.edu.vn'];

async function setAdmin() {
  for (const email of emails) {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      await pool.query('UPDATE users SET role = $1, status = $2 WHERE email = $3', ['admin', 'active', email]);
      console.log('Updated admin:', email, '| id:', existing.rows[0].id);
    } else {
      const id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      await pool.query(
        'INSERT INTO users (id, email, name, role, school, status) VALUES ($1, $2, $3, $4, $5, $6)',
        [id, email, email.split('@')[0], 'admin', 'EduCareer', 'active']
      );
      console.log('Created admin:', email, '| id:', id);
    }
  }

  const result = await pool.query('SELECT id, email, name, role, status FROM users WHERE email = ANY($1)', [emails]);
  console.log('\nVerification:');
  console.table(result.rows);
  await pool.end();
}

setAdmin().catch(console.error);
