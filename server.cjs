require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Helper for error handling
const handleError = (res, err, message = 'Database error') => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// ----------------------------------------------------
// AUTHENTICATION
// ----------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  const { email, name, role = 'student', school = 'THPT' } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email là bắt buộc' });
  }

  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user;
    if (existing.rows.length > 0) {
      user = existing.rows[0];
      await pool.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
    } else {
      const id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const inserted = await pool.query(
        `INSERT INTO users (id, email, name, role, school, status)
         VALUES ($1, $2, $3, $4, $5, 'active')
         RETURNING *`,
        [id, email, name || email.split('@')[0], role, school]
      );
      user = inserted.rows[0];
    }

    res.json({
      success: true,
      user
    });
  } catch (err) {
    handleError(res, err, 'Lỗi đăng nhập');
  }
});

// ----------------------------------------------------
// USERS CRUD & STATS
// ----------------------------------------------------
app.get('/api/users', async (req, res) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR email ILIKE $${params.length} OR school ILIKE $${params.length})`;
    }
    if (role && role !== 'all') {
      params.push(role);
      query += ` AND role = $${params.length}`;
    }
    if (status && status !== 'all') {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    // Count
    const countRes = await pool.query(`SELECT COUNT(*) FROM (${query}) as sub`, params);
    const total = parseInt(countRes.rows[0].count, 10);

    // Pagination
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    params.push(parseInt(limit, 10));
    params.push(offset);
    query += ` ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);
    res.json({
      items: rows,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)) || 1
    });
  } catch (err) {
    handleError(res, err, 'Lỗi lấy danh sách user');
  }
});

app.post('/api/users', async (req, res) => {
  const { email, name, role = 'student', school = 'THPT', grade = 'Lớp 12', status = 'active' } = req.body;
  try {
    const id = 'usr_' + Date.now();
    const result = await pool.query(
      `INSERT INTO users (id, email, name, role, school, grade, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, email, name, role, school, grade, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi thêm người dùng');
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role, school, grade, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           role = COALESCE($2, role),
           school = COALESCE($3, school),
           grade = COALESCE($4, grade),
           status = COALESCE($5, status)
       WHERE id = $6 RETURNING *`,
      [name, role, school, grade, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi cập nhật người dùng');
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ success: true, message: 'Đã xóa người dùng' });
  } catch (err) {
    handleError(res, err, 'Lỗi xóa người dùng');
  }
});

