import type { HollandCode, DISCCode, CareerMatrixItem } from '../types/career.ts';

export interface Grade10SubjectPlan {
  code: string; // e.g. "A00", "A01", "D01", "B00", etc.
  name: string; // e.g. "Toán, Vật lý, Hóa học"
  priorityLabel: string; // e.g. "PHƯƠNG ÁN 1 (ƯU TIÊN SỐ 1)"
  badgeColor: string; // e.g. "emerald", "sky", "indigo"
  description: string;
  fourSelectiveSubjects: string[]; // 4 môn học lựa chọn lớp 10 theo CT GDPT 2018
  suitedCareers: string[];
}

export interface Grade10Recommendation {
  primaryPlan: Grade10SubjectPlan;
  secondaryPlan: Grade10SubjectPlan;
  alternativePlan?: Grade10SubjectPlan;
  compulsorySubjectsNote: string;
  advisoryNote: string;
}

// Map admission combination codes to standard subjects
export const ADMISSION_COMBINATION_DETAILS: Record<string, { subjects: string; selective4: string[]; groupDesc: string }> = {
  A00: {
    subjects: 'Toán, Vật lý, Hóa học',
    selective4: ['Vật lý', 'Hóa học', 'Tin học', 'Công nghệ (Công nghiệp)'],
    groupDesc: 'Nhóm Khoa học Tự nhiên & Kỹ thuật - Công nghệ cốt lõi'
  },
  A01: {
    subjects: 'Toán, Vật lý, Tiếng Anh',
    selective4: ['Vật lý', 'Tin học', 'Công nghệ', 'Địa lý hoặc Hóa học'],
    groupDesc: 'Nhóm Kỹ thuật Công nghệ cao & Ngoại ngữ hội nhập'
  },
  B00: {
    subjects: 'Toán, Hóa học, Sinh học',
    selective4: ['Sinh học', 'Hóa học', 'Vật lý', 'Công nghệ (Nông nghiệp/Y sinh)'],
    groupDesc: 'Nhóm Y Dược, Nông lâm sinh học & Môi trường'
  },
  C00: {
    subjects: 'Ngữ văn, Lịch sử, Địa lý',
    selective4: ['Lịch sử', 'Địa lý', 'Giáo dục kinh tế & pháp luật', 'Tin học'],
    groupDesc: 'Nhóm Khoa học Xã hội, Pháp luật & Báo chí truyền thông'
  },
  D01: {
    subjects: 'Toán, Ngữ văn, Tiếng Anh',
    selective4: ['Giáo dục kinh tế & pháp luật', 'Địa lý', 'Tin học', 'Vật lý'],
    groupDesc: 'Nhóm Kinh tế, Quản trị, Marketing & Ngoại ngữ ứng dụng'
  },
  D07: {
    subjects: 'Toán, Hóa học, Tiếng Anh',
    selective4: ['Hóa học', 'Sinh học', 'Vật lý', 'Tin học'],
    groupDesc: 'Nhóm Kỹ thuật Hóa học, Công nghệ Thực phẩm & Môi trường'
  },
  V00: {
    subjects: 'Toán, Vật lý, Vẽ mỹ thuật',
    selective4: ['Vật lý', 'Mỹ thuật', 'Tin học', 'Công nghệ'],
    groupDesc: 'Nhóm Kiến trúc, Quy hoạch đô thị & Thiết kế kết cấu'
  },
  H00: {
    subjects: 'Ngữ văn, Năng khiếu vẽ 1, Năng khiếu vẽ 2',
    selective4: ['Mỹ thuật', 'Lịch sử', 'Địa lý', 'Tin học'],
    groupDesc: 'Nhóm Thiết kế Đồ họa, Mỹ thuật ứng dụng & Nghệ thuật số'
  }
};

/**
 * Calculates tailored Grade 10 THPT subject combinations based on:
 * 1. Primary Holland & DISC personality traits
 * 2. Admission combinations of the student's selected / recommended careers
 */
