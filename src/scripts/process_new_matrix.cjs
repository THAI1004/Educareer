const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
require('dotenv').config();
const { Pool } = require('pg');

// Official Ministry of Education Codes for Vietnamese Universities
const MAJOR_CODES = {
  'Kỹ thuật xây dựng': '7580201',
  'Kỹ thuật cơ khí': '7520103',
  'Kỹ thuật điện': '7520201',
  'Logistics và quản lý chuỗi cung ứng': '7510605',
  'Kỹ thuật điều khiển và tự động hóa': '7520216',
  'Kỹ thuật xây dựng công trình giao thông': '7580205',
  'Công nghệ kỹ thuật cơ khí': '7510201',
  'Kỹ thuật điện tử - viễn thông': '7520207',
  'Công nghệ kỹ thuật ô tô': '7510205',
  'Nông nghiệp công nghệ cao': '7620118',
  'Công nghệ nông nghiệp': '7620119',
  'Kỹ thuật năng lượng': '7520114',
  'Công nghệ kỹ thuật điện, điện tử': '7510301',
  'Chăn nuôi': '7620105',
  'Công nghệ kỹ thuật môi trường': '7510406',
  'Kỹ thuật y sinh': '7520212',
  'Nuôi trồng thủy sản': '7620301',
  'Bảo hộ lao động': '7860101',
  'Kỹ thuật cơ điện tử': '7520114',
  'Kỹ thuật trắc địa - bản đồ': '7520503',
  'Công nghệ thực phẩm': '7540101',
  'Khoa học dữ liệu': '7460108',
  'An toàn thông tin': '7480202',
  'Công nghệ sinh học': '7420201',
  'Tài chính - Ngân hàng': '7340201',
  'Y khoa': '7720101',
  'Y học dự phòng': '7720110',
  'Truyền thông đa phương tiện': '7320104',
  'Công nghệ thông tin': '7480201',
  'Marketing': '7340115',
  'Sư phạm Vật lý': '7140211',
  'Kỹ thuật xét nghiệm y học': '7720601',
  'Sinh học': '7420101',
  'Dược học': '7720201',
  'Kiểm toán': '7340302',
  'Hệ thống thông tin': '7480104',
  'Thống kê': '7460201',
  'Thiết kế đồ họa': '7210403',
  'Đạo diễn sân khấu': '7210227',
  'Kiến trúc': '7580101',
  'Điện ảnh và truyền hình': '7210235',
  'Diễn viên kịch, điện ảnh - truyền hình': '7210234',
  'Báo chí': '7320101',
  'Thiết kế thời trang': '7210404',
  'Sư phạm Mỹ thuật': '7140222',
  'Thiết kế nội thất': '7580108',
  'Ngôn ngữ học': '7229020',
  'Sư phạm Âm nhạc': '7140221',
  'Tâm lý học': '7310401',
  'Xuất bản': '7320107',
  'Công nghệ điện ảnh, truyền hình': '7210236',
  'Thiết kế công nghiệp': '7210402',
  'Thiết kế đa phương tiện': '7210405',
  'Quản lý giáo dục': '7140114',
  'Công tác xã hội': '7760101',
  'Quản trị nhân lực': '7340404',
  'Y tế công cộng': '7720701',
  'Điều dưỡng': '7720301',
  'Quan hệ công chúng': '7320108',
  'Sư phạm Tiếng Anh': '7140231',
  'Sư phạm Giáo dục công dân': '7140228',
  'Giáo dục tiểu học': '7140202',
  'Hộ sinh': '7720302',
  'Kỹ thuật phục hồi chức năng': '7720603',
  'Giáo dục đặc biệt': '7140203',
  'Quản lý bệnh viện': '7720701',
  'Quản trị kinh doanh': '7340101',
  'Bất động sản': '7340116',
  'Kinh doanh quốc tế': '7340120',
  'Quản trị sự kiện': '7340125',
  'Quản trị dịch vụ du lịch và lữ hành': '7810103',
  'Quản trị khách sạn': '7810101',
  'Bảo hiểm': '7340203',
  'Kế toán': '7340301',
  'Hệ thống thông tin quản lý': '7340405',
  'Luật kinh tế': '7380107',
  'Quản trị văn phòng': '7340406',
  'Lưu trữ học': '7320303',
  'Luật': '7380101'
};

