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

const h20 = parseQuestions('cauhoi/HOLLAND-20cau.html');
const h50 = parseQuestions('cauhoi/HOLLANd-50cau.html');
const h70 = parseQuestions('cauhoi/HOLLANd-70cau.html');
const d20 = parseQuestions('cauhoi/DISC-20cau.html');
const d50 = parseQuestions('cauhoi/DISC-50cau.html');
const d70 = parseQuestions('cauhoi/DISC-70cau.html');

console.log('Sample H20 Q1:', h20[0]);
console.log('Sample D20 Q1:', d20[0]);
console.log('Sample D20 Q2:', d20[1]);
console.log('H20 Q count:', h20.length, 'H50 Q count:', h50.length, 'H70 Q count:', h70.length);
console.log('D20 Q count:', d20.length, 'D50 Q count:', d50.length, 'D70 Q count:', d70.length);
