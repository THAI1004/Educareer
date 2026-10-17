import type { CareerMatrixItem, UniversityMajor, DISCCode, HollandCode } from '../types/career.ts';

export const CAREER_MATRIX_DATA: CareerMatrixItem[] = [
  // --- R – KỸ THUẬT & D – Quyết đoán ---
  {
    id: 'rd-1',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Chỉ huy công trường',
    universityMajor: 'Kỹ thuật xây dựng',
    majorCode: '7580201',
    admissionCombinations: ['A00', 'A01', 'D07'],
    description: 'Chỉ đạo trực tiếp thi công toàn bộ công trình, giám sát an toàn tiến độ, quyết định xử lý sự cố kỹ thuật tại công trường.',
    keySkills: ['Quản lý dự án xây dựng', 'Chỉ huy thi công', 'Xử lý khủng hoảng kỹ thuật', 'Đọc bản vẽ AutoCAD/Revit'],
    suitableRoles: ['Chỉ huy trưởng công trình', 'Giám đốc ban quản lý dự án', 'Kỹ sư quản lý tiến độ'],
    topUniversities: ['ĐH Xây dựng Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Giao thông Vận tải', 'ĐH Kiến trúc'],
    averageSalaryRange: '18 - 40 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'rd-2',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Kỹ sư vận hành sản xuất',
    universityMajor: 'Kỹ thuật cơ khí',
    majorCode: '7520103',
    admissionCombinations: ['A00', 'A01'],
    description: 'Tổ chức, điều phối dây chuyền thiết bị máy móc công nghiệp, tối ưu năng suất ca kíp, ra quyết định khắc phục sự cố máy nhanh chóng.',
    keySkills: ['Quản lý dây chuyền công nghiệp', 'Bảo trì phòng ngừa (TPM)', 'Vận hành hệ thống thủy lực khí nén', 'Tối ưu OEE'],
    suitableRoles: ['Trưởng phòng sản xuất', 'Kỹ sư điều hành xưởng', 'Quản đốc nhà máy'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Công nghiệp Hà Nội'],
    averageSalaryRange: '16 - 35 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'rd-3',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Quản lý thi công điện',
    universityMajor: 'Kỹ thuật điện',
    majorCode: '7520201',
    admissionCombinations: ['A00', 'A01', 'D07'],
    description: 'Chỉ đạo thi công lắp đặt hệ thống cơ điện công trình (M&E), trạm biến áp, phân phối tải điện công nghiệp.',
    keySkills: ['Thiết kế thi công M&E', 'An toàn điện cao thế/hạ thế', 'Quản lý tổ đội thi công', 'Tiêu chuẩn IEC'],
    suitableRoles: ['Chỉ huy trưởng cơ điện M&E', 'Kỹ sư trưởng hệ thống điện', 'Trưởng ban cơ điện tòa nhà'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Điện lực', 'ĐH Bách Khoa - ĐH Đà Nẵng', 'ĐH Sư phạm Kỹ thuật TP.HCM'],
    averageSalaryRange: '18 - 38 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'rd-4',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Điều phối vận tải',
    universityMajor: 'Logistics và quản lý chuỗi cung ứng',
    majorCode: '7510605',
    admissionCombinations: ['A00', 'A01', 'D01'],
    description: 'Lập kế hoạch lộ trình, quyết định điều động đội tàu xe, giải quyết thông quan và tắc nghẽn luồng hàng dưới áp lực thời gian cao.',
    keySkills: ['Tối ưu tuyến đường vận tải', 'Quản trị đội xe TMS/WMS', 'Xử lý tình huống giao vận khẩn', 'Đàm phán nhà xe'],
    suitableRoles: ['Trưởng phòng điều độ vận tải', 'Fleet Operations Manager', 'Supply Chain Dispatcher'],
    topUniversities: ['ĐH Giao thông Vận tải', 'ĐH Kinh tế Quốc dân', 'ĐH Hàng hải Việt Nam', 'ĐH Quốc tế - ĐHQG TP.HCM'],
    averageSalaryRange: '15 - 32 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'rd-5',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Kỹ sư robot công nghiệp',
    universityMajor: 'Kỹ thuật điều khiển và tự động hóa',
    majorCode: '7520216',
    admissionCombinations: ['A00', 'A01', 'D07'],
    description: 'Thiết kế, tích hợp và triển khai hệ thống cánh tay robot và dây chuyền tự động hóa thông minh (Industry 4.0).',
    keySkills: ['Lập trình Robot PLC/SCADA', 'Thị giác máy tính công nghiệp', 'Tích hợp hệ thống điều khiển', 'Cảm biến & truyền thông công nghiệp'],
    suitableRoles: ['Robotics Lead Engineer', 'Kỹ sư tích hợp hệ thống tự động hóa', 'R&D Automation Manager'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Sư phạm Kỹ thuật TP.HCM', 'Học viện Kỹ thuật Quân sự'],
    averageSalaryRange: '20 - 45 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'rd-6',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Kỹ sư công trình giao thông',
    universityMajor: 'Kỹ thuật xây dựng công trình giao thông',
    majorCode: '7580205',
    admissionCombinations: ['A00', 'A01'],
    description: 'Chỉ huy xây dựng cầu đường, hầm chui, cảng biển sân bay; xử lý nền móng và tiến độ dự án hạ tầng trọng điểm quốc gia.',
    keySkills: ['Thiết kế đường ô tô & cầu lớn', 'Khảo sát địa chất công trình', 'Điều hành thi công mặt đường', 'Nghiệm thu khối lượng dự án'],
    suitableRoles: ['Chỉ huy gói thầu cầu đường', 'Kỹ sư tư vấn giám sát', 'Chuyên viên kỹ thuật Ban QLDA'],
    topUniversities: ['ĐH Giao thông Vận tải', 'ĐH Xây dựng Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH GTVT TP.HCM'],
    averageSalaryRange: '16 - 35 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },

  // --- R – KỸ THUẬT & I – Ảnh hưởng ---
  {
    id: 'ri-1',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Chuyên viên tư vấn thiết bị kỹ thuật',
    universityMajor: 'Công nghệ kỹ thuật cơ khí',
    majorCode: '7510201',
    admissionCombinations: ['A00', 'A01'],
    description: 'Gặp gỡ khách hàng, thuyết trình giải pháp máy móc thiết bị cơ khí, chứng minh hiệu quả đầu tư và thuyết phục doanh nghiệp mua hàng.',
    keySkills: ['Kỹ năng tư vấn giải pháp (Pre-sales)', 'Giao tiếp & thuyết trình kỹ thuật', 'Hiểu biết sâu máy CNC/thiết bị nặng', 'Chăm sóc khách hàng B2B'],
    suitableRoles: ['Technical Sales Engineer', 'Chuyên viên tư vấn thiết bị cơ khí', 'Account Manager thiết bị công nghiệp'],
    topUniversities: ['ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Bách Khoa Hà Nội', 'ĐH Công nghiệp Hà Nội', 'ĐH Bách Khoa Đà Nẵng'],
    averageSalaryRange: '18 - 45 triệu VNĐ/tháng (có hoa hồng)',
    growthPotential: 'Rất cao'
  },
  {
    id: 'ri-2',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Kỹ sư hỗ trợ khách hàng',
    universityMajor: 'Kỹ thuật điện tử - viễn thông',
    majorCode: '7520207',
    admissionCombinations: ['A00', 'A01'],
    description: 'Làm việc trực tiếp với khách hàng doanh nghiệp để đào tạo sử dụng thiết bị viễn thông, mạng, xử lý thắc mắc và xây dựng mối quan hệ tin cậy.',
    keySkills: ['Customer Support Engineering', 'Xử lý lỗi mạng viễn thông/IoT', 'Giao tiếp đồng cảm & kiên nhẫn', 'Đào tạo kỹ thuật người dùng'],
    suitableRoles: ['Field Application Engineer (FAE)', 'Kỹ sư dịch vụ sau bán hàng', 'Trưởng nhóm CSKH kỹ thuật'],
    topUniversities: ['Học viện Công nghệ Bưu chính Viễn thông', 'ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Công nghệ - ĐHQGHN'],
    averageSalaryRange: '15 - 30 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'ri-3',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Chuyên viên kinh doanh ô tô',
    universityMajor: 'Công nghệ kỹ thuật ô tô',
    majorCode: '7510205',
    admissionCombinations: ['A00', 'A01'],
    description: 'Tư vấn các dòng xe hơi, tính năng an toàn, động cơ Hybrid/EV cho khách hàng; tổ chức sự kiện lái thử xe và duy trì mạng lưới đối tác.',
    keySkills: ['Kiến thức công nghệ ô tô & EV', 'Nghệ thuật đàm phán chốt sale', 'Xây dựng thương hiệu cá nhân', 'Dịch vụ hậu mãi ô tô cao cấp'],
    suitableRoles: ['Chuyên viên tư vấn ô tô hạng sang', 'Trưởng phòng kinh doanh đại lý 3S', 'Chuyên gia sản phẩm (Product Genius)'],
    topUniversities: ['ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Giao thông Vận tải', 'ĐH Bách Khoa Hà Nội', 'ĐH Công nghiệp TP.HCM'],
    averageSalaryRange: '20 - 50+ triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'ri-4',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Hướng dẫn viên trải nghiệm nông nghiệp',
    universityMajor: 'Nông nghiệp công nghệ cao',
    majorCode: '7620118',
    admissionCombinations: ['A00', 'B00', 'D07'],
    description: 'Thiết kế và dẫn dắt tour trải nghiệm thực tế tại các nông trại công nghệ cao, truyền cảm hứng về canh tác hữu cơ, thủy canh cho du khách và học sinh.',
    keySkills: ['Hoạt náo & dẫn tour trải nghiệm', 'Hiểu biết mô hình nông nghiệp thông minh', 'Kể chuyện (Storytelling)', 'Tổ chức sự kiện nông nghiệp sinh thái'],
    suitableRoles: ['Quản lý trải nghiệm Farmstay', 'Điều phối viên giáo dục nông nghiệp xanh', 'Chuyên viên PR nông trại sinh thái'],
    topUniversities: ['Học viện Nông nghiệp Việt Nam', 'ĐH Nông Lâm TP.HCM', 'ĐH Cần Thơ', 'ĐH Lâm nghiệp'],
    averageSalaryRange: '12 - 25 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'ri-5',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Chuyên viên tư vấn công nghệ nông nghiệp',
    universityMajor: 'Nông nghiệp công nghệ cao',
    majorCode: '7620118',
    admissionCombinations: ['A00', 'B00', 'D07'],
    description: 'Chuyển giao các giải pháp nhà màng thông minh, hệ thống tưới nhỏ giọt tự động và cảm biến IoT cho bà con nông dân và hợp tác xã.',
    keySkills: ['Chuyển giao công nghệ nông nghiệp', 'Giao tiếp gần gũi với nông dân/HTX', 'Tư vấn quy trình VietGAP/GlobalGAP', 'Trình diễn mô hình mẫu'],
    suitableRoles: ['Chuyên viên khuyến nông hiện đại', 'Agritech Consultant', 'Đại diện kỹ thuật vùng của tập đoàn nông nghiệp'],
    topUniversities: ['Học viện Nông nghiệp Việt Nam', 'ĐH Nông Lâm TP.HCM', 'ĐH Cần Thơ', 'ĐH Nông Lâm Thái Nguyên'],
    averageSalaryRange: '15 - 32 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'ri-6',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Chuyên viên tư vấn giải pháp năng lượng',
    universityMajor: 'Kỹ thuật năng lượng',
    majorCode: '7520114',
    admissionCombinations: ['A00', 'A01', 'D07'],
    description: 'Khảo sát nhu cầu tiêu thụ điện, tư vấn giải pháp điện mặt trời áp mái, điện gió, lưu trữ năng lượng xanh cho doanh nghiệp và nhà máy.',
    keySkills: ['Phân tích hiệu quả kinh tế năng lượng', 'Tư vấn giải pháp Net Zero', 'Thuyết phục khách hàng đầu tư ESG', 'Tính toán hoàn vốn ROI'],
    suitableRoles: ['Energy Solutions Specialist', 'Renewable Energy Project Consultant', 'Chuyên viên tư vấn điện xanh B2B'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Điện lực', 'ĐH Bách Khoa TP.HCM', 'ĐH Bách Khoa Đà Nẵng'],
    averageSalaryRange: '18 - 40 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },

  // --- R – KỸ THUẬT & S – Ổn định ---
  {
    id: 'rs-1',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'S',
    discLabel: 'S – Ổn định',
    jobTitle: 'Kỹ thuật viên bảo trì',
    universityMajor: 'Công nghệ kỹ thuật cơ khí',
    majorCode: '7510201',
    admissionCombinations: ['A00', 'A01'],
    description: 'Thực hiện kiểm tra định kỳ, tra dầu, thay thế linh kiện hao mòn, giữ cho toàn bộ hệ thống máy móc nhà máy vận hành êm ái, an toàn và bền bỉ.',
    keySkills: ['Bảo trì định kỳ máy cơ khí', 'Tính kiên trì tỉ mỉ', 'Đọc hiểu cẩm nang bảo dưỡng máy', 'An toàn lao động cơ khí'],
    suitableRoles: ['Kỹ thuật viên bảo trì chính', 'Tổ trưởng tổ bảo dưỡng', 'Chuyên viên cơ điện nhà máy'],
    topUniversities: ['ĐH Công nghiệp Hà Nội', 'ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Công nghiệp TP.HCM', 'CĐ Kỹ thuật Cao Thắng'],
    averageSalaryRange: '12 - 22 triệu VNĐ/tháng',
    growthPotential: 'Ổn định'
  },
  {
    id: 'rs-2',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'S',
    discLabel: 'S – Ổn định',
    jobTitle: 'Kỹ thuật viên hệ thống điện',
    universityMajor: 'Công nghệ kỹ thuật điện, điện tử',
    majorCode: '7510301',
    admissionCombinations: ['A00', 'A01'],
    description: 'Theo dõi chỉ số bảng điện, đảm bảo nguồn điện cho tòa nhà/xưởng sản xuất luôn liên tục, sẵn sàng ứng cứu khi xảy ra nhảy áp hoặc mất nguồn.',
    keySkills: ['Đo kiểm điện áp và dòng tải', 'Bảo trì máy phát điện & UPS', 'Lắp ráp tủ điện công nghiệp', 'Tuân thủ quy trình an toàn'],
    suitableRoles: ['Nhân viên quản lý trạm điện', 'Kỹ thuật viên điện tòa nhà', 'Kỹ thuật viên trạm biến áp'],
    topUniversities: ['ĐH Điện lực', 'ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Công nghiệp Hà Nội', 'ĐH Giao thông Vận tải'],
    averageSalaryRange: '12 - 24 triệu VNĐ/tháng',
    growthPotential: 'Ổn định'
  },
  {
    id: 'rs-3',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'S',
    discLabel: 'S – Ổn định',
    jobTitle: 'Chuyên viên vận hành trang trại',
    universityMajor: 'Chăn nuôi',
    majorCode: '7620105',
    admissionCombinations: ['A00', 'B00', 'D07'],
    description: 'Chăm sóc đều đặn đàn gia súc gia cầm, quản lý khẩu phần ăn, tiêm phòng định kỳ và giám sát vệ sinh môi trường chăn nuôi khép kín.',
    keySkills: ['Theo dõi sức khỏe vật nuôi', 'Vận hành hệ thống chuồng trại tự động', 'Kiên nhẫn & yêu thiên nhiên', 'Kiểm soát an toàn sinh học'],
    suitableRoles: ['Trưởng trại chăn nuôi', 'Kỹ thuật viên thú y trang trại', 'Chuyên viên quản lý dinh dưỡng vật nuôi'],
    topUniversities: ['Học viện Nông nghiệp Việt Nam', 'ĐH Nông Lâm TP.HCM', 'ĐH Cần Thơ', 'ĐH Tây Nguyên'],
    averageSalaryRange: '13 - 26 triệu VNĐ/tháng',
    growthPotential: 'Ổn định'
  },
  {
    id: 'rs-4',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'S',
    discLabel: 'S – Ổn định',
    jobTitle: 'Kỹ thuật viên môi trường',
    universityMajor: 'Công nghệ kỹ thuật môi trường',
    majorCode: '7510406',
    admissionCombinations: ['A00', 'B00', 'D07'],
    description: 'Lấy mẫu nước thải, khí thải, vận hành hệ thống xử lý nước và rác thải công nghiệp, đảm bảo chỉ số xả thải đạt quy chuẩn nhà nước.',
    keySkills: ['Vận hành trạm xử lý nước thải', 'Lấy mẫu và phân tích chỉ tiêu môi trường', 'Ghi chép nhật ký vận hành', 'Bảo dưỡng bơm lọc bể hóa chất'],
    suitableRoles: ['Kỹ thuật viên trạm xử lý nước thải', 'Nhân viên giám sát quan trắc môi trường', 'Chuyên viên HSE phụ trách môi trường'],
    topUniversities: ['ĐH Tài nguyên và Môi trường Hà Nội', 'ĐH Khoa học Tự nhiên - ĐHQG TP.HCM', 'ĐH Bách Khoa TP.HCM', 'ĐH Nông Lâm TP.HCM'],
    averageSalaryRange: '12 - 25 triệu VNĐ/tháng',
    growthPotential: 'Ổn định'
  },
  {
    id: 'rs-5',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'S',
    discLabel: 'S – Ổn định',
    jobTitle: 'Kỹ thuật viên thiết bị y tế',
    universityMajor: 'Kỹ thuật y sinh',
    majorCode: '7520212',
    admissionCombinations: ['A00', 'A01', 'B00'],
    description: 'Chăm sóc và bảo dưỡng máy chụp X-quang, MRI, máy thở, theo dõi hiệu chuẩn máy tại bệnh viện để các bác sĩ an tâm khám chữa bệnh.',
    keySkills: ['Hiệu chuẩn thiết bị y tế', 'Cẩn thận tỉ mỉ độ chính xác cao', 'Bảo trì máy móc hỗ trợ sự sống', 'Thấu hiểu môi trường bệnh viện'],
    suitableRoles: ['Kỹ sư thiết bị y tế bệnh viện', 'Chuyên viên dịch vụ kỹ thuật hãng y tế', 'Kỹ thuật viên hiệu chuẩn phòng mổ'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Quốc tế - ĐHQG TP.HCM', 'ĐH Bách Khoa TP.HCM', 'ĐH Y Hà Nội (Phối hợp kỹ thuật)'],
    averageSalaryRange: '14 - 28 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'rs-6',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'S',
    discLabel: 'S – Ổn định',
    jobTitle: 'Kỹ sư nuôi trồng thủy sản',
    universityMajor: 'Nuôi trồng thủy sản',
    majorCode: '7620301',
    admissionCombinations: ['A00', 'B00', 'D07'],
    description: 'Theo dõi chất lượng nguồn nước ao hồ, độ mặn, pH, chế độ dinh dưỡng cho tôm, cá; duy trì quy trình ổn định suốt vụ nuôi trồng.',
    keySkills: ['Quản lý môi trường ao nuôi', 'Kiểm soát dịch bệnh thủy sản', 'Kiên trì theo dõi vụ mùa', 'Ứng dụng vi sinh vật có lợi'],
    suitableRoles: ['Kỹ sư quản lý ao tôm công nghệ cao', 'Trưởng trạm sản xuất giống cá', 'Kỹ thuật viên trại nuôi thủy hải sản'],
    topUniversities: ['ĐH Thủy sản Nha Trang', 'ĐH Cần Thơ', 'Học viện Nông nghiệp Việt Nam', 'ĐH Nông Lâm TP.HCM'],
    averageSalaryRange: '13 - 26 triệu VNĐ/tháng',
    growthPotential: 'Ổn định'
  },

  // --- R – KỸ THUẬT & C – Tuân thủ ---
  {
    id: 'rc-1',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'C',
    discLabel: 'C – Tuân thủ',
    jobTitle: 'Kỹ sư kiểm định chất lượng',
    universityMajor: 'Kỹ thuật cơ khí',
    majorCode: '7520103',
    admissionCombinations: ['A00', 'A01'],
    description: 'Dùng thước kẹp, máy đo quang học, máy siêu âm khuyết tật kim loại để kiểm tra từng sản phẩm xuất xưởng, đảm bảo tuân thủ 100% dung sai kỹ thuật.',
    keySkills: ['Đo lường cơ khí chính xác', 'Quy trình QA/QC & ISO 9001', 'Đọc hiểu bản vẽ dung sai GD&T', 'Lập báo cáo không phù hợp (NCR)'],
    suitableRoles: ['Kỹ sư QA/QC cơ khí', 'Thanh tra kiểm định chất lượng xuất khẩu', 'Trưởng phòng đo lường kỹ thuật'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Công nghiệp Hà Nội'],
    averageSalaryRange: '15 - 30 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'rc-2',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'C',
    discLabel: 'C – Tuân thủ',
    jobTitle: 'Chuyên viên an toàn lao động',
    universityMajor: 'Bảo hộ lao động',
    majorCode: '7860101',
    admissionCombinations: ['A00', 'A01', 'B00'],
    description: 'Xây dựng nội quy an toàn, kiểm tra thiết bị bảo hộ, kiểm định giàn giáo dây điện và phòng cháy chữa cháy, nghiêm cấm mọi vi phạm quy chuẩn.',
    keySkills: ['Luật an toàn vệ sinh lao động', 'Đánh giá nguy cơ rủi ro rủi ro (HIRA)', 'Kiểm tra hiện trường khắt khe', 'Huấn luyện an toàn nhà xưởng'],
    suitableRoles: ['HSE Officer công trường', 'Chuyên viên an toàn nhà máy hóa chất', 'Trưởng ban an toàn sức khỏe môi trường'],
    topUniversities: ['ĐH Công đoàn', 'ĐH Tôn Đức Thắng', 'ĐH Mỏ - Địa chất', 'ĐH Sư phạm Kỹ thuật TP.HCM'],
    averageSalaryRange: '16 - 32 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'rc-3',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'C',
    discLabel: 'C – Tuân thủ',
    jobTitle: 'Kỹ sư thiết kế máy',
    universityMajor: 'Kỹ thuật cơ điện tử',
    majorCode: '7520114',
    admissionCombinations: ['A00', 'A01'],
    description: 'Sử dụng phần mềm SolidWorks, NX, Inventor để mô hình hóa 3D chi tiết máy, tính toán sức bền vật liệu và thiết kế bản vẽ chuẩn xác tuyệt đối.',
    keySkills: ['Thiết kế CAD/CAM/CAE 3D', 'Tính toán ứng suất & sức bền', 'Quy chuẩn tiêu chuẩn DIN/JIS', 'Mô phỏng động lực học cơ cấu'],
    suitableRoles: ['Mechanical Design Engineer', 'R&D Mechatronics Engineer', 'Kỹ sư mô phỏng sức bền FEA'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Sư phạm Kỹ thuật TP.HCM', 'ĐH Bách Khoa Đà Nẵng'],
    averageSalaryRange: '18 - 38 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'rc-4',
    holland: 'R',
    hollandLabel: 'R – KỸ THUẬT',
    disc: 'C',
    discLabel: 'C – Tuân thủ',
    jobTitle: 'Kỹ thuật viên đo đạc',
    universityMajor: 'Kỹ thuật trắc địa - bản đồ',
    majorCode: '7520503',
    admissionCombinations: ['A00', 'A01'],
    description: 'Sử dụng máy toàn đạc điện tử, GPS RTK, Flycam khảo sát địa hình thực địa, ghi nhận tọa độ chính xác từng milimet để phục vụ quy hoạch bản đồ.',
    keySkills: ['Vận hành máy toàn đạc điện tử & GPS', 'Xử lý số liệu GIS & MicroStation', 'Tính toán cao độ và lưới tọa độ', 'Lập bản đồ địa chính'],
    suitableRoles: ['Kỹ sư trắc địa công trình', 'Chuyên viên khảo sát địa hình địa chính', 'Kỹ thuật viên quan trắc lún nghiêng'],
    topUniversities: ['ĐH Mỏ - Địa chất', 'ĐH Tài nguyên và Môi trường', 'ĐH Bách Khoa TP.HCM', 'ĐH Khoa học Tự nhiên'],
    averageSalaryRange: '13 - 26 triệu VNĐ/tháng',
    growthPotential: 'Ổn định'
  },

  // --- Các nhóm mở rộng (để hỗ trợ sinh viên khi làm bài test ra các nhóm Holland khác) ---
  {
    id: 'id-1',
    holland: 'I',
    hollandLabel: 'I – NGHIÊN CỨU',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Kiến trúc sư giải pháp phần mềm',
    universityMajor: 'Khoa học máy tính / Công nghệ phần mềm',
    majorCode: '7480101',
    admissionCombinations: ['A00', 'A01', 'D01', 'D07'],
    description: 'Quyết định kiến trúc hệ thống công nghệ lớn, công nghệ lõi AI, dẫn dắt đội ngũ kỹ thuật giải quyết bài toán phức tạp.',
    keySkills: ['Thiết kế kiến trúc Cloud & Microservices', 'Lập trình thuật toán nâng cao', 'Lãnh đạo nhóm công nghệ', 'Phân tích hệ thống'],
    suitableRoles: ['Solution Architect', 'Tech Lead', 'Giám đốc công nghệ CTO'],
    topUniversities: ['ĐH Bách Khoa Hà Nội', 'ĐH Bách Khoa TP.HCM', 'ĐH Công nghệ - ĐHQGHN', 'ĐH CNTT - ĐHQG TP.HCM'],
    averageSalaryRange: '30 - 70+ triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'ii-1',
    holland: 'I',
    hollandLabel: 'I – NGHIÊN CỨU',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Chuyên gia phân tích dữ liệu kinh doanh',
    universityMajor: 'Khoa học dữ liệu / Hệ thống thông tin',
    majorCode: '7480109',
    admissionCombinations: ['A00', 'A01', 'D01', 'D07'],
    description: 'Khai phá dữ liệu lớn và trực quan hóa thành các câu chuyện dữ liệu sinh động, thuyết phục ban lãnh đạo ra quyết định chiến lược.',
    keySkills: ['Data Storytelling & Dashboard', 'SQL, Python phân tích dữ liệu', 'Kỹ năng trình bày và thuyết phục', 'Tư duy nghiệp vụ kinh doanh'],
    suitableRoles: ['Business Intelligence Analyst (BI)', 'Data Scientist', 'Chuyên viên phân tích khách hàng'],
    topUniversities: ['ĐH Kinh tế Quốc dân', 'ĐH Ngoại Thương', 'ĐH Bách Khoa', 'ĐH Kinh tế TP.HCM'],
    averageSalaryRange: '20 - 45 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'ic-1',
    holland: 'I',
    hollandLabel: 'I – NGHIÊN CỨU',
    disc: 'C',
    discLabel: 'C – Tuân thủ',
    jobTitle: 'Dược sĩ nghiên cứu & thử nghiệm lâm sàng',
    universityMajor: 'Dược học',
    majorCode: '7720201',
    admissionCombinations: ['A00', 'B00'],
    description: 'Tuân thủ nghiêm ngặt quy trình nghiên cứu điều chế thuốc, kiểm tra độc tính, thử nghiệm lâm sàng và hồ sơ cấp phép.',
    keySkills: ['Hóa phân tích dược phẩm', 'Thực hành phòng thí nghiệm tốt (GLP)', 'Soát xét hồ sơ thuốc', 'Kiên trì phân tích mẫu vi lượng'],
    suitableRoles: ['Dược sĩ R&D', 'Chuyên viên thử nghiệm lâm sàng CRA', 'Kiểm nghiệm viên dược phẩm'],
    topUniversities: ['ĐH Dược Hà Nội', 'ĐH Y Dược TP.HCM', 'Khoa Y Dược - ĐHQGHN', 'ĐH Y Dược Huế'],
    averageSalaryRange: '18 - 36 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'ed-1',
    holland: 'E',
    hollandLabel: 'E – QUẢN LÝ',
    disc: 'D',
    discLabel: 'D – Quyết đoán',
    jobTitle: 'Giám đốc kinh doanh dự án',
    universityMajor: 'Quản trị kinh doanh',
    majorCode: '7340101',
    admissionCombinations: ['A00', 'A01', 'D01', 'D07'],
    description: 'Định hình chiến lược phát triển thị trường, đàm phán hợp đồng giá trị lớn, quyết định mục tiêu doanh số và dẫn dắt đội ngũ.',
    keySkills: ['Hoạch định chiến lược kinh doanh', 'Đàm phán hợp đồng lớn', 'Tư duy mục tiêu quyết liệt', 'Quản trị đội ngũ bán hàng'],
    suitableRoles: ['Business Development Director', 'Head of Sales', 'CEO Startup'],
    topUniversities: ['ĐH Ngoại thương', 'ĐH Kinh tế Quốc dân', 'ĐH Kinh tế TP.HCM', 'Học viện Tài chính'],
    averageSalaryRange: '30 - 80+ triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'ei-1',
    holland: 'E',
    hollandLabel: 'E – QUẢN LÝ',
    disc: 'I',
    discLabel: 'I – Ảnh hưởng',
    jobTitle: 'Giám đốc truyền thông & tiếp thị (Marketing)',
    universityMajor: 'Marketing / Truyền thông đa phương tiện',
    majorCode: '7340115',
    admissionCombinations: ['A00', 'A01', 'D01', 'D07'],
    description: 'Sáng tạo chiến dịch thương hiệu lan tỏa cảm xúc, thu hút cộng đồng, dẫn dắt các sự kiện ra mắt sản phẩm hoành tráng.',
    keySkills: ['Sáng tạo nội dung lan tỏa', 'Quan hệ công chúng (PR)', 'Tổ chức sự kiện đỉnh cao', 'Giao tiếp truyền cảm hứng'],
    suitableRoles: ['Marketing Director', 'PR Manager', 'Creative Director'],
    topUniversities: ['ĐH Kinh tế Quốc dân', 'ĐH Ngoại Thương', 'Học viện Báo chí & Tuyên truyền', 'ĐH Khoa học Xã hội & Nhân văn'],
    averageSalaryRange: '25 - 60 triệu VNĐ/tháng',
    growthPotential: 'Rất cao'
  },
  {
    id: 'sc-1',
    holland: 'S',
    hollandLabel: 'S – XÃ HỘI',
    disc: 'S',
    discLabel: 'S – Ổn định',
    jobTitle: 'Bác sĩ điều trị đa khoa / Chuyên khoa',
    universityMajor: 'Y khoa',
    majorCode: '7720101',
    admissionCombinations: ['B00'],
    description: 'Thăm khám, lắng nghe bệnh nhân, chữa bệnh bằng tình yêu thương và sự kiên trì, đảm bảo sức khỏe cộng đồng.',
    keySkills: ['Lòng nhân ái y đức', 'Chẩn đoán lâm sàng', 'Giao tiếp trấn an bệnh nhân', 'Cẩn trọng trong đơn thuốc'],
    suitableRoles: ['Bác sĩ điều trị', 'Bác sĩ gia đình', 'Bác sĩ chuyên khoa nội/ngoại'],
    topUniversities: ['ĐH Y Hà Nội', 'ĐH Y Dược TP.HCM', 'ĐH Y khoa Phạm Ngọc Thạch', 'ĐH Y Dược Cần Thơ'],
    averageSalaryRange: '20 - 50 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  },
  {
    id: 'cc-1',
    holland: 'C',
    hollandLabel: 'C – NGHIỆP VỤ',
    disc: 'C',
    discLabel: 'C – Tuân thủ',
    jobTitle: 'Kiểm toán viên độc lập',
    universityMajor: 'Kiểm toán / Kế toán',
    majorCode: '7340302',
    admissionCombinations: ['A00', 'A01', 'D01', 'D07'],
    description: 'Soát xét tính chính xác của sổ sách tài chính, quy chuẩn thuế và chuẩn mực kế toán (VAS/IFRS), đảm bảo minh bạch tuyệt đối.',
    keySkills: ['Chuẩn mực kiểm toán quốc tế', 'Phân tích báo cáo tài chính', 'Tính chính xác bảo mật cao', 'Chứng chỉ CPA/ACCA'],
    suitableRoles: ['Senior Auditor Big 4', 'Trưởng ban kiểm soát nội bộ', 'Kế toán trưởng'],
    topUniversities: ['ĐH Kinh tế Quốc dân', 'Học viện Tài chính', 'ĐH Kinh tế TP.HCM', 'ĐH Ngoại thương'],
    averageSalaryRange: '18 - 45 triệu VNĐ/tháng',
    growthPotential: 'Cao'
  }
];

// Danh sách tất cả các ngành đại học cho sinh viên lựa chọn / tìm kiếm
export const UNIVERSITY_MAJORS_LIST: UniversityMajor[] = [
  {
    id: 'm-ktxd',
    name: 'Kỹ thuật xây dựng',
    code: '7580201',
    category: 'Kỹ thuật & Xây dựng',
    typicalHolland: 'R',
    description: 'Đào tạo kỹ sư thiết kế kết cấu bê tông, cốt thép, quản lý công trường xây dựng dân dụng và công nghiệp.',
    careerOutcomes: ['Chỉ huy công trường', 'Kỹ sư kết cấu', 'Giám sát thi công', 'Kỹ sư dự toán']
  },
  {
    id: 'm-ktck',
    name: 'Kỹ thuật cơ khí',
    code: '7520103',
    category: 'Kỹ thuật & Cơ khí',
    typicalHolland: 'R',
    description: 'Nghiên cứu nguyên lý máy, gia công chế tạo, vận hành dây chuyền sản xuất tự động và kiểm định chất lượng cơ khí.',
    careerOutcomes: ['Kỹ sư vận hành sản xuất', 'Kỹ sư kiểm định chất lượng', 'Kỹ sư bảo trì cơ khí', 'Kỹ sư chế tạo máy']
  },
  {
    id: 'm-ktd',
    name: 'Kỹ thuật điện',
    code: '7520201',
    category: 'Kỹ thuật & Điện - Điện tử',
    typicalHolland: 'R',
    description: 'Chuyên sâu về hệ thống điện năng, truyền tải cao thế, thiết bị điện công nghiệp và năng lượng tái tạo.',
    careerOutcomes: ['Quản lý thi công điện', 'Kỹ sư vận hành lưới điện', 'Kỹ sư thiết kế hệ thống M&E']
  },
  {
    id: 'm-logistics',
    name: 'Logistics và quản lý chuỗi cung ứng',
    code: '7510605',
    category: 'Vận tải & Quản trị Chuỗi cung ứng',
    typicalHolland: 'R',
    description: 'Đào tạo quản lý kho bãi, luồng vận tải hàng hải - đường bộ - hàng không, xuất nhập khẩu và phân phối hàng hóa toàn cầu.',
    careerOutcomes: ['Điều phối vận tải', 'Quản lý kho WMS', 'Chuyên viên xuất nhập khẩu', 'Supply Chain Analyst']
  },
  {
    id: 'm-tdh',
    name: 'Kỹ thuật điều khiển và tự động hóa',
    code: '7520216',
    category: 'Kỹ thuật & Tự động hóa',
    typicalHolland: 'R',
    description: 'Tích hợp phần mềm điều khiển, PLC, cánh tay robot và vi xử lý thông minh trong các nhà máy thông minh Smart Factory.',
    careerOutcomes: ['Kỹ sư robot công nghiệp', 'Kỹ sư lập trình PLC/SCADA', 'Kỹ sư tích hợp tự động hóa']
  },
  {
    id: 'm-xdgt',
    name: 'Kỹ thuật xây dựng công trình giao thông',
    code: '7580205',
    category: 'Kỹ thuật & Giao thông',
    typicalHolland: 'R',
    description: 'Thiết kế, thi công cầu, hầm, đường cao tốc, đường sắt đô thị và hạ tầng giao thông hiện đại.',
    careerOutcomes: ['Kỹ sư công trình giao thông', 'Chỉ huy gói thầu cầu đường', 'Kỹ sư tư vấn giám sát giao thông']
  },
  {
    id: 'm-cnck',
    name: 'Công nghệ kỹ thuật cơ khí',
    code: '7510201',
    category: 'Kỹ thuật & Cơ khí',
    typicalHolland: 'R',
    description: 'Ứng dụng thực hành công nghệ cắt gọt CNC, đo lường kỹ thuật, bảo trì và tư vấn giải pháp máy móc công nghiệp.',
    careerOutcomes: ['Chuyên viên tư vấn thiết bị kỹ thuật', 'Kỹ thuật viên bảo trì', 'Kỹ sư chuyển giao máy móc']
  },
  {
    id: 'm-dtvt',
    name: 'Kỹ thuật điện tử - viễn thông',
    code: '7520207',
    category: 'Kỹ thuật & Điện - Điện tử',
    typicalHolland: 'R',
    description: 'Nghiên cứu sóng vi ba, mạng 5G/6G, chip bán dẫn, thiết bị viễn thông và thiết bị hỗ trợ khách hàng công nghệ.',
    careerOutcomes: ['Kỹ sư hỗ trợ khách hàng', 'Kỹ sư mạng viễn thông', 'Kỹ sư kiểm thử phần cứng']
  },
  {
    id: 'm-oto',
    name: 'Công nghệ kỹ thuật ô tô',
    code: '7510205',
    category: 'Kỹ thuật & Ô tô',
    typicalHolland: 'R',
    description: 'Cấu tạo động cơ đốt trong, xe điện EV, hệ thống điện thân xe, chẩn đoán lỗi và dịch vụ kinh doanh ô tô.',
    careerOutcomes: ['Chuyên viên kinh doanh ô tô', 'Kỹ sư dịch vụ ô tô', 'Cố vấn dịch vụ đại lý 3S/4S']
  },
  {
    id: 'm-nncnc',
    name: 'Nông nghiệp công nghệ cao',
    code: '7620118',
    category: 'Nông nghiệp & Sinh học',
    typicalHolland: 'R',
    description: 'Ứng dụng nhà kính thông minh, tưới tiêu tự động, cảm biến độ ẩm dinh dưỡng và du lịch trải nghiệm nông nghiệp.',
    careerOutcomes: ['Hướng dẫn viên trải nghiệm nông nghiệp', 'Chuyên viên tư vấn công nghệ nông nghiệp', 'Kỹ sư nông trại thông minh']
  },
  {
    id: 'm-ktnl',
    name: 'Kỹ thuật năng lượng',
    code: '7520114',
    category: 'Kỹ thuật & Năng lượng',
    typicalHolland: 'R',
    description: 'Thiết kế nhà máy điện mặt trời, điện gió, thủy điện, tiết kiệm năng lượng và tư vấn phát thải ròng bằng 0 (Net Zero).',
    careerOutcomes: ['Chuyên viên tư vấn giải pháp năng lượng', 'Kỹ sư dự án điện mặt trời/gió', 'Kỹ sư kiểm toán năng lượng']
  },
  {
    id: 'm-cnktd',
    name: 'Công nghệ kỹ thuật điện, điện tử',
    code: '7510301',
    category: 'Kỹ thuật & Điện - Điện tử',
    typicalHolland: 'R',
    description: 'Thực hành bảo trì thiết bị điện lực công nghiệp, tủ điều khiển và mạch điện tử ứng dụng trong xí nghiệp.',
    careerOutcomes: ['Kỹ thuật viên hệ thống điện', 'Kỹ thuật viên điện xí nghiệp', 'Nhân viên bảo trì điện tòa nhà']
  },
  {
    id: 'm-cn',
    name: 'Chăn nuôi',
    code: '7620105',
    category: 'Nông nghiệp & Chăn nuôi',
    typicalHolland: 'R',
    description: 'Quy trình nuôi dưỡng vật nuôi hiện đại, an toàn sinh học, dinh dưỡng động vật và vận hành chuồng trại quy mô công nghiệp.',
    careerOutcomes: ['Chuyên viên vận hành trang trại', 'Kỹ thuật viên dinh dưỡng thú y', 'Quản lý trại giống']
  },
  {
    id: 'm-mt',
    name: 'Công nghệ kỹ thuật môi trường',
    code: '7510406',
    category: 'Môi trường & Tài nguyên',
    typicalHolland: 'R',
    description: 'Thiết kế trạm xử lý nước cấp, nước thải, khí thải, xử lý rác và giám sát các chỉ số chất lượng môi trường.',
    careerOutcomes: ['Kỹ thuật viên môi trường', 'Chuyên viên quan trắc xả thải', 'Kỹ sư vận hành trạm nước thải']
  },
  {
    id: 'm-ktys',
    name: 'Kỹ thuật y sinh',
    code: '7520212',
    category: 'Kỹ thuật & Y tế',
    typicalHolland: 'R',
    description: 'Giao thoa giữa kỹ thuật điện tử - cơ khí với y học: bảo trì, vận hành và sửa chữa máy thở, máy siêu âm, MRI tại viện.',
    careerOutcomes: ['Kỹ thuật viên thiết bị y tế', 'Kỹ sư ứng dụng lâm sàng', 'Kỹ sư bảo trì máy bệnh viện']
  },
  {
    id: 'm-ntts',
    name: 'Nuôi trồng thủy sản',
    code: '7620301',
    category: 'Nông nghiệp & Thủy sản',
    typicalHolland: 'R',
    description: 'Kỹ thuật nuôi tôm công nghệ cao trong bể bạt, nuôi cá biển lồng bè, phòng trị bệnh và quản lý hệ sinh thái ao nuôi.',
    careerOutcomes: ['Kỹ sư nuôi trồng thủy sản', 'Quản lý trại giống tôm cá', 'Kỹ thuật viên dinh dưỡng thủy sản']
  },
  {
    id: 'm-bhld',
    name: 'Bảo hộ lao động',
    code: '7860101',
    category: 'An toàn & Pháp lý Kỹ thuật',
    typicalHolland: 'R',
    description: 'Phòng ngừa tai nạn lao động, kiểm định thiết bị áp lực, trang bị bảo hộ lao động và thanh tra an toàn vệ sinh công nghiệp.',
    careerOutcomes: ['Chuyên viên an toàn lao động', 'Cán bộ HSE công trình', 'Thanh tra kiểm định an toàn']
  },
  {
    id: 'm-cdtt',
    name: 'Kỹ thuật cơ điện tử',
    code: '7520114',
    category: 'Kỹ thuật & Tự động hóa',
    typicalHolland: 'R',
    description: 'Kết hợp cơ khí chính xác, điện tử và công nghệ thông tin để thiết kế máy thông minh, robot và thiết bị tự hành.',
    careerOutcomes: ['Kỹ sư thiết kế máy', 'Kỹ sư R&D cơ điện tử', 'Kỹ sư mô phỏng cơ cấu 3D']
  },
  {
    id: 'm-tdbd',
    name: 'Kỹ thuật trắc địa - bản đồ',
    code: '7520503',
    category: 'Địa chất & Trắc địa',
    typicalHolland: 'R',
    description: 'Đo vẽ bản đồ địa chính, bay quét 3D địa hình bằng drone, quan trắc biến dạng công trình nhà cao tầng và đập thủy điện.',
    careerOutcomes: ['Kỹ thuật viên đo đạc', 'Kỹ sư trắc địa công trình', 'Chuyên viên số hóa bản đồ GIS']
  },
  {
    id: 'm-cntt',
    name: 'Khoa học máy tính & Công nghệ thông tin',
    code: '7480101',
    category: 'Công nghệ thông tin',
    typicalHolland: 'I',
    description: 'Lập trình phần mềm, trí tuệ nhân tạo, an toàn thông tin và kiến trúc mạng điện toán đám mây.',
    careerOutcomes: ['Kiến trúc sư giải pháp phần mềm', 'Kỹ sư phát triển phần mềm', 'AI Engineer']
  },
  {
    id: 'm-qtkd',
    name: 'Quản trị kinh doanh',
    code: '7340101',
    category: 'Kinh tế & Quản trị',
    typicalHolland: 'E',
    description: 'Hoạch định chiến lược kinh doanh, quản trị nhân sự, điều hành dự án và phát triển doanh nghiệp.',
    careerOutcomes: ['Giám đốc kinh doanh dự án', 'Quản lý vận hành', 'Khởi nghiệp kinh doanh']
  },
  {
    id: 'm-mkt',
    name: 'Marketing và Truyền thông',
    code: '7340115',
    category: 'Kinh tế & Tiếp thị',
    typicalHolland: 'E',
    description: 'Tiếp thị kỹ thuật số, nghiên cứu hành vi người tiêu dùng, quan hệ công chúng PR và xây dựng thương hiệu.',
    careerOutcomes: ['Giám đốc truyền thông & tiếp thị', 'Chuyên viên Content & Brand', 'Digital Marketer']
  },
  {
    id: 'm-ktkt',
    name: 'Kiểm toán & Kế toán',
    code: '7340302',
    category: 'Kinh tế & Tài chính',
    typicalHolland: 'C',
    description: 'Thẩm định báo cáo tài chính, kiểm soát nội bộ, tuân thủ pháp luật thuế và tối ưu chi phí kế toán.',
    careerOutcomes: ['Kiểm toán viên độc lập', 'Kế toán trưởng', 'Chuyên viên kiểm soát rủi ro tài chính']
  }
];

export const DISC_TRAITS_INFO: Record<DISCCode, {
  name: string;
  fullName: string;
  color: string;
  bgLight: string;
  borderColor: string;
  characteristics: string;
  keywords: string[];
}> = {
  D: {
    name: 'D – Quyết đoán',
    fullName: 'Dominance (Thống trị / Quyết đoán)',
    color: '#ef4444',
    bgLight: '#fef2f2',
    borderColor: '#fca5a5',
    characteristics: 'Tự tin, hướng tới kết quả, thích dẫn dắt, chấp nhận thử thách, ra quyết định dứt khoát và thích sự chủ động.',
    keywords: ['Mục tiêu', 'Hành động nhanh', 'Cạnh tranh', 'Tiên phong', 'Chỉ huy']
  },
  I: {
    name: 'I – Ảnh hưởng',
    fullName: 'Influence (Ảnh hưởng / Truyền cảm hứng)',
    color: '#f59e0b',
    bgLight: '#fffbeb',
    borderColor: '#fcd34d',
    characteristics: 'Nhiệt tình, hướng ngoại, cởi mở, có khả năng thuyết phục, kết nối mối quan hệ và tạo năng lượng tích cực.',
    keywords: ['Thuyết trình', 'Giao tiếp', 'Truyền cảm hứng', 'Mạng lưới', 'Sáng tạo']
  },
  S: {
    name: 'S – Ổn định',
    fullName: 'Steadiness (Kiên định / Ổn định)',
    color: '#10b981',
    bgLight: '#ecfdf5',
    borderColor: '#6ee7b7',
    characteristics: 'Điềm đạm, kiên nhẫn, đáng tin cậy, chu đáo, thích môi trường làm việc hòa nhã, có quy trình ổn định lâu dài.',
    keywords: ['Tỉ mỉ', 'Bền bỉ', 'Hỗ trợ', 'Tận tâm', 'Lắng nghe']
  },
  C: {
    name: 'C – Tuân thủ',
    fullName: 'Conscientiousness (Tuân thủ / Kỷ luật)',
    color: '#3b82f6',
    bgLight: '#eff6ff',
    borderColor: '#93c5fd',
    characteristics: 'Chính xác, kỷ luật, tư duy logic, coi trọng chuẩn mực chất lượng, cẩn trọng trong từng chi tiết và con số.',
    keywords: ['Chính xác', 'Quy chuẩn', 'Phân tích', 'Chất lượng', 'Chi tiết']
  }
};

export const HOLLAND_TRAITS_INFO: Record<HollandCode, {
  name: string;
  fullName: string;
  badgeColor: string;
  description: string;
}> = {
  R: {
    name: 'R – Kỹ thuật',
    fullName: 'Realistic (Thực tế - Kỹ thuật)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Thích làm việc với máy móc, thiết bị, công cụ, vật liệu xây dựng, kỹ thuật thực địa và vận hành cơ khí.'
  },
  I: {
    name: 'I – Nghiên cứu',
    fullName: 'Investigative (Nghiên cứu - Khám phá)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Thích quan sát, phân tích dữ liệu, giải quyết vấn đề bằng khoa học, toán học và logic chuyên sâu.'
  },
  A: {
    name: 'A – Nghệ thuật',
    fullName: 'Artistic (Nghệ thuật - Sáng tạo)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Thích sự đổi mới, thẩm mỹ, thiết kế thị giác, tự do thể hiện bản sắc cá nhân và không gian mở.'
  },
  S: {
    name: 'S – Xã hội',
    fullName: 'Social (Xã hội - Tương tác)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Thích hỗ trợ, chữa lành, giảng dạy, chia sẻ và đồng hành vì sự phát triển của cộng đồng con người.'
  },
  E: {
    name: 'E – Quản lý',
    fullName: 'Enterprising (Quản lý - Kinh doanh)',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    description: 'Thích đàm phán, thuyết phục, dẫn dắt đội ngũ, quản trị mục tiêu doanh thu và tìm kiếm cơ hội thị trường.'
  },
  C: {
    name: 'C – Nghiệp vụ',
    fullName: 'Conventional (Nghiệp vụ - Quy chuẩn)',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Thích sự ngăn nắp, dữ liệu chính xác, bảng tính, quy chuẩn pháp lý và bảo mật thông tin.'
  }
};
