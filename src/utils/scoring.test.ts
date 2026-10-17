import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAssessmentScores, generateEvaluationAnalysis, filterCareers } from './scoring.ts';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions.ts';
import { CAREER_MATRIX_DATA } from '../data/careerMatrix.ts';

test('calculates DISC scores and identifies dominant trait', () => {
  // Simulate user answering R for Holland (1-6) and D for DISC (7-12)
  const answers: Record<number, string> = {
    1: '1-r',
    2: '2-r',
    3: '3-r',
    4: '4-r',
    5: '5-r',
    6: '6-r',
    7: '7-d',
    8: '8-d',
    9: '9-d',
    10: '10-d',
    11: '11-d',
    12: '12-d'
  };

  const result = calculateAssessmentScores(answers, ASSESSMENT_QUESTIONS);

  assert.equal(result.primaryDisc, 'D');
  assert.equal(result.primaryHolland, 'R');
  assert.ok(result.discScores.D > result.discScores.I);
  assert.ok(result.discPercentages.D >= 50);
  assert.ok(result.hollandScores.R >= 25);
});

test('generates evaluation analysis with tailored strengths and advice', () => {
  const analysis = generateEvaluationAnalysis('D', 'C', 'R');
  assert.ok(analysis.title.includes('Quyết Đoán'));
  assert.ok(analysis.strengths.length > 0);
  assert.ok(analysis.idealWorkEnvironment.length > 0);
});

test('filters career matrix by DISC trait D and R', () => {
  const results = filterCareers(CAREER_MATRIX_DATA, { disc: 'D', holland: 'R' });
  assert.ok(results.length >= 6);
  assert.ok(results.some(r => r.jobTitle === 'Chỉ huy công trường'));
  assert.ok(results.some(r => r.universityMajor === 'Kỹ thuật xây dựng'));
});

test('filters career matrix by DISC trait I and R', () => {
  const results = filterCareers(CAREER_MATRIX_DATA, { disc: 'I', holland: 'R' });
  assert.ok(results.some(r => r.jobTitle === 'Chuyên viên tư vấn thiết bị kỹ thuật'));
  assert.ok(results.some(r => r.jobTitle === 'Kỹ sư hỗ trợ khách hàng'));
  assert.ok(results.some(r => r.jobTitle === 'Chuyên viên kinh doanh ô tô'));
});

test('filters career matrix by DISC trait S and R', () => {
  const results = filterCareers(CAREER_MATRIX_DATA, { disc: 'S', holland: 'R' });
  assert.ok(results.some(r => r.jobTitle === 'Kỹ thuật viên bảo trì'));
  assert.ok(results.some(r => r.jobTitle === 'Kỹ thuật viên hệ thống điện'));
  assert.ok(results.some(r => r.jobTitle === 'Chuyên viên vận hành trang trại'));
});

test('filters career matrix by DISC trait C and R', () => {
  const results = filterCareers(CAREER_MATRIX_DATA, { disc: 'C', holland: 'R' });
  assert.ok(results.some(r => r.jobTitle === 'Kỹ sư kiểm định chất lượng'));
  assert.ok(results.some(r => r.jobTitle === 'Chuyên viên an toàn lao động'));
  assert.ok(results.some(r => r.jobTitle === 'Kỹ sư thiết kế máy'));
  assert.ok(results.some(r => r.jobTitle === 'Kỹ thuật viên đo đạc'));
});
