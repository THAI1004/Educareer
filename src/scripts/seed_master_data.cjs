require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedData() {
  const client = await pool.connect();
  try {
    console.log('--- Seeding Majors and Career Matrix into PostgreSQL ---');

    // Read careerMatrix.ts
    // We can extract CAREER_MATRIX_DATA and UNIVERSITY_MAJORS_LIST
    const majors = [
      {
        id: 'cntt',
        name: 'Công nghệ thông tin',
        code: '7480201',
        category: 'Công nghệ & Kỹ thuật',
        typicalHolland: 'I',
        description: 'Đào tạo kỹ sư phần mềm, phát triển hệ thống, trí tuệ nhân tạo, an toàn thông tin.',
        careerOutcomes: ['Kỹ sư phần mềm', 'Chuyên gia AI/Data', 'Kiến trúc sư hệ thống', 'Quản trị bảo mật']
      },
      {
        id: 'khmt',
        name: 'Khoa học máy tính',
        code: '7480101',
        category: 'Công nghệ & Kỹ thuật',
        typicalHolland: 'I',
        description: 'Chuyên sâu thuật toán, mô hình hóa toán học, thị giác máy tính và khoa học dữ liệu.',
        careerOutcomes: ['Nhà nghiên cứu AI', 'Kỹ sư giải thuật', 'Data Scientist', 'Giảng viên đại học']
      },
      {
        id: 'qtkd',
        name: 'Quản trị kinh doanh',
        code: '7340101',
        category: 'Kinh tế & Quản trị',
        typicalHolland: 'E',
        description: 'Đào tạo kỹ năng quản lý dự án, hoạch định chiến lược kinh doanh, quản trị nhân sự và điều hành tổ chức.',
        careerOutcomes: ['Giám đốc điều hành (CEO)', 'Quản lý dự án', 'Chuyên viên hoạch định', 'Khởi nghiệp kinh doanh']
      },
      {
        id: 'mkt',
        name: 'Marketing & Truyền thông số',
        code: '7340115',
        category: 'Kinh tế & Quản trị',
        typicalHolland: 'E',
        description: 'Nghiên cứu hành vi thị trường, sáng tạo thông điệp thương hiệu, truyền thông đa nền tảng và digital marketing.',
        careerOutcomes: ['Giám đốc Marketing (CMO)', 'Chuyên viên Digital Ads', 'Brand Manager', 'Chiến lược gia nội dung']
      },
      {
        id: 'tcnh',
        name: 'Tài chính - Ngân hàng',
        code: '7340201',
        category: 'Kinh tế & Quản trị',
        typicalHolland: 'C',
        description: 'Phân tích tài chính doanh nghiệp, đầu tư chứng khoán, thẩm định tín dụng và quản lý rủi ro ngân hàng.',
        careerOutcomes: ['Chuyên viên phân tích đầu tư', 'Chuyên viên tín dụng ngân hàng', 'Quản trị rủi ro tài chính', 'Môi giới chứng khoán']
      },
      {
        id: 'kt',
        name: 'Kế toán - Kiểm toán',
        code: '7340301',
        category: 'Kinh tế & Quản trị',
        typicalHolland: 'C',
        description: 'Lập báo cáo tài chính, kiểm toán nội bộ và độc lập, quản lý thuế và kiểm soát chi phí.',
        careerOutcomes: ['Kế toán trưởng', 'Kiểm toán viên Big4', 'Tư vấn thuế doanh nghiệp', 'Chuyên viên kiểm soát nội bộ']
      },
      {
        id: 'tktk',
        name: 'Thiết kế đồ họa & Đa phương tiện',
        code: '7210403',
        category: 'Nghệ thuật & Thiết kế',
        typicalHolland: 'A',
        description: 'Sáng tạo mỹ thuật ứng dụng, thiết kế giao diện UI/UX, đồ họa chuyển động và truyền thông thị giác.',
        careerOutcomes: ['Giám đốc nghệ thuật (Art Director)', 'UI/UX Designer', 'Motion Graphic Designer', 'Chuyên gia xây dựng nhận diện thương hiệu']
      },
      {
        id: 'ktxd',
        name: 'Kỹ thuật xây dựng',
        code: '7580201',
        category: 'Công nghệ & Kỹ thuật',
        typicalHolland: 'R',
        description: 'Thiết kế kết cấu công trình, quản lý thi công xây dựng dân dụng & công nghiệp, an toàn lao động.',
        careerOutcomes: ['Chỉ huy trưởng công trường', 'Kỹ sư kết cấu', 'Giám đốc ban quản lý dự án', 'Kỹ sư dự toán']
      },
      {
        id: 'cddk',
        name: 'Kỹ thuật cơ khí & Tự động hóa',
        code: '7520103',
        category: 'Công nghệ & Kỹ thuật',
        typicalHolland: 'R',
        description: 'Chế tạo máy móc, dây chuyền sản xuất tự động, robot công nghiệp và bảo trì kỹ thuật.',
        careerOutcomes: ['Kỹ sư tự động hóa', 'Quản đốc xưởng chế tạo', 'Kỹ sư thiết kế cơ khí 3D', 'Chuyên viên bảo trì thiết bị']
      },
      {
        id: 'yk',
        name: 'Y khoa & Y tế công cộng',
        code: '7720101',
        category: 'Sức khỏe & Đời sống',
        typicalHolland: 'S',
        description: 'Khám chữa bệnh, chăm sóc sức khỏe cộng đồng, nghiên cứu bệnh học và điều trị lâm sàng.',
        careerOutcomes: ['Bác sĩ đa khoa', 'Bác sĩ chuyên khoa', 'Chuyên gia y tế dự phòng', 'Cố vấn chăm sóc sức khỏe']
      },
      {
        id: 'tlh',
        name: 'Tâm lý học & Tham vấn học đường',
        code: '7310401',
        category: 'Khoa học Xã hội & Nhân văn',
        typicalHolland: 'S',
        description: 'Nghiên cứu hành vi tâm lý con người, tư vấn trị liệu tâm lý, tham vấn học đường và hướng nghiệp.',
        careerOutcomes: ['Chuyên gia tâm lý học', 'Cố vấn hướng nghiệp', 'Chuyên viên trị liệu hành vi', 'Quản lý nhân sự đào tạo (L&D)']
      },
      {
        id: 'lkt',
        name: 'Luật kinh tế & Luật quốc tế',
        code: '7380107',
        category: 'Pháp luật & Xã hội',
        typicalHolland: 'C',
        description: 'Nghiên cứu pháp luật thương mại, giải quyết tranh chấp kinh doanh, tư vấn hợp đồng đầu tư.',
        careerOutcomes: ['Luật sư tranh tụng', 'Pháp chế doanh nghiệp', 'Công chứng viên', 'Trọng tài viên thương mại']
      }
    ];

    for (const m of majors) {
      await client.query(`
        INSERT INTO majors (id, name, code, category, typical_holland, description, career_outcomes, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
        ON CONFLICT (id) DO UPDATE SET 
          name = EXCLUDED.name,
          code = EXCLUDED.code,
          category = EXCLUDED.category,
          typical_holland = EXCLUDED.typical_holland,
          description = EXCLUDED.description,
          career_outcomes = EXCLUDED.career_outcomes;
      `, [m.id, m.name, m.code, m.category, m.typicalHolland, m.description, JSON.stringify(m.careerOutcomes)]);
    }

    console.log('Seeded majors successfully!');

    // Read CAREER_MATRIX_DATA from file
    const fs = require('fs');
    const path = require('path');
    const matrixFile = fs.readFileSync(path.join(__dirname, '../data/careerMatrix.ts'), 'utf8');

    // Parse matrix items roughly with regex
    const itemRegex = /{\s*id:\s*'([^']+)',\s*holland:\s*'([^']+)',\s*hollandLabel:\s*'([^']+)',\s*disc:\s*'([^']+)',\s*discLabel:\s*'([^']+)',\s*jobTitle:\s*'([^']+)',\s*universityMajor:\s*'([^']+)',\s*majorCode:\s*'([^']+)',\s*admissionCombinations:\s*(\[[^\]]*\]),\s*description:\s*'([^']+)',\s*keySkills:\s*(\[[^\]]*\]),\s*suitableRoles:\s*(\[[^\]]*\]),\s*topUniversities:\s*(\[[^\]]*\]),\s*averageSalaryRange:\s*'([^']+)',\s*growthPotential:\s*'([^']+)'/g;

    let match;
    let matrixCount = 0;
    while ((match = itemRegex.exec(matrixFile)) !== null) {
      const [
        _,
        id, holland, hollandLabel, disc, discLabel, jobTitle,
        universityMajor, majorCode, admissionCombinations,
        description, keySkills, suitableRoles, topUniversities,
        averageSalaryRange, growthPotential
      ] = match;

      await client.query(`
        INSERT INTO career_matrix (
          id, holland, holland_label, disc, disc_label, job_title,
          university_major, major_code, admission_combinations,
          description, key_skills, suitable_roles, top_universities,
          average_salary_range, growth_potential, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'active')
        ON CONFLICT (id) DO UPDATE SET
          job_title = EXCLUDED.job_title,
          description = EXCLUDED.description,
          average_salary_range = EXCLUDED.average_salary_range;
      `, [
        id, holland, hollandLabel, disc, discLabel, jobTitle,
        universityMajor, majorCode,
        JSON.stringify(eval(admissionCombinations)),
        description,
        JSON.stringify(eval(keySkills)),
        JSON.stringify(eval(suitableRoles)),
        JSON.stringify(eval(topUniversities)),
        averageSalaryRange, growthPotential
      ]);
      matrixCount++;
    }

    console.log(`Seeded ${matrixCount} Career Matrix entries into database!`);
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    client.release();
    pool.end();
  }
}

seedData();
