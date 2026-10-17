require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const email = 'thaiphph52804@gmail.com';
  
  // Check if user exists
  const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
  if (check.rows.length > 0) {
    const res = await pool.query(
      "UPDATE users SET role = 'admin', status = 'active' WHERE email = $1 RETURNING *",
      [email]
    );
    console.log('SUCCESS_UPDATE:', res.rows[0]);
  } else {
    const res = await pool.query(
      "INSERT INTO users (id, email, name, role, school, status) VALUES ($1, $2, $3, 'admin', 'Sở GD&ĐT / THPT', 'active') RETURNING *",
      ['user_' + Date.now(), email, 'Hồng Thái Phạm']
    );
    console.log('SUCCESS_INSERT:', res.rows[0]);
  }
  await pool.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
