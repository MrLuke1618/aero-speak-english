import { DynamicTopic, SubMode } from './types';

export const CURATED_TOPICS: Record<'en' | 'vi', Record<SubMode, DynamicTopic[]>> = {
  en: {
    coffee_chat: [
      {
        title: 'Morning Rituals & Peak Productivity',
        context: 'You are sharing your morning habits with an international colleague over coffee.',
        questions: [
          'What does your typical morning routine look like before starting work or study?',
          'Do you believe morning habits directly influence how productive you feel throughout the day?',
          'If you had an extra hour every morning with zero obligations, how would you spend it?',
        ],
        suggestedKeyWords: ['morning ritual', 'peak productivity', 'unwind', 'set the tone', 'deliberate practice'],
      },
      {
        title: 'Hobbies That Shape Identity',
        context: 'A casual conversation with a friend about creative pastimes and passions outside work.',
        questions: [
          'What is a leisure activity or hobby you have pursued for years, and why do you love it?',
          'How has this pastime influenced the way you think or solve problems in daily life?',
          'Is there a new skill or creative craft you would love to master in the next twelve months?',
        ],
        suggestedKeyWords: ['creative outlet', 'cultivate passion', 'decompress', 'intrinsic motivation', 'deep dive'],
      },
    ],
    travel_survival: [
      {
        title: 'Navigating Airport Transit & Connecting Flights',
        context: 'You have just landed at an international hub with a tight 45-minute connecting flight.',
        questions: [
          'Excuse me, I have a tight connection to Tokyo departing in 40 minutes. Which terminal does flight NH802 depart from?',
          'Do I need to collect my checked luggage and re-check it, or is it automatically transferred to my final destination?',
          'Where is the fastest security express lane for transit passengers?',
        ],
        suggestedKeyWords: ['connecting flight', 'transit corridor', 'baggage carousel', 'boarding gate', 'expedited lane'],
      },
      {
        title: 'Resolving a Hotel Room Reservation Mix-up',
        context: 'You arrive at a hotel in London at midnight, but the front desk cannot locate your booking confirmation.',
        questions: [
          'Good evening, I have a guaranteed reservation under my name for three nights, but the system shows no record.',
          'Here is my digital booking confirmation code and payment voucher. Could you double-check under alternative spelling?',
          'If this room tier is currently unavailable, what complimentary upgrade or alternative room can you provide for tonight?',
        ],
        suggestedKeyWords: ['booking confirmation', 'complimentary upgrade', 'guaranteed reservation', 'front desk manager', 'hotel voucher'],
      },
    ],
    opinion_builder: [
      {
        title: 'The Shift Toward Artificial Intelligence in Creative Work',
        context: '60-Second Challenge: Articulate your perspective on AI tools assisting human writers, artists, and engineers.',
        questions: [
          'Will generative AI diminish human creative originality or amplify human potential?',
          'How can professionals best future-proof their careers against automated workplace disruption?',
        ],
        suggestedKeyWords: ['generative revolution', 'human ingenuity', 'symbiotic collaboration', 'automate routine tasks', 'critical judgment'],
      },
      {
        title: 'Remote Collaboration vs. Physical Office Culture',
        context: '60-Second Challenge: Speak without pausing about the trade-offs of permanent remote work.',
        questions: [
          'Does permanent working from home undermine team camaraderie and serendipitous innovation?',
          'What constitutes the ideal hybrid equilibrium for sustainable long-term performance?',
        ],
        suggestedKeyWords: ['serendipitous encounters', 'asynchronous workflow', 'work-life equilibrium', 'isolation fatigue', 'hybrid synergy'],
      },
    ],
    ielts_part1: [
      {
        title: 'Hometown Architecture & Urban Evolution',
        context: 'IELTS Speaking Part 1: Introductory interview regarding the place where you grew up.',
        questions: [
          'Where did you spend most of your childhood?',
          'What noticeable changes has your hometown experienced over the past five to ten years?',
          'Do you think you will continue living in your current city in the long run?',
        ],
        suggestedKeyWords: ['rapid urbanization', 'bustling metropolitan', 'nostalgic landmarks', 'infrastructure overhaul', 'residential tranquility'],
      },
      {
        title: 'Reading Habits & Digital Media',
        context: 'IELTS Speaking Part 1: Discussing literature, reading preferences, and screen habits.',
        questions: [
          'Do you prefer reading physical printed books or electronic screen formats?',
          'What genres of literature or articles do you find yourself drawn to most often?',
          'Did your family or teachers encourage you to read regularly when you were younger?',
        ],
        suggestedKeyWords: ['avid reader', 'tactile experience', 'e-book reader', 'broaden horizons', 'voracious appetite for knowledge'],
      },
    ],
    ielts_part2: [
      {
        title: 'An Ambitious Goal You Worked Diligently to Achieve',
        context: 'IELTS Speaking Part 2 Cue Card: 1 minute notes preparation, 2 minutes speaking.',
        questions: ['Speak continuously for 2 minutes covering all cues on your topic card.'],
        cueCard: {
          topic: 'Describe an ambitious personal or academic goal you strove to accomplish.',
          prompts: [
            'What the goal was and when you set it',
            'What specific hurdles or obstacles you encountered along the journey',
            'How you overcame self-doubt or difficulties',
            'And explain how achieving this goal altered your self-confidence.',
          ],
          prepTimeSeconds: 60,
          speakTimeSeconds: 120,
        },
        suggestedKeyWords: ['unwavering dedication', 'steep learning curve', 'perseverance pays off', 'monumental milestone', 'sense of accomplishment'],
      },
      {
        title: 'An Influential Mentor or Teacher Who Guided You',
        context: 'IELTS Speaking Part 2 Cue Card: 1 minute notes preparation, 2 minutes speaking.',
        questions: ['Speak continuously for 2 minutes covering all cues on your topic card.'],
        cueCard: {
          topic: 'Describe an inspirational person or educator who profoundly impacted your life.',
          prompts: [
            'Who this individual was and how you first met',
            'What particular qualities or teaching methods made them stand out',
            'What crucial advice or guidance they bestowed upon you',
            'And explain why their influence remains indelible in your memory.',
          ],
          prepTimeSeconds: 60,
          speakTimeSeconds: 120,
        },
        suggestedKeyWords: ['impart wisdom', 'transformative impact', 'role model', 'instill confidence', 'compassionate mentor'],
      },
    ],
    ielts_part3: [
      {
        title: 'Societal Pressures & The Definition of Success',
        context: 'IELTS Speaking Part 3: In-depth analytical discussion following Part 2.',
        questions: [
          'Why does modern society frequently equate personal happiness with material wealth or prestigious job titles?',
          'In what ways has social media exacerbated the fear of missing out among younger generations?',
          'Should educational institutions place greater curricular emphasis on emotional resilience rather than academic competition?',
        ],
        suggestedKeyWords: ['materialistic benchmarks', 'societal expectations', 'rat race', 'emotional quotient', 'intrinsic fulfillment'],
      },
    ],
    job_interview: [
      {
        title: 'Overcoming a High-Stakes Technical Crisis (STAR Method)',
        context: 'Behavioral Job Interview: Demonstrate structured problem-solving under pressure.',
        questions: [
          'Tell me about a time when a critical project or deadline was in serious jeopardy. What happened?',
          'What actionable steps did you take to triage the situation and align cross-functional stakeholders?',
          'What was the quantifiable business outcome, and what would you do differently in retrospect?',
        ],
        suggestedKeyWords: ['triage priorities', 'mitigate risk', 'stakeholder alignment', 'root-cause analysis', 'post-mortem insights'],
      },
    ],
    business_pitch: [
      {
        title: 'Pitching an AI-Powered Operational Efficiency SaaS',
        context: 'Executive Presentation: Convincing enterprise clients or venture capitalists.',
        questions: [
          'What is the core friction point your solution eliminates for enterprise customers?',
          'How defensible is your proprietary moat against existing incumbents and well-funded competitors?',
          'What are your customer acquisition unit economics and projected path to profitability?',
        ],
        suggestedKeyWords: ['value proposition', 'defensible moat', 'unit economics', 'recurring revenue', 'frictionless onboarding'],
      },
    ],
    strict_job_interview: [
      {
        title: 'Executive Behavioral Assessment',
        context: 'Strict Executive Interview: Answering direct behavioral inquiries.',
        questions: [
          'Could you describe a situation where you had to make an unpopular decision with incomplete data?',
          'How do you manage underperforming team members when project delivery is time-sensitive?',
        ],
        suggestedKeyWords: ['calculated risk', 'uncompromising standards', 'empathetic leadership', 'decisive action', 'foster accountability'],
      },
    ],
    full_ielts_mock: [
      {
        title: 'Complete Standard IELTS Mock Examination',
        context: 'Official exam simulation: Parts 1, 2, and 3 sequential protocol.',
        questions: [
          'Please state your full name and identify your candidate number.',
          'Let us begin with Part 1: Could you describe your current daily schedule?',
        ],
        suggestedKeyWords: ['examiner protocol', 'fluency cadence', 'lexical precision', 'grammatical range', 'clear articulation'],
      },
    ],
    app_guide: [
      {
        title: 'AeroSpeak AI Strategy & Scoring Playbook',
        context: 'Guidance and feature mastery for high-scoring speaking candidates.',
        questions: [
          'How do examiner band descriptors differentiate Band 6.5 from Band 7.5+ in Fluency?',
          'What is the recommended 15-minute daily shadowing routine for optimal pronunciation improvement?',
        ],
        suggestedKeyWords: ['band descriptors', 'shadowing technique', 'cohesive linkers', 'chunking rhythm', 'active recall'],
      },
    ],
    scoring_criteria: [
      {
        title: 'Official IELTS 4-Pillar Scoring Criteria Breakdown',
        context: 'Mastering Fluency, Lexical Resource, Grammatical Range, and Pronunciation.',
        questions: [
          'How are discourse markers used to ensure coherent transitions between complex arguments?',
          'What phonological features distinguish natural sentence stress from monotone delivery?',
        ],
        suggestedKeyWords: ['discourse markers', 'intonation contours', 'lexical flexibility', 'grammatical accuracy', 'connected speech'],
      },
    ],
    study_plan: [
      {
        title: 'Strategic 30-Day Speaking Sprint',
        context: 'Curated daily practice architecture for measurable band progression.',
        questions: [
          'How should a candidate structure their daily practice between spontaneous conversation and structured long turns?',
          'How frequently should mock tests be taken to benchmark progress without inducing burnout?',
        ],
        suggestedKeyWords: ['spaced repetition', 'deliberate practice', 'benchmark assessment', 'sustainable cadence', 'fluency milestones'],
      },
    ],
    anxiety_tips: [
      {
        title: 'Mastering Examination Nervousness & Psychological Composure',
        context: 'Techniques to overcome stage fright and maintain steady vocal delivery in high-pressure exams.',
        questions: [
          'What physiological techniques help stabilize heartbeat and prevent shallow breathing when speaking in English?',
          'How can a candidate turn performance anxiety into positive, enthusiastic communicative energy?',
        ],
        suggestedKeyWords: ['box breathing', 'cognitive reframing', 'poise under pressure', 'vocal resonance', 'communicative presence'],
      },
    ],
  },
  vi: {
    coffee_chat: [
      {
        title: 'Thói quen buổi sáng và Khởi đầu ngày mới',
        context: 'Trò chuyện đời sống thân mật cùng đồng nghiệp hoặc bạn bè quốc tế về cách bắt đầu một ngày làm việc hiệu quả.',
        questions: [
          'What does your typical morning routine look like before starting work or study? (Thói quen buổi sáng điển hình của bạn diễn ra như thế nào?)',
          'Do you believe morning habits directly influence how productive you feel throughout the day? (Bạn có nghĩ thói quen sáng ảnh hưởng lớn đến năng suất cả ngày không?)',
          'If you had an extra hour every morning with zero obligations, how would you spend it? (Nếu có thêm 1 giờ mỗi sáng không vướng bận, bạn sẽ làm gì?)',
        ],
        suggestedKeyWords: ['morning ritual (thói quen sáng)', 'peak productivity (đỉnh cao năng suất)', 'unwind (thư giãn)', 'set the tone (tạo nhịp điệu)', 'deliberate practice (rèn luyện có chủ đích)'],
      },
      {
        title: 'Sở thích và Đam mê ngoài giờ làm việc',
        context: 'Trò chuyện cởi mở về các hoạt động giải trí, đam mê nghệ thuật và lối sống lành mạnh.',
        questions: [
          'What is a leisure activity or hobby you have pursued for years, and why do you love it? (Sở thích nào bạn đã duy trì nhiều năm và vì sao bạn đam mê nó?)',
          'How has this pastime influenced the way you think or solve problems in daily life? (Sở thích đó đã tác động thế nào đến tư duy của bạn?)',
          'Is there a new skill or creative craft you would love to master in the next twelve months? (Kỹ năng mới nào bạn muốn thành thạo trong 12 tháng tới?)',
        ],
        suggestedKeyWords: ['creative outlet (lối thoát sáng tạo)', 'cultivate passion (nuôi dưỡng đam mê)', 'decompress (xả stress)', 'intrinsic motivation (động lực nội tại)'],
      },
    ],
    travel_survival: [
      {
        title: 'Xử lý tình huống quá cảnh sân bay gấp rút',
        context: 'Bạn vừa hạ cánh tại sân bay quốc tế và chỉ có 45 phút để bắt chuyến bay nối tiếp đi Tokyo.',
        questions: [
          'Excuse me, I have a tight connection to Tokyo departing in 40 minutes. Which terminal does flight NH802 depart from? (Xin hỏi cổng khởi hành chuyến bay nối tiếp ở đâu?)',
          'Do I need to collect my checked luggage and re-check it, or is it automatically transferred? (Hành lý ký gửi có được chuyển thẳng không?)',
          'Where is the fastest security express lane for transit passengers? (Lối đi an ninh ưu tiên cho khách quá cảnh ở đâu?)',
        ],
        suggestedKeyWords: ['connecting flight (chuyến bay nối chuyến)', 'transit corridor (hành lang quá cảnh)', 'baggage carousel (băng chuyền hành lý)', 'boarding gate (cửa lên máy bay)'],
      },
      {
        title: 'Giải quyết nhầm lẫn đặt phòng khách sạn',
        context: 'Bạn đến khách sạn tại London lúc nửa đêm nhưng lễ tân báo chưa tìm thấy mã xác nhận đặt phòng.',
        questions: [
          'Good evening, I have a guaranteed reservation under my name for three nights, but the system shows no record. (Tôi có đặt phòng bảo đảm 3 đêm nhưng chưa hiện trên hệ thống.)',
          'Here is my digital booking confirmation code and payment voucher. Could you double-check under alternative spelling? (Đây là mã đặt phòng và biên lai thanh toán, vui lòng kiểm tra lại.)',
          'If this room tier is currently unavailable, what complimentary upgrade or alternative room can you provide for tonight? (Khách sạn có thể nâng hạng phòng miễn phí nào cho tối nay?)',
        ],
        suggestedKeyWords: ['booking confirmation (xác nhận đặt phòng)', 'complimentary upgrade (nâng hạng miễn phí)', 'guaranteed reservation (đặt phòng bảo đảm)', 'front desk manager (quản lý tiền sảnh)'],
      },
    ],
    opinion_builder: [
      {
        title: 'Tác động của Trí tuệ nhân tạo đối với Sự sáng tạo',
        context: 'Thử thách 60 giây: Trình bày quan điểm liên tục không ngắt quãng về vai trò của AI trong công việc sáng tạo.',
        questions: [
          'Will generative AI diminish human creative originality or amplify human potential? (AI sẽ làm thui chột tính nguyên bản hay mở rộng tiềm năng con người?)',
          'How can professionals best future-proof their careers against automated workplace disruption? (Làm thế nào để phát triển sự nghiệp bền vững trước làn sóng tự động hóa?)',
        ],
        suggestedKeyWords: ['generative revolution (cách mạng tạo sinh)', 'human ingenuity (sự tài hoa của con người)', 'symbiotic collaboration (hợp tác cộng sinh)', 'critical judgment (tư duy phản biện)'],
      },
    ],
    ielts_part1: [
      {
        title: 'Quê hương và Sự phát triển đô thị',
        context: 'IELTS Speaking Phần 1: Phỏng vấn mở đầu về nơi bạn sinh ra và lớn lên.',
        questions: [
          'Where did you spend most of your childhood? (Bạn trải qua tuổi thơ ở đâu?)',
          'What noticeable changes has your hometown experienced over the past few years? (Quê hương bạn đã thay đổi ra sao trong những năm qua?)',
          'Do you think you will continue living in your current city in the long run? (Bạn có dự định gắn bó lâu dài tại thành phố hiện tại không?)',
        ],
        suggestedKeyWords: ['rapid urbanization (đô thị hóa nhanh)', 'bustling metropolitan (đô thị sầm uất)', 'nostalgic landmarks (địa danh kỷ niệm)', 'infrastructure overhaul (nâng cấp hạ tầng)'],
      },
    ],
    ielts_part2: [
      {
        title: 'Một mục tiêu lớn bạn đã nỗ lực chinh phục',
        context: 'IELTS Speaking Phần 2: Thẻ chủ đề với 1 phút ghi nháp và 2 phút nói liên tục.',
        questions: ['Nói liên tục trong 2 phút bao quát toàn bộ gợi ý trên thẻ chủ đề.'],
        cueCard: {
          topic: 'Describe an ambitious personal or academic goal you strove to accomplish.',
          prompts: [
            'Mục tiêu đó là gì và bạn đặt ra khi nào',
            'Những rào cản và khó khăn lớn nhất bạn đã đối mặt',
            'Cách bạn vượt qua sự hoài nghi bản thân để kiên trì',
            'Và giải thích thành tựu này đã thay đổi sự tự tin của bạn như thế nào.',
          ],
          prepTimeSeconds: 60,
          speakTimeSeconds: 120,
        },
        suggestedKeyWords: ['unwavering dedication (sự cống hiến bền bỉ)', 'steep learning curve (quá trình học hỏi gian nan)', 'monumental milestone (cột mốc vĩ đại)', 'sense of accomplishment (cảm giác thành tựu)'],
      },
    ],
    ielts_part3: [
      {
        title: 'Áp lực xã hội và Định nghĩa về sự thành công',
        context: 'IELTS Speaking Phần 3: Thảo luận chuyên sâu mang tính phân tích đa chiều.',
        questions: [
          'Why does modern society frequently equate personal happiness with material wealth? (Vì sao xã hội thường đồng nhất hạnh phúc với sự giàu có?)',
          'In what ways has social media exacerbated the fear of missing out among younger generations? (Mạng xã hội đã làm gia tăng hội chứng sợ bỏ lỡ thế nào?)',
          'Should schools focus more on emotional resilience than mere academic test scores? (Trường học có nên dạy quản trị cảm xúc nhiều hơn thi cử điểm số?)',
        ],
        suggestedKeyWords: ['materialistic benchmarks (thước đo vật chất)', 'societal expectations (kỳ vọng xã hội)', 'rat race (vòng luẩn quẩn danh vọng)', 'intrinsic fulfillment (sự viên mãn nội tại)'],
      },
    ],
    job_interview: [
      {
        title: 'Xử lý khủng hoảng dự án áp lực cao (Mô hình STAR)',
        context: 'Phỏng vấn xin việc chuyên nghiệp: Thể hiện tư duy giải quyết vấn đề theo cấu trúc STAR.',
        questions: [
          'Tell me about a time when a critical project or deadline was in serious jeopardy. (Hãy kể về một lần dự án quan trọng đứng trước nguy cơ đổ vỡ.)',
          'What actionable steps did you take to triage the situation and align team members? (Bạn đã làm gì để sắp xếp thứ tự ưu tiên và gắn kết đồng đội?)',
          'What was the quantifiable business outcome of your actions? (Kết quả kinh doanh cụ thể đạt được là gì?)',
        ],
        suggestedKeyWords: ['triage priorities (xử lý ưu tiên khẩn cấp)', 'mitigate risk (giảm thiểu rủi ro)', 'stakeholder alignment (thống nhất các bên liên quan)', 'root-cause analysis (phân tích nguyên nhân gốc rễ)'],
      },
    ],
    business_pitch: [
      {
        title: 'Thuyết trình giải pháp chuyển đổi số cho doanh nghiệp',
        context: 'Họp ban điều hành / Pitching gọi vốn cùng nhà đầu tư mạo hiểm.',
        questions: [
          'What is the core friction point your solution eliminates for enterprise customers? (Điểm nghẽn cốt lõi mà sản phẩm của bạn giải quyết là gì?)',
          'How defensible is your proprietary moat against competitors? (Lợi thế cạnh tranh độc quyền của bạn vững chắc ra sao?)',
          'What are your customer acquisition economics and path to profitability? (Chi phí thu hút khách hàng và lộ trình sinh lời thế nào?)',
        ],
        suggestedKeyWords: ['value proposition (đề xuất giá trị)', 'defensible moat (hào thành phòng thủ)', 'unit economics (kinh tế đơn vị)', 'recurring revenue (doanh thu định kỳ)'],
      },
    ],
    strict_job_interview: [
      {
        title: 'Phỏng vấn quản lý cấp cao',
        context: 'Mô phỏng phỏng vấn lãnh đạo nghiêm ngặt.',
        questions: [
          'How do you handle underperforming team members under strict project deadlines? (Bạn xử lý nhân sự làm việc kém hiệu quả trong giai đoạn nước rút thế nào?)',
        ],
        suggestedKeyWords: ['decisive action (hành động quyết đoán)', 'foster accountability (đề cao trách nhiệm)', 'empathetic leadership (lãnh đạo thấu cảm)'],
      },
    ],
    full_ielts_mock: [
      {
        title: 'Kỳ thi thử IELTS Speaking toàn diện chuẩn khảo thí',
        context: 'Mô phỏng phòng thi chuẩn quốc tế với 3 phần liên tục.',
        questions: [
          'Good morning. Could you please state your full name and show your identification? (Chào buổi sáng, vui lòng đọc họ tên và xuất trình giấy tờ.)',
          'Let us begin with Part 1: How do you spend your leisure time? (Hãy bắt đầu Phần 1: Bạn dành thời gian rảnh thế nào?)',
        ],
        suggestedKeyWords: ['examiner protocol (quy chuẩn giám khảo)', 'fluency cadence (nhịp điệu lưu loát)', 'lexical precision (chuẩn xác từ vựng)', 'connected speech (nối âm tự nhiên)'],
      },
    ],
    app_guide: [
      {
        title: 'Cẩm nang chiến lược đạt điểm cao IELTS Speaking',
        context: 'Chiến thuật làm chủ 4 tiêu chí chấm điểm và lộ trình luyện tập hàng ngày.',
        questions: [
          'Làm thế nào để phân biệt sự khác nhau giữa Band 6.5 và Band 7.5+ ở tiêu chí Độ lưu loát?',
          'Phương pháp luyện nghe nhại (Shadowing) 15 phút mỗi ngày mang lại hiệu quả ra sao?',
        ],
        suggestedKeyWords: ['band descriptors (bảng mô tả điểm)', 'shadowing technique (kỹ thuật nói nhại)', 'cohesive linkers (từ nối mạch lạc)', 'active recall (chủ động gợi nhớ)'],
      },
    ],
    scoring_criteria: [
      {
        title: 'Chi tiết 4 tiêu chí chấm thi quốc tế',
        context: 'Lưu loát, Từ vựng, Ngữ pháp và Phát âm.',
        questions: [
          'Từ nối tự nhiên (discourse markers) được áp dụng thế nào để tránh ngập ngừng?',
        ],
        suggestedKeyWords: ['discourse markers (từ nối tự nhiên)', 'connected speech (nối âm)', 'lexical flexibility (linh hoạt từ vựng)'],
      },
    ],
    study_plan: [
      {
        title: 'Lộ trình bứt phá phản xạ nói 30 ngày',
        context: 'Phương pháp phân bổ thời gian hàng ngày cho người bận rộn.',
        questions: [
          'Nên phân chia thời gian luyện tập giữa hội thoại tự nhiên và bài nói dài 2 phút như thế nào?',
        ],
        suggestedKeyWords: ['spaced repetition (lặp lại ngắt quãng)', 'deliberate practice (luyện tập chủ đích)', 'fluency milestones (cột mốc lưu loát)'],
      },
    ],
    anxiety_tips: [
      {
        title: 'Kỹ thuật làm chủ tâm lý và vượt qua sự lo âu khi nói tiếng Anh',
        context: 'Phương pháp điều hòa hơi thở và phá vỡ rào cản sợ nói sai.',
        questions: [
          'Phương pháp hít thở sâu nào giúp ổn định nhịp tim khi bước vào phòng thi?',
          'Làm thế nào để chuyển hóa sự hồi hộp thành năng lượng giao tiếp tự tin?',
        ],
        suggestedKeyWords: ['box breathing (kỹ thuật thở 4 thì)', 'cognitive reframing (tái định hình nhận thức)', 'poise under pressure (bình tĩnh trước áp lực)'],
      },
    ],
  },
};

export function getInstantCuratedTopic(
  mode: string,
  subMode: string,
  language: 'en' | 'vi' = 'en'
): DynamicTopic {
  const langKey = language === 'vi' ? 'vi' : 'en';
  const subModeKey = subMode as SubMode;
  const list = CURATED_TOPICS[langKey][subModeKey] || CURATED_TOPICS[langKey]['coffee_chat'];
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex] || list[0];
}