export function getGrade10Recommendations(
  holland: HollandCode,
  disc: DISCCode,
  recommendedCareers: CareerMatrixItem[] = [],
  selectedMajorName?: string
): Grade10Recommendation {
  // Collect all admission combinations from recommended careers
  const combFrequency: Record<string, number> = {};
  recommendedCareers.forEach((c) => {
    // If career matches student's selected major, give it high priority weight
    const isMajorMatch = selectedMajorName && (
      c.universityMajor.toLowerCase().includes(selectedMajorName.toLowerCase()) ||
      selectedMajorName.toLowerCase().includes(c.universityMajor.toLowerCase())
    );
    const weight = isMajorMatch ? 10 : 1;

    (c.admissionCombinations || []).forEach((code) => {
      combFrequency[code] = (combFrequency[code] || 0) + weight;
    });
  });

  // Sort by frequency
  const sortedCombs = Object.keys(combFrequency).sort((a, b) => combFrequency[b] - combFrequency[a]);

  let primaryCode = 'A00';
  let secondaryCode = 'A01';
  let altCode = 'D07';

  if (sortedCombs.length > 0) {
    primaryCode = sortedCombs[0];
    if (sortedCombs.length > 1) secondaryCode = sortedCombs[1];
    if (sortedCombs.length > 2) altCode = sortedCombs[2];
  } else {
    // Fallback based on Holland
    switch (holland) {
      case 'R': // Realistic - Kỹ thuật
        primaryCode = 'A00';
        secondaryCode = 'A01';
        altCode = 'D07';
        break;
      case 'I': // Investigative - Nghiên cứu
        primaryCode = 'A00';
        secondaryCode = 'B00';
        altCode = 'A01';
        break;
      case 'A': // Artistic - Nghệ thuật
        primaryCode = 'H00';
        secondaryCode = 'V00';
        altCode = 'D01';
        break;
      case 'S': // Social - Xã hội
        primaryCode = 'D01';
        secondaryCode = 'C00';
        altCode = 'B00';
        break;
      case 'E': // Enterprising - Quản lý
        primaryCode = 'A01';
        secondaryCode = 'D01';
        altCode = 'A00';
        break;
      case 'C': // Conventional - Nghiệp vụ
        primaryCode = 'A00';
        secondaryCode = 'A01';
        altCode = 'D01';
        break;
      default:
        primaryCode = 'A00';
        secondaryCode = 'A01';
        altCode = 'D07';
    }
  }

  const primaryInfo = ADMISSION_COMBINATION_DETAILS[primaryCode] || {
    subjects: 'Toán, Vật lý, Hóa học',
    selective4: ['Vật lý', 'Hóa học', 'Tin học', 'Công nghệ'],
    groupDesc: 'Nhóm Khoa học Tự nhiên & Kỹ thuật'
  };

  const secondaryInfo = ADMISSION_COMBINATION_DETAILS[secondaryCode] || {
    subjects: 'Toán, Vật lý, Tiếng Anh',
    selective4: ['Vật lý', 'Tin học', 'Công nghệ', 'Hóa học'],
    groupDesc: 'Nhóm Kỹ thuật & Công nghệ Hội nhập'
  };

  const altInfo = ADMISSION_COMBINATION_DETAILS[altCode] || {
    subjects: 'Toán, Hóa học, Tiếng Anh',
    selective4: ['Hóa học', 'Vật lý', 'Sinh học', 'Tin học'],
    groupDesc: 'Nhóm Mở rộng Cơ hội Xét tuyển'
  };

  return {
    primaryPlan: {
      code: primaryCode,
      name: primaryInfo.subjects,
      priorityLabel: 'PHƯƠNG ÁN 1 (ƯU TIÊN SỐ 1)',
      badgeColor: 'emerald',
      description: primaryInfo.groupDesc,
      fourSelectiveSubjects: primaryInfo.selective4,
      suitedCareers: recommendedCareers.slice(0, 3).map((c) => c.jobTitle)
    },
    secondaryPlan: {
      code: secondaryCode,
      name: secondaryInfo.subjects,
      priorityLabel: 'PHƯƠNG ÁN 2 (DỰ PHÒNG TỐI ƯU)',
      badgeColor: 'sky',
      description: secondaryInfo.groupDesc,
      fourSelectiveSubjects: secondaryInfo.selective4,
      suitedCareers: recommendedCareers.slice(1, 4).map((c) => c.jobTitle)
    },
    alternativePlan: {
      code: altCode,
      name: altInfo.subjects,
      priorityLabel: 'PHƯƠNG ÁN 3 (MỞ RỘNG XÉT TUYỂN)',
      badgeColor: 'indigo',
      description: altInfo.groupDesc,
      fourSelectiveSubjects: altInfo.selective4,
      suitedCareers: recommendedCareers.slice(2, 5).map((c) => c.jobTitle)
    },
    compulsorySubjectsNote:
      'Các môn bắt buộc toàn quốc (4 môn): Ngữ văn, Toán, Ngoại ngữ 1, Lịch sử cùng hoạt động trải nghiệm, hướng nghiệp và GDQP&AN.',
    advisoryNote:
      'Lựa chọn đúng 4 môn lựa chọn ngay từ lớp 10 giúp học sinh học sâu, không bị bỡ ngỡ khi bước vào kỳ thi Tốt nghiệp THPT và xét tuyển Đại học theo chương trình GDPT 2018.'
  };
}
