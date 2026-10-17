require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDB() {
  const client = await pool.connect();
  try {
    console.log('--- Initializing Database Schema ---');

    // 1. Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'student',
        school VARCHAR(255) DEFAULT 'THPT',
        grade VARCHAR(50) DEFAULT 'Lớp 12',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Holland Categories
    await client.query(`
      CREATE TABLE IF NOT EXISTS holland_groups (
        code VARCHAR(10) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        description TEXT,
        badge_color VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active'
      );
    `);

    // 3. DISC Categories
    await client.query(`
      CREATE TABLE IF NOT EXISTS disc_groups (
        code VARCHAR(10) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        characteristics TEXT,
        keywords JSONB,
        color VARCHAR(50),
        bg_light VARCHAR(50),
        border_color VARCHAR(50),
        status VARCHAR(50) DEFAULT 'active'
      );
    `);

    // 4. Majors
    await client.query(`
      CREATE TABLE IF NOT EXISTS majors (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) NOT NULL,
        category VARCHAR(100),
        typical_holland VARCHAR(10),
        description TEXT,
        career_outcomes JSONB,
        status VARCHAR(50) DEFAULT 'active'
      );
    `);

    // 5. Careers & Matrix
    await client.query(`
      CREATE TABLE IF NOT EXISTS career_matrix (
        id VARCHAR(100) PRIMARY KEY,
        holland VARCHAR(10) NOT NULL,
        holland_label VARCHAR(100),
        disc VARCHAR(10) NOT NULL,
        disc_label VARCHAR(100),
        job_title VARCHAR(255) NOT NULL,
        university_major VARCHAR(255) NOT NULL,
        major_code VARCHAR(50),
        admission_combinations JSONB,
        description TEXT,
        key_skills JSONB,
        suitable_roles JSONB,
        top_universities JSONB,
        average_salary_range VARCHAR(100),
        growth_potential VARCHAR(50),
        status VARCHAR(50) DEFAULT 'active'
      );
    `);

    // 6. Question Bank
    await client.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id VARCHAR(100) PRIMARY KEY,
        type VARCHAR(50) NOT NULL, -- HOLLAND | DISC
        tier INT NOT NULL, -- 20 | 50 | 70
        question_order INT NOT NULL,
        title VARCHAR(255),
        scenario TEXT NOT NULL,
        options JSONB NOT NULL,
        status VARCHAR(50) DEFAULT 'active'
      );
    `);

    // 7. Test Sessions (real-time progress tracking)
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_sessions (
        session_id VARCHAR(100) PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        student_name VARCHAR(255) NOT NULL,
        tier INT DEFAULT 20,
        current_test VARCHAR(50) DEFAULT 'HOLLAND',
        answered_holland INT DEFAULT 0,
        total_holland INT DEFAULT 20,
        answered_disc INT DEFAULT 0,
        total_disc INT DEFAULT 20,
        status VARCHAR(50) DEFAULT 'in_progress', -- in_progress, completed, paused
        started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. Test History & Evaluation Results
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_history (
        id VARCHAR(100) PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        student_name VARCHAR(255) NOT NULL,
        school VARCHAR(255) DEFAULT 'THPT',
        tier INT DEFAULT 20,
        test_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        initial_major_id VARCHAR(100),
        initial_major_name VARCHAR(255),
        final_major_id VARCHAR(100),
        final_major_name VARCHAR(255),
        primary_disc VARCHAR(10),
        secondary_disc VARCHAR(10),
        primary_holland VARCHAR(10),
        disc_scores JSONB,
        disc_percentages JSONB,
        holland_scores JSONB,
        analysis JSONB,
        recommended_careers JSONB,
        answers JSONB,
        notes TEXT
      );
    `);

    console.log('Tables created or verified successfully!');

    // Seed default admin user
    await client.query(`
      INSERT INTO users (id, email, name, role, school, status)
      VALUES 
        ('admin-1', 'admin@educareer.edu.vn', 'Quản Trị Viên EduCareer', 'admin', 'Sở GD&ĐT / THPT', 'active'),
        ('student-1', 'hocsinh.thpt@gmail.com', 'Nguyễn Minh Anh', 'student', 'THPT Chuyên Hà Nội - Amsterdam', 'active')
      ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role;
    `);

    // Seed Holland Traits
    const hollandData = [
      ['R', 'R – Kỹ thuật', 'Realistic (Kỹ thuật - Thực tế)', 'Thích làm việc với máy móc, công cụ, bản vẽ và lắp ráp kỹ thuật.', 'bg-amber-100 text-amber-800 border-amber-300'],
      ['I', 'I – Nghiên cứu', 'Investigative (Nghiên cứu - Khám phá)', 'Thích quan sát, phân tích số liệu khoa học, thuật toán và giải mã vấn đề.', 'bg-blue-100 text-blue-800 border-blue-300'],
      ['A', 'A – Nghệ thuật', 'Artistic (Nghệ thuật - Sáng tạo)', 'Thích tư duy hình ảnh, đổi mới thẩm mỹ, thiết kế thị giác và truyền thông.', 'bg-purple-100 text-purple-800 border-purple-300'],
      ['S', 'S – Xã hội', 'Social (Xã hội - Tương tác)', 'Thích đồng hành, chia sẻ, hướng dẫn và kết nối cộng đồng nhân văn.', 'bg-emerald-100 text-emerald-800 border-emerald-300'],
      ['E', 'E – Quản trị', 'Enterprising (Quản trị - Doanh nghiệp)', 'Thích dẫn dắt mục tiêu, đàm phán, hoạch định thị trường và kinh doanh.', 'bg-red-100 text-red-800 border-red-300'],
      ['C', 'C – Nghiệp vụ', 'Conventional (Nghiệp vụ - Quy chuẩn)', 'Thích sự chuẩn xác, kiểm soát quy trình, báo cáo và dữ liệu bảo mật.', 'bg-cyan-100 text-cyan-800 border-cyan-300']
    ];

    for (const h of hollandData) {
      await client.query(`
        INSERT INTO holland_groups (code, name, full_name, description, badge_color, status)
        VALUES ($1, $2, $3, $4, $5, 'active')
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
      `, h);
    }

    // Seed DISC Groups
    const discData = [
      ['D', 'D – Quyết đoán', 'Dominance (Thống trị / Quyết đoán)', 'Tự tin, hướng tới kết quả nhanh chóng, chủ động ra quyết định.', JSON.stringify(['Mục tiêu', 'Hành động nhanh', 'Tiên phong', 'Chỉ huy']), '#ef4444', '#fef2f2', '#fca5a5'],
      ['I', 'I – Ảnh hưởng', 'Influence (Ảnh hưởng / Truyền cảm hứng)', 'Nhiệt tình, kết nối mọi người, truyền cảm hứng và sáng tạo.', JSON.stringify(['Thuyết trình', 'Giao tiếp', 'Truyền cảm hứng', 'Mạng lưới']), '#f59e0b', '#fffbeb', '#fcd34d'],
      ['S', 'S – Ổn định', 'Steadiness (Kiên định / Ổn định)', 'Điềm đạm, lắng nghe, kiên nhẫn, thích làm việc hỗ trợ lâu dài.', JSON.stringify(['Tỉ mỉ', 'Bền bỉ', 'Hỗ trợ', 'Tận tâm']), '#10b981', '#ecfdf5', '#6ee7b7'],
      ['C', 'C – Tuân thủ', 'Conscientiousness (Tuân thủ / Kỷ luật)', 'Chính xác, kỷ luật, bám sát quy chuẩn, giảm thiểu rủi ro.', JSON.stringify(['Chính xác', 'Quy chuẩn', 'Phân tích', 'Chi tiết']), '#3b82f6', '#eff6ff', '#93c5fd']
    ];

    for (const d of discData) {
      await client.query(`
        INSERT INTO disc_groups (code, name, full_name, characteristics, keywords, color, bg_light, border_color, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active')
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, characteristics = EXCLUDED.characteristics;
      `, d);
    }

    // Seed Questions from extracted JSON if table is empty
    const countRes = await client.query('SELECT COUNT(*) FROM questions');
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      console.log('Seeding question bank from extracted questions...');
      const questionsData = require('../data/extractedQuestions.json');
      for (const tier of [20, 50, 70]) {
        for (const q of questionsData[tier].holland) {
          await client.query(`
            INSERT INTO questions (id, type, tier, question_order, title, scenario, options, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
            ON CONFLICT (id) DO NOTHING;
          `, [q.id, q.type, q.tier, q.order, q.title, q.scenario, JSON.stringify(q.options)]);
        }
        for (const q of questionsData[tier].disc) {
          await client.query(`
            INSERT INTO questions (id, type, tier, question_order, title, scenario, options, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
            ON CONFLICT (id) DO NOTHING;
          `, [q.id, q.type, q.tier, q.order, q.title, q.scenario, JSON.stringify(q.options)]);
        }
      }
      console.log('Seeded all questions for 20, 50, 70 tiers!');
    }

    console.log('--- Database Initialization Completed ---');
  } catch (err) {
    console.error('Database initialization failed:', err);
  } finally {
    client.release();
    pool.end();
  }
}

initDB();
