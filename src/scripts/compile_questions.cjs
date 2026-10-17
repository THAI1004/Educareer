const fs = require('fs');
const path = require('path');

function parseQuestions(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const cards = html.split('<div class="question-card">').slice(1);
  return cards.map((card, idx) => {
    const qMatch = card.match(/<div class="question-text"><div>([\s\S]*?)<\/div><\/div>/);
    const questionText = qMatch ? qMatch[1].trim() : '';
    const ansMatches = [...card.matchAll(/<span class="ans-label">([A-Z])\.<\/span><span class="ans-text">([\s\S]*?)<\/span>/g)];
    const options = ansMatches.map(m => ({ label: m[1], text: m[2].trim() }));
    return { order: idx + 1, question: questionText, options };
  });
}

// Holland keywords detection
function inferHollandTrait(text, index) {
  const lower = text.toLowerCase();
  if (lower.includes('sản xuất') || lower.includes('kỹ thuật') || lower.includes('máy móc') || lower.includes('thợ') || lower.includes('sửa') || lower.includes('chế tạo') || lower.includes('vận động') || lower.includes('tay chân') || lower.includes('điện nước') || lower.includes('lắp ráp')) return 'R';
  if (lower.includes('nghiên cứu') || lower.includes('khoa học') || lower.includes('phát triển') || lower.includes('giả thuyết') || lower.includes('suy luận') || lower.includes('tư duy') || lower.includes('toán') || lower.includes('phân tích') || lower.includes('tìm hiểu')) return 'I';
  if (lower.includes('thiết kế') || lower.includes('sáng tạo') || lower.includes('nghệ thuật') || lower.includes('vẽ') || lower.includes('nhạc') || lower.includes('ảnh') || lower.includes('hình ảnh') || lower.includes('tự do') || lower.includes('viết văn')) return 'A';
  if (lower.includes('cộng đồng') || lower.includes('xã hội') || lower.includes('giúp đỡ') || lower.includes('dạy') || lower.includes('chia sẻ') || lower.includes('trò chuyện') || lower.includes('tình nguyện') || lower.includes('chăm sóc') || lower.includes('đồng đội')) return 'S';
  if (lower.includes('kinh doanh') || lower.includes('thị trường') || lower.includes('lãnh đạo') || lower.includes('quản lý') || lower.includes('thuyết phục') || lower.includes('đàm phán') || lower.includes('bán') || lower.includes('dẫn dắt') || lower.includes('cơ hội') || lower.includes('chiến lược')) return 'E';
  if (lower.includes('quy trình') || lower.includes('hồ sơ') || lower.includes('bảng biểu') || lower.includes('tổng hợp') || lower.includes('số liệu') || lower.includes('ngăn nắp') || lower.includes('kế toán') || lower.includes('lưu trữ') || lower.includes('quy tắc') || lower.includes('chi tiết') || lower.includes('thủ tục')) return 'C';
  
  // Default circular mapping if neutral
  const traits = ['R', 'I', 'A', 'S', 'E', 'C'];
  return traits[index % traits.length];
}

// DISC keywords detection
function inferDiscTrait(text, index) {
  const lower = text.toLowerCase();
  if (lower.includes('kết quả') || lower.includes('mục tiêu') || lower.includes('quyết') || lower.includes('dẫn dắt') || lower.includes('thẳng') || lower.includes('thử thách') || lower.includes('nhanh') || lower.includes('chốt') || lower.includes('ảnh hưởng') || lower.includes('bảo vệ')) return 'D';
  if (lower.includes('hào hứng') || lower.includes('kết nối') || lower.includes('nhiệt tình') || lower.includes('thuyết phục') || lower.includes('khen') || lower.includes('pha trò') || lower.includes('giao tiếp') || lower.includes('brainstorm') || lower.includes('đám đông') || lower.includes('sôi động')) return 'I';
  if (lower.includes('ổn định') || lower.includes('hòa nhã') || lower.includes('kiên nhẫn') || lower.includes('bền bỉ') || lower.includes('lắng nghe') || lower.includes('hỗ trợ') || lower.includes('nhẹ nhàng') || lower.includes('an toàn') || lower.includes('đồng đội') || lower.includes('chân thành')) return 'S';
  if (lower.includes('chính xác') || lower.includes('quy chuẩn') || lower.includes('kế hoạch') || lower.includes('rủi ro') || lower.includes('chi tiết') || lower.includes('dữ liệu') || lower.includes('tiêu chí') || lower.includes('quy trình') || lower.includes('kịch bản') || lower.includes('sai sót')) return 'C';

  const traits = ['D', 'I', 'S', 'C'];
  return traits[index % traits.length];
}

const sets = [
  { tier: 20, hollandFile: 'cauhoi/HOLLAND-20cau.html', discFile: 'cauhoi/DISC-20cau.html' },
  { tier: 50, hollandFile: 'cauhoi/HOLLANd-50cau.html', discFile: 'cauhoi/DISC-50cau.html' },
  { tier: 70, hollandFile: 'cauhoi/HOLLANd-70cau.html', discFile: 'cauhoi/DISC-70cau.html' }
];

const compiled = {
  20: { holland: [], disc: [] },
  50: { holland: [], disc: [] },
  70: { holland: [], disc: [] }
};

sets.forEach(({ tier, hollandFile, discFile }) => {
  const hRaw = parseQuestions(hollandFile);
  const dRaw = parseQuestions(discFile);

  compiled[tier].holland = hRaw.map((q, idx) => ({
    id: `H${tier}_${idx + 1}`,
    type: 'HOLLAND',
    tier,
    order: idx + 1,
    title: `Câu hỏi ${idx + 1} (${tier} câu)`,
    scenario: q.question,
    options: q.options.map((opt, oIdx) => ({
      id: `H${tier}_${idx + 1}_${opt.label}`,
      label: opt.label,
      text: opt.text,
      hollandTrait: inferHollandTrait(opt.text, oIdx),
      weight: 5
    }))
  }));

  compiled[tier].disc = dRaw.map((q, idx) => ({
    id: `D${tier}_${idx + 1}`,
    type: 'DISC',
    tier,
    order: idx + 1,
    title: `Câu hỏi ${idx + 1} (${tier} câu)`,
    scenario: q.question,
    options: q.options.map((opt, oIdx) => ({
      id: `D${tier}_${idx + 1}_${opt.label}`,
      label: opt.label,
      text: opt.text,
      discTrait: inferDiscTrait(opt.text, oIdx),
      weight: 5
    }))
  }));
});

const outPath = path.join(__dirname, '../data/extractedQuestions.json');
fs.writeFileSync(outPath, JSON.stringify(compiled, null, 2), 'utf8');
console.log('Successfully generated extractedQuestions.json for tiers 20, 50, 70!');
