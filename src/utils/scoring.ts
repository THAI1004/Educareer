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
      summary: 'Bạn mang phong cách hành vi tự tin, tập trung cao độ vào kết quả và giải quyết sự cố thực tế. Trong môi trường kỹ thuật, bạn luôn là người dẫn đầu, dám nhận trách nhiệm điều phối công trình và vận hành dây chuyền sản xuất phức tạp.',
      strengths: [
        'Khả năng ra quyết định nhanh chóng dưới áp lực công việc cao',
        'Tư duy giải quyết vấn đề thực tế, không ngại đối mặt sự cố phát sinh',
        'Khả năng quản lý tiến độ và đốc thúc công việc đạt mục tiêu',
        'Ý chí tự chủ cao và bản lĩnh chỉ huy hiện trường'
      ],
      workStyle: 'Trực diện, thẳng thắn, hướng tới hiệu suất và tối ưu hóa thời gian.',
      idealEnv: 'Môi trường làm việc năng động, trao quyền quyết định, có mục tiêu rõ ràng và cơ hội thăng tiến lãnh đạo.',
      growth: [
        'Rèn luyện sự kiên nhẫn khi lắng nghe đồng nghiệp và giải thích quy trình kỹ thuật tỉ mỉ hơn',
        'Chú ý cảm xúc và áp lực của các thành viên trong đội thi công'
      ],
      tips: [
        'Chọn các ngành có yếu tố chỉ huy, điều phối dự án (Kỹ thuật xây dựng, Tự động hóa, Quản lý chuỗi cung ứng).',
        'Tham gia các câu lạc bộ lãnh đạo kỹ thuật hoặc ban quản lý sinh viên tại trường đại học.'
      ]
    },
    I: {
      title: 'Người Truyền Cảm Hứng & Thuyết Phục (Influence)',
      tagline: 'Nhiệt tình, hoạt ngôn, giàu năng lượng và kết nối tuyệt vời',
      summary: 'Bạn sở hữu sự hòa đồng, tài giao tiếp và khả năng truyền tải ý tưởng kỹ thuật một cách dễ hiểu, cuốn hút. Bạn rất giỏi biến các thông số kỹ thuật khô khan thành giá trị thực tế cho khách hàng và đối tác.',
      strengths: [
        'Kỹ năng thuyết trình giải pháp công nghệ ấn tượng và cuốn hút',
        'Khả năng xây dựng mối quan hệ đối tác bền vững và tin cậy',
        'Tinh thần lạc quan, truyền năng lượng tích cực cho cả tập thể',
        'Khả năng nắm bắt tâm lý khách hàng và người nghe xuất sắc'
      ],
      workStyle: 'Sôi nổi, linh hoạt, đề cao sự tương tác xã hội và tính sáng tạo.',
      idealEnv: 'Môi trường cởi mở, thường xuyên tiếp xúc khách hàng, đối tác công nghệ và tổ chức sự kiện chuyên môn.',
      growth: [
        'Tăng cường sự tập trung vào các số liệu chi tiết và ghi chép nhật ký công việc bài bản',
        'Tránh cam kết quá nhiều việc cùng lúc khi chưa rà soát khối lượng kỹ thuật'
      ],
      tips: [
        'Chọn các ngành giao thoa giữa kỹ thuật và kinh doanh/tư vấn (Kỹ thuật cơ khí Pre-sales, Ô tô cao cấp, Nông nghiệp công nghệ cao, Năng lượng sạch).',
        'Phát triển khả năng ngoại ngữ tiếng Anh chuyên ngành kỹ thuật để làm việc với đối tác quốc tế.'
      ]
    },
    S: {
      title: 'Người Kiên Định & Tận Tâm (Steadiness)',
      tagline: 'Điềm tĩnh, chu đáo, đáng tin cậy và gắn bó lâu dài',
      summary: 'Bạn là điểm tựa vững chắc của mọi tập thể kỹ thuật. Bạn làm việc cẩn trọng, kiên nhẫn kiểm tra từng thông số và giữ cho hệ thống máy móc vận hành liên tục không gián đoạn.',
      strengths: [
        'Tính kiên nhẫn cao, thích ứng tốt với các quy trình bảo trì dài hạn',
        'Độ tin cậy và tinh thần trách nhiệm tuyệt đối trong công việc',
        'Khả năng phối hợp đồng đội hòa nhã, giảm thiểu xung đột nội bộ',
        'Sự chu đáo trong việc chăm sóc bảo dưỡng thiết bị và môi trường'
      ],
      workStyle: 'Từ tốn, chắc chắn, tuân thủ chu kỳ kiểm tra và tôn trọng tính bền vững.',
      idealEnv: 'Môi trường ổn định, văn hóa tôn trọng, quy trình chuẩn mực và có sự hỗ trợ lẫn nhau.',
      growth: [
        'Mạnh dạn bày tỏ quan điểm và đề xuất cải tiến khi thấy quy trình chưa tối ưu',
        'Tập làm quen với sự thay đổi đột ngột và rèn luyện phản xạ ra quyết định nhanh'
      ],
      tips: [
        'Chọn các ngành vận hành ổn định, bảo dưỡng hệ thống kỹ thuật (Bảo trì cơ khí, Hệ thống điện, Kỹ thuật y sinh, Quản lý trang trại & thủy sản).',
        'Tích lũy các chứng chỉ vận hành chuyên môn và an toàn lao động quốc gia.'
      ]
    },
    C: {
      title: 'Chuyên Gia Chuẩn Xác & Kỷ Luật (Conscientiousness)',
      tagline: 'Tư duy logic, chặt chẽ, coi trọng tiêu chuẩn và độ chính xác tuyệt đối',
      summary: 'Bạn là người bảo vệ chất lượng và sự an toàn. Với tư duy logic sắc sảo, bạn phân tích từng sai số kỹ thuật, bản vẽ thiết kế 3D và không bao giờ thỏa hiệp với những khiếm khuyết sản phẩm.',
      strengths: [
        'Độ chính xác cao, khả năng phát hiện lỗi kỹ thuật mà người khác bỏ sót',
        'Tư duy phân tích số liệu, bản vẽ và tiêu chuẩn kỹ thuật quốc tế (ISO/IEC/DIN)',
        'Ý thức kỷ luật nghiêm ngặt và tinh thần thượng tôn quy chuẩn an toàn',
        'Khả năng thiết kế mô hình hóa và lập trình chi tiết hoàn hảo'
      ],
      workStyle: 'Phương pháp khoa học, kiểm chứng số liệu thực nghiệm và tài liệu hóa rõ ràng.',
      idealEnv: 'Môi trường chuyên nghiệp, đánh giá dựa trên tiêu chuẩn năng lực, có trang thiết bị đo lường kiểm định tiên tiến.',
      growth: [
        'Tránh quá cầu toàn dẫn đến kéo dài thời gian hoàn thành dự án',
        'Học cách chia sẻ công việc và linh hoạt trước các tình huống thực tế tại hiện trường'
      ],
      tips: [
        'Chọn các ngành đòi hỏi sự chính xác cao (Kiểm định chất lượng cơ khí QA/QC, Thiết kế cơ điện tử, An toàn lao động, Trắc địa bản đồ).',
        'Rèn luyện thành thạo các phần mềm thiết kế và kiểm thử chuyên dụng (AutoCAD, SolidWorks, Matlab, GIS).'
      ]
    }
  };

  const profile = discProfiles[primaryDisc];
  const hollandName = primaryHolland === 'R' ? 'Kỹ thuật - Thực tế' : primaryHolland;

  return {
    title: profile.title,
    codeName: `${primaryDisc}${secondaryDisc}`,
    tagline: profile.tagline,
    summary: profile.summary,
    coreBehavior: `Nhóm hành vi chính: ${primaryDisc} (${profile.title}) phối hợp xu hướng phụ ${secondaryDisc}, kết hợp định hướng nghề nghiệp Holland nhóm ${hollandName}.`,
    strengths: profile.strengths,
    idealWorkEnvironment: profile.idealEnv,
    growthAdvice: profile.growth,
    studyTips: profile.tips
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