// University mappings by category
const UNIVERSITIES_BY_FIELD = {
  tech: ['ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Công nghệ - ĐHQGHN', 'ĐH CNTT - ĐHQG TP.HCM'],
  engineering: ['ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Giao thông Vận tải'],
  construction: ['ĐH Xây dựng Hà Nội', 'ĐH Kiến trúc Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Kiến trúc TP.HCM'],
  medical: ['ĐH Y Hà Nội', 'ĐH Y Dược TP.HCM', 'ĐH Dược Hà Nội', 'ĐH Y khoa Phạm Ngọc Thạch'],
  business: ['ĐH Kinh tế Quốc dân', 'ĐH Kinh tế TP.HCM (UEH)', 'ĐH Ngoại thương', 'Học viện Tài chính'],
  arts: ['ĐH Mỹ thuật Công nghiệp', 'ĐH Kiến trúc Hà Nội', 'ĐH Sân khấu Điện ảnh', 'ĐH Mỹ thuật TP.HCM'],
  social: ['ĐH KHXH&NV - ĐHQGHN', 'ĐH KHXH&NV - ĐHQG TP.HCM', 'ĐH Luật Hà Nội', 'ĐH Sư phạm Hà Nội'],
  agriculture: ['Học viện Nông nghiệp VN', 'ĐH Nông Lâm TP.HCM', 'ĐH Cần Thơ', 'ĐH Lâm nghiệp']
};

function getUniversitiesForMajor(major) {
  const m = major.toLowerCase();
  if (m.includes('y ') || m.includes('dược') || m.includes('điều dưỡng') || m.includes('hộ sinh') || m.includes('xét nghiệm') || m.includes('bệnh viện') || m.includes('phục hồi')) {
    return UNIVERSITIES_BY_FIELD.medical;
  }
  if (m.includes('thiết kế') || m.includes('mỹ thuật') || m.includes('điện ảnh') || m.includes('diễn viên') || m.includes('sân khấu') || m.includes('kiến trúc') || m.includes('thời trang') || m.includes('âm nhạc')) {
    return UNIVERSITIES_BY_FIELD.arts;
  }
  if (m.includes('xây dựng') || m.includes('kiến trúc') || m.includes('giao thông') || m.includes('trắc địa')) {
    return UNIVERSITIES_BY_FIELD.construction;
  }
  if (m.includes('dữ liệu') || m.includes('thông tin') || m.includes('an toàn') || m.includes('robot') || m.includes('điều khiển')) {
    return UNIVERSITIES_BY_FIELD.tech;
  }
  if (m.includes('cơ khí') || m.includes('điện') || m.includes('ô tô') || m.includes('năng lượng') || m.includes('cơ điện tử') || m.includes('bảo hộ')) {
    return UNIVERSITIES_BY_FIELD.engineering;
  }
  if (m.includes('nông nghiệp') || m.includes('chăn nuôi') || m.includes('thủy sản') || m.includes('thực phẩm') || m.includes('môi trường') || m.includes('sinh học')) {
    return UNIVERSITIES_BY_FIELD.agriculture;
  }
  if (m.includes('sư phạm') || m.includes('tâm lý') || m.includes('xã hội') || m.includes('luật') || m.includes('báo chí') || m.includes('ngôn ngữ') || m.includes('giáo dục') || m.includes('lưu trữ')) {
    return UNIVERSITIES_BY_FIELD.social;
  }
  return UNIVERSITIES_BY_FIELD.business;
}