// ----------------------------------------------------
// REAL-TIME TEST SESSIONS (Theo dõi bài thi trực tiếp)
// ----------------------------------------------------
app.get('/api/sessions/live', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM test_sessions ORDER BY updated_at DESC LIMIT 50`
    );
    res.json(rows);
  } catch (err) {
    handleError(res, err, 'Lỗi lấy phiên thi');
  }
});

app.post('/api/sessions/update', async (req, res) => {
  const {
    sessionId, userEmail, studentName, tier = 20,
    currentTest, answeredHolland, totalHolland,
    answeredDisc, totalDisc, status = 'in_progress'
  } = req.body;

  try {
    const existing = await pool.query('SELECT * FROM test_sessions WHERE session_id = $1', [sessionId]);
    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE test_sessions
         SET current_test = $1, answered_holland = $2, total_holland = $3,
             answered_disc = $4, total_disc = $5, status = $6, updated_at = CURRENT_TIMESTAMP
         WHERE session_id = $7`,
        [currentTest, answeredHolland, totalHolland, answeredDisc, totalDisc, status, sessionId]
      );
    } else {
      await pool.query(
        `INSERT INTO test_sessions 
         (session_id, user_email, student_name, tier, current_test, answered_holland, total_holland, answered_disc, total_disc, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [sessionId, userEmail, studentName, tier, currentTest, answeredHolland, totalHolland, answeredDisc, totalDisc, status]
      );
    }
    res.json({ success: true });
  } catch (err) {
    handleError(res, err, 'Lỗi cập nhật tiến trình thi thời gian thực');
  }
});

// ----------------------------------------------------
// TEST HISTORY (Lịch sử làm bài)
// ----------------------------------------------------
app.get('/api/history', async (req, res) => {
  try {
    const { search, tier, primaryDisc, primaryHolland, page = 1, limit = 10, userEmail } = req.query;
    let query = 'SELECT * FROM test_history WHERE 1=1';
    const params = [];

    if (userEmail) {
      params.push(userEmail);
      query += ` AND user_email = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (student_name ILIKE $${params.length} OR user_email ILIKE $${params.length} OR final_major_name ILIKE $${params.length})`;
    }
    if (tier && tier !== 'all') {
      params.push(parseInt(tier, 10));
      query += ` AND tier = $${params.length}`;
    }
    if (primaryDisc && primaryDisc !== 'all') {
      params.push(primaryDisc);
      query += ` AND primary_disc = $${params.length}`;
    }
    if (primaryHolland && primaryHolland !== 'all') {
      params.push(primaryHolland);
      query += ` AND primary_holland = $${params.length}`;
    }

    const countRes = await pool.query(`SELECT COUNT(*) FROM (${query}) as sub`, params);
    const total = parseInt(countRes.rows[0].count, 10);

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    params.push(parseInt(limit, 10));
    params.push(offset);
    query += ` ORDER BY test_date DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);
    const mapped = rows.map((r) => ({
      ...r,
      studentName: r.student_name || r.studentName,
      userEmail: r.user_email || r.userEmail,
      testDate: r.test_date ? new Date(r.test_date).toISOString() : new Date().toISOString(),
      initialMajorId: r.initial_major_id || r.initialMajorId,
      initialMajorName: r.initial_major_name || r.initialMajorName || '',
      finalMajorId: r.final_major_id || r.finalMajorId,
      finalMajorName: r.final_major_name || r.finalMajorName || '',
      primaryDisc: r.primary_disc || r.primaryDisc || 'D',
      secondaryDisc: r.secondary_disc || r.secondaryDisc || 'I',
      primaryHolland: r.primary_holland || r.primaryHolland || 'R',
      discScores: r.disc_scores || r.discScores || { D: 0, I: 0, S: 0, C: 0 },
      discPercentages: r.disc_percentages || r.discPercentages || { D: 25, I: 25, S: 25, C: 25 },
      hollandScores: r.holland_scores || r.hollandScores || {},
      analysis: r.analysis || {
        title: 'Báo Cáo Đánh Giá',
        codeName: 'DISC',
        tagline: '',
        summary: '',
        coreBehavior: '',
        strengths: [],
        idealWorkEnvironment: '',
        growthAdvice: [],
        studyTips: []
      },
      recommendedCareers: r.recommended_careers || r.recommendedCareers || []
    }));

    res.json({
      items: mapped,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)) || 1
    });
  } catch (err) {
    handleError(res, err, 'Lỗi lấy lịch sử thi');
  }
});

app.post('/api/history', async (req, res) => {
  const {
    id, userEmail, studentName, school = 'THPT', tier = 20,
    initialMajorId, initialMajorName, finalMajorId, finalMajorName,
    primaryDisc, secondaryDisc, primaryHolland,
    discScores, discPercentages, hollandScores,
    analysis, recommendedCareers, answers, notes
  } = req.body;

  try {
    const finalId = id || 'test_' + Date.now();
    const result = await pool.query(
      `INSERT INTO test_history (
        id, user_email, student_name, school, tier,
        initial_major_id, initial_major_name, final_major_id, final_major_name,
        primary_disc, secondary_disc, primary_holland,
        disc_scores, disc_percentages, holland_scores,
        analysis, recommended_careers, answers, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING *`,
      [
        finalId, userEmail, studentName, school, tier,
        initialMajorId, initialMajorName, finalMajorId, finalMajorName,
        primaryDisc, secondaryDisc, primaryHolland,
        JSON.stringify(discScores), JSON.stringify(discPercentages), JSON.stringify(hollandScores),
        JSON.stringify(analysis), JSON.stringify(recommendedCareers),
        JSON.stringify(answers || {}), notes || ''
      ]
    );

    // Also update user last_active
    await pool.query('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE email = $1', [userEmail]);

    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi lưu kết quả bài test');
  }
});

// Single history detail
app.get('/api/history/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM test_history WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Không tìm thấy kết quả' });
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi lấy chi tiết bài thi');
  }
});

