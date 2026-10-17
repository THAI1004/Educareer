import type { AssessmentQuestion } from '../types/career.ts';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ==========================================
  // BÀI TEST 1: TRẮC NGHIỆM HOLLAND (RIASEC)
  // Đo lường 6 nhóm sở thích nghề nghiệp:
  // R - Kỹ thuật / Thực tế
  // I - Nghiên cứu / Khám phá
  // A - Nghệ thuật / Sáng tạo
  // S - Xã hội / Tương tác
  // E - Quản trị / Doanh nghiệp
  // C - Nghiệp vụ / Quy chuẩn
  // ==========================================
  {
    id: 1,
    type: 'HOLLAND',
    title: 'Hoạt động trải nghiệm thực tế bạn hứng thú nhất',
    scenario: 'Nếu được chọn tham gia một dự án ngoại khóa hoặc câu lạc bộ sinh viên, bạn sẽ chọn tham gia hoạt động nào?',
    options: [
      {
        id: '1-r',
        text: 'Chế tạo xe đua tiết kiệm năng lượng, lắp ráp robot, thi công mô hình kết cấu cầu đường hoặc bảo trì máy móc cơ khí.',
        hollandTrait: 'R',
        weight: 5
      },
      {
        id: '1-i',
        text: 'Nghiên cứu mô phỏng thuật toán AI, phân tích dữ liệu cảm biến đo đạc hoặc thử nghiệm vật liệu mới trong phòng thí nghiệm.',
        hollandTrait: 'I',
        weight: 5
      },
      {
        id: '1-a',
        text: 'Thiết kế đồ họa 3D, tạo hình kiểu dáng công nghiệp, dàn dựng video quảng bá dự án hoặc trang trí không gian triển lãm.',
        hollandTrait: 'A',
        weight: 5
      },
      {
        id: '1-s',
        text: 'Tổ chức các hoạt động tình nguyện, hướng dẫn sinh viên khóa dưới học tập, tư vấn hỗ trợ cộng đồng sinh viên.',
        hollandTrait: 'S',
        weight: 5
      },
      {
        id: '1-e',
        text: 'Tìm kiếm nhà tài trợ doanh nghiệp, đàm phán thương mại, lập kế hoạch tài chính và điều hành toàn bộ sự kiện.',
        hollandTrait: 'E',
        weight: 5
      },
      {
        id: '1-c',
        text: 'Lập biểu mẫu theo dõi tiến độ, kiểm soát ngân sách chi tiêu, lưu trữ hồ sơ chứng từ và kiểm tra tuân thủ điều lệ.',
        hollandTrait: 'C',
        weight: 5
      }
    ]
  },
  {
    id: 2,
    type: 'HOLLAND',
    title: 'Môi trường làm việc lý tưởng bạn mong muốn gắn bó',
    scenario: 'Sau khi tốt nghiệp đại học, không gian và môi trường làm việc nào khiến bạn cảm thấy tràn đầy năng lượng nhất?',
    options: [
      {
        id: '2-r',
        text: 'Hiện trường xây dựng, xưởng sản xuất cơ khí - ô tô, trạm vận hành điện lực hoặc nhà máy chế tạo công nghệ cao.',
        hollandTrait: 'R',
        weight: 5
      },
      {
        id: '2-i',
        text: 'Trung tâm nghiên cứu & phát triển (R&D), viện kiểm nghiệm khoa học hoặc phòng phân tích dữ liệu chuyên sâu.',
        hollandTrait: 'I',
        weight: 5
      },
      {
        id: '2-a',
        text: 'Xưởng thiết kế mỹ thuật công nghiệp, studio kiến trúc sáng tạo, nơi tự do thể hiện thẩm mỹ và tư duy đột phá.',
        hollandTrait: 'A',
        weight: 5
      },
      {
        id: '2-s',
        text: 'Trường học, trung tâm đào tạo nhân lực kỹ thuật, cơ sở y tế y sinh hoặc các tổ chức phát triển xã hội.',
        hollandTrait: 'S',
        weight: 5
      },
      {
        id: '2-e',
        text: 'Văn phòng tập đoàn đa quốc gia, phòng kinh doanh giải pháp kỹ thuật công nghệ cao, nơi thường xuyên gặp gỡ đối tác.',
        hollandTrait: 'E',
        weight: 5
      },
      {
        id: '2-c',
        text: 'Phòng kiểm soát chất lượng (QA/QC), ban kế hoạch dự án, bộ phận dữ liệu logistics hoặc phòng hồ sơ tiêu chuẩn.',
        hollandTrait: 'C',
        weight: 5
      }
    ]
  },
  {
    id: 3,
    type: 'HOLLAND',
    title: 'Cách bạn tiếp cận khi sửa chữa hoặc cải tiến vật dụng',
    scenario: 'Khi một thiết bị công nghệ hoặc đồ dùng máy móc trong gia đình gặp sự cố, bạn thường làm gì?',
    options: [
      {
        id: '3-r',
        text: 'Cầm ngay tuốc-nơ-vít, kìm và dụng cụ để tháo rời từng bộ phận, kiểm tra hư hỏng cơ khí/điện và tự tay sửa chữa thay thế.',
        hollandTrait: 'R',
        weight: 5
      },
      {
        id: '3-i',
        text: 'Tra cứu sơ đồ nguyên lý hoạt động, tài liệu hướng dẫn kỹ thuật của nhà sản xuất, phân tích nguyên nhân hư hỏng một cách logic.',
        hollandTrait: 'I',
        weight: 5
      },
      {
        id: '3-a',
        text: 'Tìm cách cải biến diện mạo, tân trang màu sắc hoặc thiết kế lại công năng để vật dụng trở nên thẩm mỹ và độc đáo hơn.',
        hollandTrait: 'A',
        weight: 5
      },
      {
        id: '3-c',
        text: 'Ghi chép tình trạng lỗi, kiểm tra thời hạn bảo hành, lập danh mục phụ tùng cần mua theo đúng mã quy chuẩn của hãng.',
        hollandTrait: 'C',
        weight: 5
      }
    ]
  },
  {
    id: 4,
    type: 'HOLLAND',
    title: 'Môn học hoặc lĩnh vực chuyên môn bạn hứng thú nhất',
    scenario: 'Trong chương trình đào tạo đại học, những nội dung học tập nào hấp dẫn bạn nhất?',
    options: [
      {
        id: '4-r',
        text: 'Các môn thực hành xưởng, đồ án môn học thi công, thí nghiệm sức bền vật liệu, cơ khí động lực học hoặc máy điện.',
        hollandTrait: 'R',
        weight: 5
      },
      {
        id: '4-i',
        text: 'Toán học ứng dụng, vật lý đại cương, lý thuyết điều khiển tự động, thuật toán phân tích số liệu và nghiên cứu khoa học.',
        hollandTrait: 'I',
        weight: 5
      },
      {
        id: '4-e',
        text: 'Quản trị dự án kỹ thuật, kinh tế xây dựng, kỹ năng đàm phán hợp đồng cung ứng và khởi nghiệp công nghệ.',
        hollandTrait: 'E',
        weight: 5
      },
      {
        id: '4-c',
        text: 'Hệ thống tiêu chuẩn ISO, lập dự toán kinh phí, kiểm định chất lượng QA/QC, vẽ kỹ thuật tiêu chuẩn CAD/BIM.',
        hollandTrait: 'C',
        weight: 5
      }
    ]
  },
  {
    id: 5,
    type: 'HOLLAND',
    title: 'Loại công cụ và phương tiện bạn thích sử dụng',
    scenario: 'Khi thực hiện một công việc, bạn cảm thấy tự tin và hào hứng nhất với công cụ nào?',
    options: [
      {
        id: '5-r',
        text: 'Máy móc gia công cơ khí, thiết bị cầm tay, máy bay trắc địa drone, máy toàn đạc hoặc hệ thống điều khiển PLC tại hiện trường.',
        hollandTrait: 'R',
        weight: 5
      },
      {
        id: '5-i',
        text: 'Phần mềm mô phỏng mô hình toán (Matlab, Python, Ansys), thiết bị đo lường thí nghiệm vi mạch và dữ liệu phân tích.',
        hollandTrait: 'I',
        weight: 5
      },
      {
        id: '5-s',
        text: 'Kênh truyền thông, diễn đàn giao lưu chia sẻ kỹ thuật, nhóm làm việc tương tác trực tiếp với khách hàng hoặc sinh viên.',
        hollandTrait: 'S',
        weight: 5
      },
      {
        id: '5-c',
        text: 'Bảng tính Excel chuyên sâu, phần mềm quản lý ERP/SAP, hệ thống cơ sở dữ liệu số liệu định lượng và báo cáo.',
        hollandTrait: 'C',
        weight: 5
      }
    ]
  },
  {
    id: 6,
    type: 'HOLLAND',
    title: 'Giá trị công việc mang lại sự tự hào cho bạn',
    scenario: 'Sau 5 - 10 năm nữa nhìn lại sự nghiệp, điều gì sẽ khiến bạn cảm thấy tự hào nhất?',
    options: [
      {
        id: '6-r',
        text: 'Nhìn thấy những công trình tòa nhà, cây cầu, dây chuyền sản xuất hoặc phương tiện do chính bàn tay mình xây dựng, vận hành.',
        hollandTrait: 'R',
        weight: 5
      },
      {
        id: '6-i',
        text: 'Đã tìm ra phát minh giải pháp khoa học mới, viết được báo cáo nghiên cứu có giá trị thực tiễn cao cho xã hội.',
        hollandTrait: 'I',
        weight: 5
      },
      {
        id: '6-e',
        text: 'Đã xây dựng được doanh nghiệp vững mạnh, đưa giải pháp công nghệ vươn tầm thị trường và lãnh đạo đội ngũ lớn.',
        hollandTrait: 'E',
        weight: 5
      },
      {
        id: '6-c',
        text: 'Đã xây dựng và duy trì hệ thống kiểm soát chất lượng an toàn tuyệt đối, không có sai sót, được các đối tác tin cậy.',
        hollandTrait: 'C',
        weight: 5
      }
    ]
  },

  // ==========================================
  // BÀI TEST 2: TRẮC NGHIỆM DISC
  // Đo lường 4 phong cách hành vi & làm việc:
  // D - Dominance (Quyết đoán, Tiên phong, Hướng kết quả)
  // I - Influence (Ảnh hưởng, Truyền cảm hứng, Hướng ngoại)
  // S - Steadiness (Kiên định, Ổn định, Chu đáo, Hợp tác)
  // C - Conscientiousness (Tuân thủ, Kỷ luật, Chuẩn xác, Logic)
  // ==========================================
  {
    id: 7,
    type: 'DISC',
    title: 'Cách bạn xử lý bài tập lớn và dự án nhóm',
    scenario: 'Khi được giao một đề tài lớn ở trường với thời hạn hoàn thành rất gấp, phản ứng tự nhiên của bạn là gì?',
    options: [
      {
        id: '7-d',
        text: 'Nhanh chóng nhận vai trò trưởng nhóm, phân chia công việc quyết đoán và yêu cầu mọi người tập trung vào kết quả đúng hạn.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '7-i',
        text: 'Khởi xướng buổi thảo luận đầy hứng khởi, gắn kết mọi người và đưa ra những ý tưởng sáng tạo độc đáo để tạo ấn tượng mạnh.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '7-s',
        text: 'Lắng nghe ý kiến của tất cả thành viên, chọn phần việc sở trường để làm chu đáo, giữ không khí hòa thuận và hỗ trợ đồng đội khi cần.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '7-c',
        text: 'Lập dàn ý chi tiết, tra cứu tài liệu tiêu chuẩn, thiết lập quy chuẩn trình bày rõ ràng để đảm bảo bài làm không có sai sót nào.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 8,
    type: 'DISC',
    title: 'Phản ứng khi đối mặt với sự cố kỹ thuật bất ngờ',
    scenario: 'Đang chuẩn bị cho buổi nghiệm thu hoặc báo cáo thì hệ thống máy móc/phần mềm gặp trục trặc kỹ thuật, bạn sẽ:',
    options: [
      {
        id: '8-d',
        text: 'Bình tĩnh ra quyết định ngay lập tức, chuyển sang phương án B mà không do dự để không làm gián đoạn tiến độ chung.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '8-i',
        text: 'Động viên tinh thần cả nhóm, linh hoạt giải thích và pha trò nhẹ nhàng để giảm bớt căng thẳng với người tham dự.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '8-s',
        text: 'Kiên nhẫn kiểm tra từng bước theo kinh nghiệm sẵn có, giữ nhịp độ ổn định và giúp đỡ từng người hoàn thành nhiệm vụ.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '8-c',
        text: 'Mở sơ đồ tài liệu kỹ thuật, phân tích nguyên nhân gốc rễ (Root Cause), kiểm tra các thông số log cẩn thận trước khi sửa chữa.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 9,
    type: 'DISC',
    title: 'Phong cách giao tiếp và kết nối xã hội',
    scenario: 'Trong một buổi hội thảo nghề nghiệp hoặc ngày hội việc làm đại học, phong thái quen thuộc của bạn là:',
    options: [
      {
        id: '9-d',
        text: 'Đi thẳng đến các gian hàng doanh nghiệp lớn, đặt câu hỏi trực tiếp về cơ hội thăng tiến và tiêu chí tuyển dụng.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '9-i',
        text: 'Hào hứng làm quen, mở rộng vòng kết nối (networking), xin liên hệ với nhiều diễn giả, nhà tuyển dụng và bạn bè mới.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '9-s',
        text: 'Đi cùng một vài người bạn thân quen, chăm chú lắng nghe các bài chia sẻ và tìm hiểu môi trường làm việc ổn định lâu dài.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '9-c',
        text: 'Đọc kỹ tài liệu giới thiệu, ghi chép số liệu, đối chiếu bảng lương và yêu cầu công việc một cách bài bản.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 10,
    type: 'DISC',
    title: 'Cách bạn đưa ra lựa chọn và quyết định quan trọng',
    scenario: 'Khi cần quyết định lựa chọn giữa 2 phương án thực tập hoặc 2 đề tài tốt nghiệp:',
    options: [
      {
        id: '10-d',
        text: 'Chọn phương án có cơ hội đột phá cao nhất, thách thức nhiều nhất và mang lại vị thế dẫn đầu vượt trội.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '10-i',
        text: 'Chọn nơi có văn hóa sôi nổi, được tương tác với nhiều người, được thể hiện năng khiếu và tự do sáng tạo.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '10-s',
        text: 'Chọn nơi có lộ trình đào tạo rõ ràng, đồng nghiệp thân thiện, công việc ổn định và ít biến động tiêu cực.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '10-c',
        text: 'Lập bảng so sánh Excel đánh giá các tiêu chí định lượng, rủi ro, chính sách và dữ liệu cụ thể trước khi chọn.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 11,
    type: 'DISC',
    title: 'Mục tiêu thúc đẩy bạn nỗ lực mỗi ngày',
    scenario: 'Điều gì mang lại cho bạn cảm giác thỏa mãn và tự hào nhất sau một ngày làm việc/học tập?',
    options: [
      {
        id: '11-d',
        text: 'Chinh phục được mục tiêu khó, hoàn thành xuất sắc trước hạn và khẳng định năng lực cá nhân vượt trội.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '11-i',
        text: 'Nhận được sự công nhận, lời khen ngợi nhiệt tình từ mọi người và truyền được cảm hứng tích cực cho tập thể.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '11-s',
        text: 'Mọi việc diễn ra suôn sẻ êm đẹp, đã giúp đỡ được đồng đội hoàn thành nhiệm vụ và duy trì sự hòa thuận trong nhóm.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '11-c',
        text: 'Tạo ra sản phẩm chuẩn xác, không có bất kỳ lỗi sai nào, quy trình vận hành hoàn hảo đến từng chi tiết nhỏ.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 12,
    type: 'DISC',
    title: 'Cách bạn tiếp nhận phản hồi và xử lý áp lực',
    scenario: 'Khi giáo viên hướng dẫn hoặc cấp trên góp ý về bản vẽ thiết kế hoặc bài tập của bạn:',
    options: [
      {
        id: '12-d',
        text: 'Nghe ngắn gọn trọng tâm vấn đề, sẵn sàng bảo vệ lập luận nếu mình đúng, sau đó lập tức hành động để sửa nhanh.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '12-i',
        text: 'Cởi mở trao đổi, thể hiện thái độ tích cực cầu thị và mong muốn được hướng dẫn thêm cách cải thiện tốt hơn.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '12-s',
        text: 'Lặng lẽ lắng nghe cẩn thận, không thích tranh cãi gay gắt, sau đó từ tốn chỉnh sửa từng phần theo đúng chỉ dẫn.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '12-c',
        text: 'Yêu cầu chỉ rõ tiêu chuẩn và căn cứ kỹ thuật của lời góp ý, ghi chú chi tiết để đối chiếu lại với quy chuẩn.',
        discTrait: 'C',
        weight: 3
      }
    ]
  }
];

export const HOLLAND_QUESTIONS = ASSESSMENT_QUESTIONS.filter(q => q.type === 'HOLLAND');
export const DISC_QUESTIONS = ASSESSMENT_QUESTIONS.filter(q => q.type === 'DISC');
