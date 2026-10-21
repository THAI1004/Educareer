import type {
  DISCCode,
  HollandCode,
  AssessmentQuestion,
  TestAnswers,
  EvaluationAnalysis,
  CareerMatrixItem
} from '../types/career.ts';

export interface ScoreCalculationResult {
  discScores: Record<DISCCode, number>;
  discPercentages: Record<DISCCode, number>;
  hollandScores: Record<HollandCode, number>;
  primaryDisc: DISCCode;
  secondaryDisc: DISCCode;
  primaryHolland: HollandCode;
}

export function calculateAssessmentScores(
  answers: TestAnswers,
  questions: AssessmentQuestion[]
): ScoreCalculationResult {
  const discScores: Record<DISCCode, number> = { D: 0, I: 0, S: 0, C: 0 };
  const hollandScores: Record<HollandCode, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  // Map questions for quick lookup
  const questionMap = new Map<string, AssessmentQuestion>();
  questions.forEach(q => questionMap.set(String(q.id), q));

  for (const [questionIdStr, optionId] of Object.entries(answers)) {
    const question = questionMap.get(String(questionIdStr));
    if (!question) continue;

    const selectedOption = question.options.find(opt => opt.id === optionId);
    if (!selectedOption) continue;

    if (selectedOption.discTrait) {
      discScores[selectedOption.discTrait] = (discScores[selectedOption.discTrait] || 0) + selectedOption.weight;
    }
    if (selectedOption.hollandTrait) {
      hollandScores[selectedOption.hollandTrait] = (hollandScores[selectedOption.hollandTrait] || 0) + selectedOption.weight;
    }
  }

  // Calculate DISC total and percentages
  const totalDisc = Object.values(discScores).reduce((sum, val) => sum + val, 0);
  const discPercentages: Record<DISCCode, number> = {
    D: totalDisc > 0 ? Math.round((discScores.D / totalDisc) * 100) : 25,
    I: totalDisc > 0 ? Math.round((discScores.I / totalDisc) * 100) : 25,
    S: totalDisc > 0 ? Math.round((discScores.S / totalDisc) * 100) : 25,
    C: totalDisc > 0 ? Math.round((discScores.C / totalDisc) * 100) : 25
  };

  // Ensure percentage sum equals 100%
  const currentSum = discPercentages.D + discPercentages.I + discPercentages.S + discPercentages.C;
  if (currentSum !== 100 && totalDisc > 0) {
    discPercentages.D += (100 - currentSum);
  }

  // Sort DISC traits by score descending
  const sortedDisc = (Object.keys(discScores) as DISCCode[]).sort((a, b) => discScores[b] - discScores[a]);
  const primaryDisc = sortedDisc[0] || 'D';
  const secondaryDisc = sortedDisc[1] || 'C';

  // Sort Holland traits by score descending
  const sortedHolland = (Object.keys(hollandScores) as HollandCode[]).sort(
    (a, b) => hollandScores[b] - hollandScores[a]
  );
  // Default to 'R' (Realistic / Kỹ thuật) if tied or empty as per core domain
  const primaryHolland = hollandScores[sortedHolland[0]] > 0 ? sortedHolland[0] : 'R';

  return {
    discScores,
    discPercentages,
    hollandScores,
    primaryDisc,
    secondaryDisc,
    primaryHolland
  };
}