// ----------------------------------------------------
// QUESTION BANK (Quản lý câu hỏi theo nhóm và mốc 20, 50, 70)
// ----------------------------------------------------
app.get('/api/questions', async (req, res) => {
  try {
    const { type, tier, search, status, page = 1, limit = 20 } = req.query;
    let query = 'SELECT * FROM questions WHERE 1=1';
    const params = [];

    if (type && type !== 'all') {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }
    if (tier && tier !== 'all') {
      params.push(parseInt(tier, 10));
      query += ` AND tier = $${params.length}`;
    }
    if (status && status !== 'all') {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (scenario ILIKE $${params.length} OR title ILIKE $${params.length})`;
    }

    const countRes = await pool.query(`SELECT COUNT(*) FROM (${query}) as sub`, params);
    const total = parseInt(countRes.rows[0].count, 10);

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    params.push(parseInt(limit, 10));
    params.push(offset);
    query += ` ORDER BY type ASC, tier ASC, question_order ASC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);
    res.json({
      items: rows,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)) || 1
    });
  } catch (err) {
    handleError(res, err, 'Lỗi lấy danh sách câu hỏi');
  }
});

app.post('/api/questions', async (req, res) => {
  const { type, tier, question_order, title, scenario, options, status = 'active' } = req.body;
  try {
    const id = `${type[0]}${tier}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const result = await pool.query(
      `INSERT INTO questions (id, type, tier, question_order, title, scenario, options, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [id, type, tier, question_order, title, scenario, JSON.stringify(options), status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi thêm câu hỏi');
  }
});

// Bulk insert questions (used by Excel import)
app.post('/api/questions/bulk', async (req, res) => {
  const { questions } = req.body;
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Danh sách câu hỏi không hợp lệ' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    let insertedCount = 0;

    for (const q of questions) {
      const type = (q.type || 'HOLLAND').toUpperCase();
      const tier = parseInt(q.tier, 10) || 20;
      const question_order = parseInt(q.question_order, 10) || 1;
      const title = q.title || `Câu hỏi ${question_order}`;
      const scenario = q.scenario || q.question || '';
      const options = Array.isArray(q.options) ? q.options : [];
      const status = q.status || 'active';
      const id = `${type[0]}${tier}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      await client.query(
        `INSERT INTO questions (id, type, tier, question_order, title, scenario, options, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [id, type, tier, question_order, title, scenario, JSON.stringify(options), status]
      );
      insertedCount++;
    }

    await client.query('COMMIT');
    res.json({ success: true, count: insertedCount, message: `Đã import thành công ${insertedCount} câu hỏi` });
  } catch (err) {
    await client.query('ROLLBACK');
    handleError(res, err, 'Lỗi import danh sách câu hỏi');
  } finally {
    client.release();
  }
});

app.put('/api/questions/:id', async (req, res) => {
  const { id } = req.params;
  const { title, scenario, options, status, question_order } = req.body;
  try {
    const result = await pool.query(
      `UPDATE questions
       SET title = COALESCE($1, title),
           scenario = COALESCE($2, scenario),
           options = COALESCE($3, options),
           status = COALESCE($4, status),
           question_order = COALESCE($5, question_order)
       WHERE id = $6 RETURNING *`,
      [title, scenario, options ? JSON.stringify(options) : null, status, question_order, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi cập nhật câu hỏi');
  }
});

app.delete('/api/questions/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM questions WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Đã xóa câu hỏi' });
  } catch (err) {
    handleError(res, err, 'Lỗi xóa câu hỏi');
  }
});

// ----------------------------------------------------
// MASTER DATA MANAGEMENT (Holland, DISC, Ngành, Nghề, Đầu ra)
// ----------------------------------------------------
// Holland Groups
app.get('/api/master/holland', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM holland_groups ORDER BY code ASC');
    res.json(rows);
  } catch (err) {
    handleError(res, err, 'Lỗi lấy nhóm Holland');
  }
});