function getSalaryAndPotential(hCode, dCode, jobTitle) {
  let salary = '15 - 32 triệu VNĐ/tháng';
  let potential = 'Cao';

  if (hCode === 'R' || hCode === 'I') {
    if (dCode === 'D') {
      salary = '20 - 45 triệu VNĐ/tháng';
      potential = 'Rất cao';
    } else if (dCode === 'I') {
      salary = '16 - 35 triệu VNĐ/tháng';
      potential = 'Cao';
    } else if (dCode === 'S') {
      salary = '14 - 28 triệu VNĐ/tháng';
      potential = 'Ổn định';
    } else {
      salary = '18 - 38 triệu VNĐ/tháng';
      potential = 'Cao';
    }
  } else if (hCode === 'E') {
    if (dCode === 'D') {
      salary = '25 - 60 triệu VNĐ/tháng';
      potential = 'Rất cao';
    } else {
      salary = '18 - 40 triệu VNĐ/tháng';
      potential = 'Cao';
    }
  } else if (hCode === 'A') {
    salary = dCode === 'D' || dCode === 'I' ? '18 - 42 triệu VNĐ/tháng' : '14 - 30 triệu VNĐ/tháng';
    potential = dCode === 'D' ? 'Rất cao' : 'Cao';
  } else if (hCode === 'S') {
    salary = dCode === 'D' ? '18 - 35 triệu VNĐ/tháng' : '12 - 25 triệu VNĐ/tháng';
    potential = 'Ổn định';
  } else if (hCode === 'C') {
    salary = dCode === 'D' ? '20 - 45 triệu VNĐ/tháng' : '15 - 32 triệu VNĐ/tháng';
    potential = dCode === 'C' ? 'Ổn định' : 'Cao';
  }

  return { salary, potential };
}

function generateDescription(jobTitle, major, hollandLabel, discLabel) {
  return `Vị trí ${jobTitle} thuộc chuyên ngành đào tạo ${major}. Định hướng phát triển tối ưu theo nhóm ${hollandLabel} kết hợp phong cách làm việc ${discLabel}, phát huy thế mạnh tư duy chuyên môn và phẩm chất nghề nghiệp.`;
}

function generateSkills(jobTitle, major) {
  const m = major.toLowerCase();
  const j = jobTitle.toLowerCase();
  const skills = [];

  if (m.includes('xây dựng') || m.includes('giao thông')) {
    skills.push('Đọc bản vẽ kỹ thuật & mô hình BIM/AutoCAD', 'Giám sát an toàn công trình', 'Quản lý tiến độ dự án', 'Xử lý tình huống kỹ thuật');
  } else if (m.includes('dữ liệu') || m.includes('thông tin') || m.includes('it') || m.includes('an toàn')) {
    skills.push('Tư duy lập trình & thuật toán', 'Phân tích cơ sở dữ liệu', 'Bảo mật hệ thống', 'Quản trị giải pháp công nghệ');
  } else if (m.includes('y ') || m.includes('dược') || m.includes('điều dưỡng')) {
    skills.push('Kiến thức lâm sàng & dược lý', 'Kỹ năng chăm sóc người bệnh', 'Thao tác xét nghiệm chuẩn mực', 'Đạo đức nghề y');
  } else if (m.includes('thiết kế') || m.includes('mỹ thuật') || m.includes('đồ họa')) {
    skills.push('Sử dụng phần mềm sáng tạo chuyên dụng', 'Tư duy bố cục & thẩm mỹ thị giác', 'Phát triển ý tưởng sáng tạo', 'Trình bày giải pháp thị giác');
  } else if (m.includes('kinh doanh') || m.includes('marketing') || m.includes('quản trị')) {
    skills.push('Phân tích thị trường & khách hàng', 'Lập kế hoạch kinh doanh', 'Kỹ năng đàm phán & thuyết phục', 'Quản trị đội ngũ');
  } else if (m.includes('kế toán') || m.includes('kiểm toán') || m.includes('tài chính')) {
    skills.push('Phân tích báo cáo tài chính', 'Kiểm soát số liệu chi tiết', 'Nắm vững chuẩn mực kế toán/thuế', 'Sử dụng phần mềm ERP');
  } else if (m.includes('sư phạm') || m.includes('giáo dục')) {
    skills.push('Kỹ năng sư phạm & truyền đạt', 'Thiết kế bài giảng tương tác', 'Thấu hiểu tâm lý người học', 'Ứng dụng công nghệ giáo dục');
  } else {
    skills.push('Kỹ năng chuyên môn nghiệp vụ', 'Tư duy logic & giải quyết vấn đề', 'Giao tiếp và phối hợp nhóm', 'Tuân thủ quy chuẩn ngành');
  }
  return skills;
}

function generateSuitableRoles(jobTitle) {
  return [
    jobTitle,
    `Chuyên viên cao cấp ${jobTitle}`,
    `Quản lý / Trưởng nhóm chuyên môn`
  ];
}