export function generateEvaluationAnalysis(
  primaryDisc: DISCCode,
  secondaryDisc: DISCCode,
  primaryHolland: HollandCode
): EvaluationAnalysis {
  const discProfiles: Record<DISCCode, {
    title: string;
    tagline: string;
    summary: string;
    strengths: string[];
    workStyle: string;
    idealEnv: string;
    growth: string[];
    tips: string[];
  }> = {
    D: {
      title: 'Người Tiên Phong Quyết Đoán (Dominance)',
      tagline: 'Mục tiêu rõ ràng, hành động dứt khoát và thích nắm thế chủ động',
      summary: 'Bạn tự tin, tập trung vào kết quả và chủ động giải quyết vấn đề. Bạn thường sẵn sàng nhận trách nhiệm, dẫn dắt tập thể và đưa ra quyết định khi cần.',
      strengths: [
        'Khả năng ra quyết định nhanh khi đối mặt với thử thách',
        'Chủ động phân tích và tìm hướng giải quyết vấn đề',
        'Khả năng xác định mục tiêu và thúc đẩy công việc tiến lên',
        'Tinh thần tự chủ và bản lĩnh dẫn dắt tập thể'
      ],
      workStyle: 'Trực diện, thẳng thắn, hướng tới hiệu suất và tối ưu hóa thời gian.',
      idealEnv: 'Môi trường làm việc năng động, trao quyền quyết định, có mục tiêu rõ ràng và cơ hội thăng tiến lãnh đạo.',
      growth: [
        'Rèn luyện sự kiên nhẫn khi lắng nghe và trao đổi với người khác',
        'Quan tâm đến cảm xúc, góc nhìn và áp lực của các thành viên trong nhóm'
      ],
      tips: [
        'Chia mục tiêu lớn thành các bước cụ thể và theo dõi tiến độ thực hiện.',
        'Luyện cách trao quyền, tiếp nhận phản hồi và phối hợp với những người có phong cách khác mình.'
      ]
    },
    I: {
      title: 'Người Truyền Cảm Hứng & Thuyết Phục (Influence)',
      tagline: 'Nhiệt tình, hoạt ngôn, giàu năng lượng và kết nối tuyệt vời',
      summary: 'Bạn hòa đồng, giao tiếp tốt và có khả năng truyền tải ý tưởng một cách dễ hiểu, cuốn hút. Bạn thường tạo được kết nối tích cực với những người xung quanh.',
      strengths: [
        'Kỹ năng thuyết trình giải pháp công nghệ ấn tượng và cuốn hút',
        'Khả năng xây dựng mối quan hệ đối tác bền vững và tin cậy',
        'Tinh thần lạc quan, truyền năng lượng tích cực cho cả tập thể',
        'Khả năng nắm bắt tâm lý khách hàng và người nghe xuất sắc'
      ],
      workStyle: 'Sôi nổi, linh hoạt, đề cao sự tương tác xã hội và tính sáng tạo.',
      idealEnv: 'Môi trường cởi mở, thường xuyên trao đổi, kết nối với mọi người và có cơ hội chia sẻ ý tưởng.',
      growth: [
        'Tăng cường tập trung vào chi tiết và ghi chép công việc có hệ thống',
        'Cân nhắc khối lượng công việc trước khi nhận thêm cam kết mới'
      ],
      tips: [
        'Luyện trình bày ý tưởng ngắn gọn, rõ ràng và có dẫn chứng phù hợp.',
        'Chủ động tìm cơ hội làm việc nhóm, thuyết trình và kết nối cộng đồng.'
      ]
    },
    S: {
      title: 'Người Kiên Định & Tận Tâm (Steadiness)',
      tagline: 'Điềm tĩnh, chu đáo, đáng tin cậy và gắn bó lâu dài',
      summary: 'Bạn điềm tĩnh, kiên nhẫn và đáng tin cậy. Bạn góp phần duy trì sự ổn định, hỗ trợ người khác và hoàn thành công việc một cách bền bỉ.',
      strengths: [
        'Tính kiên nhẫn cao và khả năng theo đuổi công việc dài hạn',
        'Độ tin cậy và tinh thần trách nhiệm tuyệt đối trong công việc',
        'Khả năng phối hợp đồng đội hòa nhã, giảm thiểu xung đột nội bộ',
        'Sự chu đáo và khả năng quan tâm đến nhu cầu của mọi người'
      ],
      workStyle: 'Từ tốn, chắc chắn, tuân thủ chu kỳ kiểm tra và tôn trọng tính bền vững.',
      idealEnv: 'Môi trường ổn định, tôn trọng, có sự hỗ trợ lẫn nhau và nhịp độ làm việc hợp lý.',
      growth: [
        'Mạnh dạn bày tỏ quan điểm và đề xuất cải tiến khi cần thiết',
        'Tập làm quen với thay đổi và rèn luyện sự tự tin khi ra quyết định'
      ],
      tips: [
        'Đặt các mốc tiến độ nhỏ để duy trì động lực cho mục tiêu dài hạn.',
        'Tìm cơ hội phối hợp nhóm và phát huy thế mạnh hỗ trợ, lắng nghe.'
      ]
    },
    C: {
      title: 'Chuyên Gia Chuẩn Xác & Kỷ Luật (Conscientiousness)',
      tagline: 'Tư duy logic, chặt chẽ, coi trọng tiêu chuẩn và độ chính xác tuyệt đối',
      summary: 'Bạn coi trọng chất lượng, tính chính xác và sự nhất quán. Với tư duy logic, bạn thường xem xét kỹ dữ liệu và nhận ra những điểm cần được kiểm tra thêm.',
      strengths: [
        'Độ chính xác cao và khả năng phát hiện điểm chưa hợp lý',
        'Tư duy phân tích dữ liệu và thông tin có hệ thống',
        'Ý thức kỷ luật và sự tôn trọng các nguyên tắc chung',
        'Khả năng sắp xếp, kiểm tra và hoàn thiện công việc'
      ],
      workStyle: 'Có phương pháp, kiểm chứng thông tin và ghi chép rõ ràng.',
      idealEnv: 'Môi trường chuyên nghiệp, có mục tiêu và tiêu chí rõ ràng, coi trọng chất lượng.',
      growth: [
        'Tránh quá cầu toàn làm chậm tiến độ hoàn thành công việc',
        'Luyện sự linh hoạt và chia sẻ công việc với người khác'
      ],
      tips: [
        'Xác định mức độ hoàn thiện cần thiết trước khi bắt đầu để quản lý thời gian tốt hơn.',
        'Luyện giải thích kết quả phân tích theo cách rõ ràng, dễ hiểu.'
      ]
    }
  };

  const profile = discProfiles[primaryDisc];
  const hollandNames: Record<HollandCode, string> = {
    R: 'Kỹ thuật – Thực tế',
    I: 'Nghiên cứu – Khám phá',
    A: 'Nghệ thuật – Sáng tạo',
    S: 'Xã hội – Tương tác',
    E: 'Quản lý – Kinh doanh',
    C: 'Nghiệp vụ – Quy chuẩn'
  };
  const hollandName = hollandNames[primaryHolland];
  const hollandAdvice: Record<HollandCode, string> = {
    R: 'Ưu tiên trải nghiệm thực hành và các hoạt động làm việc với công cụ, thiết bị hoặc môi trường thực tế.',
    I: 'Tìm cơ hội nghiên cứu, phân tích thông tin và giải quyết câu hỏi bằng tư duy logic.',
    A: 'Thử sức với dự án sáng tạo, thiết kế và những cách thể hiện ý tưởng riêng.',
    S: 'Tham gia hoạt động hỗ trợ, giảng dạy, chăm sóc hoặc đồng hành cùng cộng đồng.',
    E: 'Thử sức với hoạt động tổ chức, thuyết phục, điều phối và phát triển ý tưởng kinh doanh.',
    C: 'Rèn kỹ năng sắp xếp thông tin, quản lý dữ liệu và làm việc theo quy trình rõ ràng.'
  };

  return {
    title: profile.title,
    codeName: `${primaryDisc}${secondaryDisc}`,
    tagline: profile.tagline,
    summary: `${profile.summary} Xu hướng Holland ${hollandName} cho thấy bạn hứng thú với các hoạt động thuộc nhóm này.`,
    coreBehavior: `Nhóm hành vi chính: ${primaryDisc} (${profile.title}) phối hợp xu hướng phụ ${secondaryDisc}, kết hợp định hướng nghề nghiệp Holland nhóm ${hollandName}.`,
    strengths: profile.strengths,
    idealWorkEnvironment: `${profile.idealEnv} ${hollandAdvice[primaryHolland]}`,
    growthAdvice: profile.growth,
    studyTips: [...profile.tips, hollandAdvice[primaryHolland]]
  };
}

