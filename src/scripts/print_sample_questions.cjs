const fs = require('fs');

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

const h70 = parseQuestions('cauhoi/HOLLANd-70cau.html');
const d70 = parseQuestions('cauhoi/DISC-70cau.html');

console.log('--- HOLLAND QUESTIONS 1-10 ---');
h70.slice(0, 10).forEach(q => {
  console.log(`Q${q.order}: ${q.question}`);
  q.options.forEach(o => console.log(`   ${o.label}: ${o.text}`));
});

console.log('\n--- DISC QUESTIONS 1-10 ---');
d70.slice(0, 10).forEach(q => {
  console.log(`Q${q.order}: ${q.question}`);
  q.options.forEach(o => console.log(`   ${o.label}: ${o.text}`));
});