app.post('/api/master/holland', async (req, res) => {
  const { code, name, full_name, description, badge_color, image_url, status = 'active' } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO holland_groups (code, name, full_name, description, badge_color, image_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [code.toUpperCase(), name, full_name, description, badge_color || 'bg-orange-100 text-orange-800', image_url, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi thêm nhóm Holland');
  }
});

app.put('/api/master/holland/:code', async (req, res) => {
  const { code } = req.params;
  const { name, full_name, description, badge_color, image_url, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE holland_groups
       SET name = COALESCE($1, name),
           full_name = COALESCE($2, full_name),
           description = COALESCE($3, description),
           badge_color = COALESCE($4, badge_color),
           image_url = COALESCE($5, image_url),
           status = COALESCE($6, status)
       WHERE code = $7 RETURNING *`,
      [name, full_name, description, badge_color, image_url, status, code]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi cập nhật nhóm Holland');
  }
});

app.delete('/api/master/holland/:code', async (req, res) => {
  try {
    await pool.query('DELETE FROM holland_groups WHERE code = $1', [req.params.code]);
    res.json({ success: true, message: 'Đã xóa nhóm Holland' });
  } catch (err) {
    handleError(res, err, 'Lỗi xóa nhóm Holland');
  }
});

// DISC Groups
app.get('/api/master/disc', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM disc_groups ORDER BY code ASC');
    res.json(rows);
  } catch (err) {
    handleError(res, err, 'Lỗi lấy nhóm DISC');
  }
});

app.post('/api/master/disc', async (req, res) => {
  const { code, name, full_name, characteristics, keywords, color, bg_light, border_color, image_url, status = 'active' } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO disc_groups (code, name, full_name, characteristics, keywords, color, bg_light, border_color, image_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [code.toUpperCase(), name, full_name, characteristics, JSON.stringify(keywords || []), color || '#ef4444', bg_light || '#fef2f2', border_color || '#fca5a5', image_url, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi thêm nhóm DISC');
  }
});

app.put('/api/master/disc/:code', async (req, res) => {
  const { code } = req.params;
  const { name, full_name, characteristics, keywords, color, bg_light, border_color, image_url, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE disc_groups
       SET name = COALESCE($1, name),
           full_name = COALESCE($2, full_name),
           characteristics = COALESCE($3, characteristics),
           keywords = COALESCE($4, keywords),
           color = COALESCE($5, color),
           bg_light = COALESCE($6, bg_light),
           border_color = COALESCE($7, border_color),
           image_url = COALESCE($8, image_url),
           status = COALESCE($9, status)
       WHERE code = $10 RETURNING *`,
      [name, full_name, characteristics, keywords ? JSON.stringify(keywords) : null, color, bg_light, border_color, image_url, status, code]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi cập nhật nhóm DISC');
  }
});

app.delete('/api/master/disc/:code', async (req, res) => {
  try {
    await pool.query('DELETE FROM disc_groups WHERE code = $1', [req.params.code]);
    res.json({ success: true, message: 'Đã xóa nhóm DISC' });
  } catch (err) {
    handleError(res, err, 'Lỗi xóa nhóm DISC');
  }
});

// Majors (Ngành đào tạo & Đầu ra)
app.get('/api/master/majors', async (req, res) => {
  try {
    const { search, category, status, page = 1, limit = 10 } = req.query;
    let query = 'SELECT * FROM majors WHERE 1=1';
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR code ILIKE $${params.length} OR category ILIKE $${params.length})`;
    }
    if (category && category !== 'all') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (status && status !== 'all') {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    const countRes = await pool.query(`SELECT COUNT(*) FROM (${query}) as sub`, params);
    const total = parseInt(countRes.rows[0].count, 10);

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    params.push(parseInt(limit, 10));
    params.push(offset);
    query += ` ORDER BY name ASC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);
    res.json({
      items: rows,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)) || 1
    });
  } catch (err) {
    handleError(res, err, 'Lỗi lấy ngành đào tạo');
  }
});

app.post('/api/master/majors', async (req, res) => {
  const { id, name, code, category, typical_holland, description, career_outcomes, image_url, status = 'active' } = req.body;
  try {
    const finalId = id || 'maj_' + Date.now();
    const result = await pool.query(
      `INSERT INTO majors (id, name, code, category, typical_holland, description, career_outcomes, image_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [finalId, name, code, category, typical_holland, description, JSON.stringify(career_outcomes || []), image_url, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi thêm ngành');
  }
});

app.put('/api/master/majors/:id', async (req, res) => {
  const { id } = req.params;
  const { name, code, category, typical_holland, description, career_outcomes, image_url, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE majors
       SET name = COALESCE($1, name),
           code = COALESCE($2, code),
           category = COALESCE($3, category),
           typical_holland = COALESCE($4, typical_holland),
           description = COALESCE($5, description),
           career_outcomes = COALESCE($6, career_outcomes),
           image_url = COALESCE($7, image_url),
           status = COALESCE($8, status)
       WHERE id = $9 RETURNING *`,
      [name, code, category, typical_holland, description, career_outcomes ? JSON.stringify(career_outcomes) : null, image_url, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi cập nhật ngành');
  }
});

app.delete('/api/master/majors/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM majors WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Đã xóa ngành đào tạo' });
  } catch (err) {
    handleError(res, err, 'Lỗi xóa ngành đào tạo');
  }
});