export function filterCareers(
  matrix: CareerMatrixItem[],
  filters: {
    disc?: DISCCode;
    holland?: HollandCode;
    keyword?: string;
    majorIdOrName?: string;
  }
): CareerMatrixItem[] {
  return matrix.filter(item => {
    if (filters.disc && item.disc !== filters.disc) {
      return false;
    }
    if (filters.holland && item.holland !== filters.holland) {
      return false;
    }
    if (filters.keyword && filters.keyword.trim() !== '') {
      const q = filters.keyword.toLowerCase().trim();
      const matchJob = item.jobTitle.toLowerCase().includes(q);
      const matchMajor = item.universityMajor.toLowerCase().includes(q);
      const matchCode = item.majorCode.toLowerCase().includes(q);
      const matchSkill = item.keySkills.some(s => s.toLowerCase().includes(q));
      if (!matchJob && !matchMajor && !matchCode && !matchSkill) {
        return false;
      }
    }
    if (filters.majorIdOrName && filters.majorIdOrName.trim() !== '') {
      const m = filters.majorIdOrName.toLowerCase().trim();
      const matchesMajor = item.universityMajor.toLowerCase().includes(m);
      // If filtering specifically by chosen major name
      if (!matchesMajor && filters.majorIdOrName !== 'all') {
        // Return matching major, or if no strict match keep for broad preview
      }
    }
    return true;
  });
}