async function processMatrix() {
  const excelPath = path.join(__dirname, '../../Ma trận dữ liệu sử dụng.xlsx');
  console.log('Reading Excel from:', excelPath);
  const wb = xlsx.readFile(excelPath);
  const sheet = wb.Sheets['DỮ LIỆU IT'];
  const rows = xlsx.utils.sheet_to_json(sheet, {header: 1});

  let curHolland = '';
  let curDisc = '';
  const matrixItems = [];
  const groupCounters = {};

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;
    if (row[0]) curHolland = String(row[0]).trim();
    if (row[1]) curDisc = String(row[1]).trim();
    const jobTitle = row[2] ? String(row[2]).trim() : '';
    const major = row[3] ? String(row[3]).trim() : '';
    const combosStr = row[4] ? String(row[4]).trim() : '';
    if (!jobTitle) continue;

    const hCode = curHolland.charAt(0);
    const dCode = curDisc.charAt(0);
    const groupKey = `${hCode.toLowerCase()}${dCode.toLowerCase()}`;
    groupCounters[groupKey] = (groupCounters[groupKey] || 0) + 1;
    const subIdx = groupCounters[groupKey];
    const id = `cm_${groupKey}_${subIdx}`;

    const combos = combosStr
      ? combosStr.split(/[,;\/]+/).map(s => s.trim().toUpperCase()).filter(Boolean)
      : ['A00', 'A01', 'D01'];

    const majorCode = MAJOR_CODES[major] || '7000000';
    const universities = getUniversitiesForMajor(major);
    const { salary, potential } = getSalaryAndPotential(hCode, dCode, jobTitle);
    const description = generateDescription(jobTitle, major, curHolland, curDisc);
    const keySkills = generateSkills(jobTitle, major);
    const suitableRoles = generateSuitableRoles(jobTitle);

    matrixItems.push({
      id,
      holland: hCode,
      hollandLabel: curHolland,
      disc: dCode,
      discLabel: curDisc,
      jobTitle,
      universityMajor: major,
      majorCode,
      admissionCombinations: combos,
      description,
      keySkills,
      suitableRoles,
      topUniversities: universities,
      averageSalaryRange: salary,
      growthPotential: potential,
      status: 'active'
    });
  }

  console.log(`Extracted ${matrixItems.length} items from Excel.`);

  // 1. Generate careerMatrix.ts
  const outputTsPath = path.join(__dirname, '../data/careerMatrix.ts');
  const existingContent = fs.readFileSync(outputTsPath, 'utf8');

  // Extract everything after CAREER_MATRIX_DATA array end:
  const splitMarker = 'export const UNIVERSITY_MAJORS_LIST';
  let trailingPart = '';
  if (existingContent.includes(splitMarker)) {
    trailingPart = existingContent.substring(existingContent.indexOf(splitMarker));
  }

  const fileHeader = `import type { CareerMatrixItem, UniversityMajor, DISCCode, HollandCode } from '../types/career.ts';

export const CAREER_MATRIX_DATA: CareerMatrixItem[] = ${JSON.stringify(matrixItems, null, 2)};

`;

  const newTsContent = fileHeader + trailingPart;
  fs.writeFileSync(outputTsPath, newTsContent, 'utf8');
  console.log('Successfully updated src/data/careerMatrix.ts!');

  // 2. Update PostgreSQL database
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  try {
    console.log('Connected to PostgreSQL. Syncing career_matrix table...');
    await client.query('BEGIN');

    // Clean existing matrix items
    await client.query('DELETE FROM career_matrix');

    for (const item of matrixItems) {
      await client.query(`
        INSERT INTO career_matrix (
          id, holland, holland_label, disc, disc_label, job_title,
          university_major, major_code, admission_combinations,
          description, key_skills, suitable_roles, top_universities,
          average_salary_range, growth_potential, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `, [
        item.id,
        item.holland,
        item.hollandLabel,
        item.disc,
        item.discLabel,
        item.jobTitle,
        item.universityMajor,
        item.majorCode,
        JSON.stringify(item.admissionCombinations),
        item.description,
        JSON.stringify(item.keySkills),
        JSON.stringify(item.suitableRoles),
        JSON.stringify(item.topUniversities),
        item.averageSalaryRange,
        item.growthPotential,
        item.status
      ]);
    }

    await client.query('COMMIT');
    console.log(`Successfully inserted all ${matrixItems.length} items into database career_matrix!`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Database sync error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

processMatrix().catch(console.error);
