const fs = require('fs');

function parseQuestions(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const cards = html.split('<div class="question-card">').slice(1);
  const result = [];
  cards.forEach((card, idx) => {
    const qMatch = card.match(/<div class="question-text"><div>([\s\S]*?)<\/div><\/div>/);
    const questionText = qMatch ? qMatch[1].trim() : '';
    const ansMatches = [...card.matchAll(/<span class="ans-label">([A-Z])\.<\/span><span class="ans-text">([\s\S]*?)<\/span>/g)];
    const options = ansMatches.map(m => ({ label: m[1], text: m[2].trim() }));
    result.push({
      order: idx + 1,
      question: questionText,
      options
    });
  });
  return result;
}

const h20 = parseQuestions('cauhoi/HOLLAND-20cau.html');
const h50 = parseQuestions('cauhoi/HOLLANd-50cau.html');
const h70 = parseQuestions('cauhoi/HOLLANd-70cau.html');
const d20 = parseQuestions('cauhoi/DISC-20cau.html');
const d50 = parseQuestions('cauhoi/DISC-50cau.html');
const d70 = parseQuestions('cauhoi/DISC-70cau.html');

console.log('Parsed counts:', {
  h20: h20.length,
  h50: h50.length,
  h70: h70.length,
  d20: d20.length,
  d50: d50.length,
  d70: d70.length
});

console.log('Sample H20 question 1:', JSON.stringify(h20[0], null, 2));
console.log('Sample D20 question 1:', JSON.stringify(d20[0], null, 2));