// Careers & Matrix
app.get('/api/master/careers', async (req, res) => {
  try {
    const { search, holland, disc, status, page = 1, limit = 10 } = req.query;
    let query = 'SELECT * FROM career_matrix WHERE 1=1';
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (job_title ILIKE $${params.length} OR university_major ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }
    if (holland && holland !== 'all') {
      params.push(holland);
      query += ` AND holland = $${params.length}`;
    }
    if (disc && disc !== 'all') {
      params.push(disc);
      query += ` AND disc = $${params.length}`;
    }
    if (status && status !== 'all') {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    const countRes = await pool.query(`SELECT COUNT(*) FROM (${query}) as sub`, params);
    const total = parseInt(countRes.rows[0].count, 10);

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    params.push(parseInt(limit, 10));
    params.push(offset);
    query += ` ORDER BY job_title ASC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);
    res.json({
      items: rows,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)) || 1
    });
  } catch (err) {
    handleError(res, err, 'Lỗi lấy danh sách nghề nghiệp');
  }
});

app.post('/api/master/careers', async (req, res) => {
  const {
    id, holland, holland_label, disc, disc_label, job_title,
    university_major, major_code, admission_combinations,
    description, key_skills, suitable_roles, top_universities,
    average_salary_range, growth_potential, image_url, status = 'active'
  } = req.body;

  try {
    const finalId = id || 'car_' + Date.now();
    const result = await pool.query(
      `INSERT INTO career_matrix (
        id, holland, holland_label, disc, disc_label, job_title,
        university_major, major_code, admission_combinations,
        description, key_skills, suitable_roles, top_universities,
        average_salary_range, growth_potential, image_url, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
      [
        finalId, holland, holland_label, disc, disc_label, job_title,
        university_major, major_code, JSON.stringify(admission_combinations || []),
        description, JSON.stringify(key_skills || []), JSON.stringify(suitable_roles || []),
        JSON.stringify(top_universities || []), average_salary_range, growth_potential, image_url, status
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi thêm nghề nghiệp');
  }
});

app.put('/api/master/careers/:id', async (req, res) => {
  const { id } = req.params;
  const {
    holland, holland_label, disc, disc_label, job_title,
    university_major, major_code, admission_combinations,
    description, key_skills, suitable_roles, top_universities,
    average_salary_range, growth_potential, image_url, status
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE career_matrix
       SET holland = COALESCE($1, holland),
           holland_label = COALESCE($2, holland_label),
           disc = COALESCE($3, disc),
           disc_label = COALESCE($4, disc_label),
           job_title = COALESCE($5, job_title),
           university_major = COALESCE($6, university_major),
           major_code = COALESCE($7, major_code),
           admission_combinations = COALESCE($8, admission_combinations),
           description = COALESCE($9, description),
           key_skills = COALESCE($10, key_skills),
           suitable_roles = COALESCE($11, suitable_roles),
           top_universities = COALESCE($12, top_universities),
           average_salary_range = COALESCE($13, average_salary_range),
           growth_potential = COALESCE($14, growth_potential),
           image_url = COALESCE($15, image_url),
           status = COALESCE($16, status)
       WHERE id = $17 RETURNING *`,
      [
        holland, holland_label, disc, disc_label, job_title,
        university_major, major_code,
        admission_combinations ? JSON.stringify(admission_combinations) : null,
        description,
        key_skills ? JSON.stringify(key_skills) : null,
        suitable_roles ? JSON.stringify(suitable_roles) : null,
        top_universities ? JSON.stringify(top_universities) : null,
        average_salary_range, growth_potential, image_url, status, id
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err, 'Lỗi cập nhật nghề nghiệp');
  }
});

app.delete('/api/master/careers/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM career_matrix WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Đã xóa nghề nghiệp' });
  } catch (err) {
    handleError(res, err, 'Lỗi xóa nghề nghiệp');
  }
});

// Serve Frontend static assets in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for React SPA client-side routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`EduCareer Production Server is running on port ${port}`);
});
