import { AppLanguage } from './types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  coachTitle: string;
  targetGoal: string;
  targetOptions: { [key: string]: string };
  voiceSettings: string;
  voiceLabel: string;
  autoPlayAudio: string;
  languageToggle: string;
  modelLabel: string;
  modelOptions: {
    flashLatest: string;
    flash38: string;
    flashLite31: string;
  };
  close: string;
  modes: {
    mode1_daily: {
      title: string;
      submodes: {
        coffee_chat: string;
        travel_survival: string;
        opinion_builder: string;
      };
    };
    mode2_pro: {
      title: string;
      submodes: {
        ielts_part1: string;
        ielts_part2: string;
        ielts_part3: string;
        job_interview: string;
        business_pitch: string;
      };
    };
    mode3_mock: {
      title: string;
    };
    mode4_guide: {
      title: string;
    };
  };
  topicCard: {
    loading: string;
    changeTopic: string;
    scenarioContext: string;
    questionsPrompt: string;
    cueCardPrepTitle: string;
    cueCardSpeakTitle: string;
    cueCardPrepDesc: string;
    cueCardSpeakDesc: string;
    opinionBuilderTitle: string;
    opinionBuilderDesc: string;
    cueCardTopic: string;
    youShouldSay: string;
    suggestedCollocations: string;
  };
  chat: {
    initialGreeting: string;
    starterPromptTitle: string;
    starters: {
      dailyChat: { title: string; desc: string; prompt: string };
      ieltsPractice: { title: string; desc: string; prompt: string };
      jobInterview: { title: string; desc: string; prompt: string };
      guideHelp: { title: string; desc: string; prompt: string };
    };
    evalTurnBtn: string;
    listenPronunciation: string;
    stopAudio: string;
    preparingAudio: string;
    thinking: string;
    connectionError: string;
  };
  voiceInput: {
    micActive: string;
    micEncourage: string;
    listeningInterim: string;
    listenRecordedAudio: string;
    placeholderActive: string;
    placeholderIdle: string;
    evaluateNow: string;
    send: string;
    shortcutHint: string;
    micPermissionError: string;
    micNotSupported: string;
  };
  evaluation: {
    modalTitle: string;
    modalSubtitle: string;
    estimatedBand: string;
    overallComment: string;
    yourSpeech: string;
    fluencyTitle: string;
    rhythmAndPauses: string;
    lexicalTitle: string;
    originalWord: string;
    upgradeWord: string;
    grammarTitle: string;
    needsImprovement: string;
    nativeAlternative: string;
    pronunciationTitle: string;
    stressAndIntonation: string;
    connectedSpeech: string;
    wordsToPractice: string;
    modelAnswerTitle: string;
    modelAnswerSubtitle: string;
    listenModelAnswer: string;
    playingAudio: string;
    mentorTakeawayTitle: string;
    copyReport: string;
    copied: string;
    continuePractice: string;
  };
  mockTest: {
    title: string;
    subtitle: string;
    introTitle: string;
    introSteps: string[];
    introNotice: string;
    startTestBtn: string;
    part1Label: string;
    part1Duration: string;
    examinerPromptLabel: string;
    yourAnswerLabel: string;
    recordBtn: string;
    recordingStopBtn: string;
    answerPlaceholder: string;
    nextQuestionBtn: string;
    part2PrepLabel: string;
    part2PrepRemaining: string;
    part2NotesLabel: string;
    part2NotesPlaceholder: string;
    skipPrepBtn: string;
    part2SpeakLabel: string;
    part2SpeakTime: string;
    finishPart2Btn: string;
    part3Label: string;
    part3Sublabel: string;
    finishAndReportBtn: string;
    evaluatingTitle: string;
    evaluatingDesc: string;
    testFinishedSummary: string;
  };
  guide: {
    title: string;
    subtitle: string;
    tabs: {
      features: string;
      rubric: string;
      plan: string;
      anxiety: string;
      apiKey: string;
    };
    apiKeyGuide: {
      title: string;
      intro: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      securityNote: string;
    };
    askMoreBtn: string;
    closeBtn: string;
  };
}

export const translations: Record<AppLanguage, Translations> = {
  en: {
    appName: 'AeroSpeak AI',
    appSubtitle: 'Professional English Speaking Examiner & Senior IELTS Coach',
    coachTitle: 'Senior IELTS Coach',
    targetGoal: 'Target:',
    targetOptions: {
      '6.0': 'Band 6.0 (B2)',
      '6.5': 'Band 6.5 (B2+)',
      '7.0': 'Band 7.0 (C1)',
      '7.5': 'Band 7.5 (C1+)',
      '8.0+': 'Band 8.0+ (C2)',
      Fluency: 'Conversational Fluency',
    },
    voiceSettings: 'Settings',
    voiceLabel: 'Examiner Voice (Gemini TTS):',
    autoPlayAudio: 'Auto-play Voice Audio',
    languageToggle: 'Language',
    modelLabel: 'Gemini AI Model (3.5+ / Latest Auto-update):',
    modelOptions: {
      flashLatest: 'gemini-flash-latest (Auto-track Google Latest Model)',
      flash38: 'gemini-3.8-flash (Flagship Ultra-fast & High Reasoning)',
      flashLite31: 'gemini-3.1-flash-lite (Cost-efficient Fast Model)',
    },
    close: 'Close',
    modes: {
      mode1_daily: {
        title: 'Daily Fluency',
        submodes: {
          coffee_chat: 'Coffee Chat',
          travel_survival: 'Travel & Socializing',
          opinion_builder: '1-Min Talk Challenge',
        },
      },
      mode2_pro: {
        title: 'Exam & Interview',
        submodes: {
          ielts_part1: 'IELTS Part 1',
          ielts_part2: 'IELTS Part 2 (Cue Card)',
          ielts_part3: 'IELTS Part 3 (Discussion)',
          job_interview: 'Job Interview',
          business_pitch: 'Business Pitch',
        },
      },
      mode3_mock: {
        title: 'Mock Test',
      },
      mode4_guide: {
        title: 'Guide & Tips',
      },
    },
    topicCard: {
      loading: 'Generating fresh speaking topic...',
      changeTopic: 'New Topic',
      scenarioContext: 'Context & Setting:',
      questionsPrompt: 'Practice Questions (Select to start speaking):',
      cueCardPrepTitle: '1-Minute Preparation Time',
      cueCardSpeakTitle: '2-Minute Speaking Time',
      cueCardPrepDesc: 'Jot down key points and ideas before speaking',
      cueCardSpeakDesc: 'Speak continuously to build natural fluency and pace',
      opinionBuilderTitle: '60-Second Flow Challenge',
      opinionBuilderDesc: 'Speak continuously without pauses or translating in your head',
      cueCardTopic: 'Topic:',
      youShouldSay: 'You should say:',
      suggestedCollocations: 'Recommended Collocations & Vocabulary:',
    },
    chat: {
      initialGreeting: `Hello! Welcome to AeroSpeak AI.

I am your personal English Speaking Coach and Senior IELTS Examiner. I am here to help you elevate your speaking fluency, boost confidence, and prepare for international exams.

You can use AeroSpeak AI for:
• Daily Fluency & Coffee Chats: Casual conversations to practice everyday vocabulary.
• Practical Travel & Socializing: Roleplay real-world situations like airports, restaurants, and hotels.
• Professional Job Interviews: Practice behavioral STAR questions and executive discussions.
• Formal IELTS Speaking Tests: In-depth Part 1, 2, and 3 practice with official evaluation reports.

What would you like to practice today?`,
      starterPromptTitle: 'Select an area to start practicing immediately:',
      starters: {
        dailyChat: {
          title: 'Daily Chat about Hobbies',
          desc: 'Casual, relaxing conversation about everyday interests',
          prompt: "Let's have a quick daily chat about hobbies and lifestyle.",
        },
        ieltsPractice: {
          title: 'Practice IELTS Speaking',
          desc: 'Practice Part 1, 2, or 3 with examiner feedback',
          prompt: 'I want to practice an IELTS Speaking topic today.',
        },
        jobInterview: {
          title: 'Simulate a Job Interview',
          desc: 'Practice answering behavioral and professional questions',
          prompt: 'Please simulate a job interview for a professional role.',
        },
        guideHelp: {
          title: 'Examiner Guide & Scoring',
          desc: 'Understand scoring criteria and overcoming nervousness',
          prompt: 'Guide me on how to improve my speaking score and overcome anxiety.',
        },
      },
      evalTurnBtn: 'Evaluate This Turn',
      listenPronunciation: 'Listen to Voice',
      stopAudio: 'Stop Audio',
      preparingAudio: 'Loading audio...',
      thinking: 'AeroSpeak AI is analyzing your response...',
      connectionError: 'Network connection interrupted. Please try again.',
    },
    voiceInput: {
      micActive: 'Listening and recording your speech...',
      micEncourage: 'Speak naturally in English...',
      listeningInterim: 'Detecting speech:',
      listenRecordedAudio: 'Listen to your recording:',
      placeholderActive: 'Listening to you speak... (you can also edit here)',
      placeholderIdle: 'Click the microphone to speak, or type your answer...',
      evaluateNow: 'Evaluate Now',
      send: 'Send',
      shortcutHint: 'Press Enter to send. Supports high-accuracy speech recognition.',
      micPermissionError: 'Microphone permission denied. Please allow microphone access in your browser.',
      micNotSupported: 'Speech recognition is not supported in this browser. You can type your answers.',
    },
    evaluation: {
      modalTitle: 'Speaking Performance Report',
      modalSubtitle: 'International Assessment Standard (IELTS / CEFR) • AeroSpeak AI',
      estimatedBand: 'Estimated Score / Fluency Level',
      overallComment: 'Overall Examiner Comment:',
      yourSpeech: 'Your Original Speech:',
      fluencyTitle: 'Fluency & Coherence',
      rhythmAndPauses: 'Rhythm & Pauses:',
      lexicalTitle: 'Lexical Resource (Vocabulary)',
      originalWord: 'Word used:',
      upgradeWord: 'Natural upgrade:',
      grammarTitle: 'Grammar Accuracy & Range',
      needsImprovement: 'Original sentence needing improvement:',
      nativeAlternative: 'Natural native phrasing:',
      pronunciationTitle: 'Pronunciation & Intonation',
      stressAndIntonation: 'Word Stress & Sentence Intonation:',
      connectedSpeech: 'Connected Speech & Chunking:',
      wordsToPractice: 'Words to practice:',
      modelAnswerTitle: 'High-Band Model Answers',
      modelAnswerSubtitle: 'Band 8.0+ Native Reference',
      listenModelAnswer: 'Listen to Model Answer',
      playingAudio: 'Playing audio...',
      mentorTakeawayTitle: 'Examiner Takeaway & Recommendation',
      copyReport: 'Copy Report',
      copied: 'Copied!',
      continuePractice: 'Continue Practice ➔',
    },
    mockTest: {
      title: 'IELTS Speaking Strict Mock Test',
      subtitle: 'Real-time examination simulation • Formal, objective examiner protocol',
      introTitle: 'Standard International Test Format:',
      introSteps: [
        'Part 1 (4-5 minutes): Introduction and questions on familiar personal topics.',
        'Part 2 (3-4 minutes): Cue card with 1 minute of notes preparation and 2 minutes of continuous speaking.',
        'Part 3 (4-5 minutes): Analytical discussion and deeper abstract questions.',
        'Comprehensive Report: Detailed breakdown across all 4 assessment criteria upon test completion.',
      ],
      introNotice: 'The examiner will remain formal and uninterrupted throughout the test, just like an authentic IELTS test center.',
      startTestBtn: 'Start Official Mock Test',
      part1Label: 'PART 1: INTRODUCTION & INTERVIEW',
      part1Duration: '~4-5 minutes',
      examinerPromptLabel: 'IELTS Examiner:',
      yourAnswerLabel: 'Your response:',
      recordBtn: 'Click to Speak',
      recordingStopBtn: 'Recording (Click to stop)',
      answerPlaceholder: 'Speak via microphone or type your response here...',
      nextQuestionBtn: 'Next Question',
      part2PrepLabel: 'PART 2: TOPIC CUE CARD (1-MINUTE PREPARATION)',
      part2PrepRemaining: 'Remaining:',
      part2NotesLabel: 'Scratchpad notes:',
      part2NotesPlaceholder: 'Jot down quick bullet points and vocabulary...',
      skipPrepBtn: 'Start Speaking Now ➔',
      part2SpeakLabel: 'PART 2: 2-MINUTE LONG TURN',
      part2SpeakTime: 'Time:',
      finishPart2Btn: 'Finish Part 2 & Proceed to Part 3 ➔',
      part3Label: 'PART 3: TWO-WAY DISCUSSION',
      part3Sublabel: 'Assessing abstract reasoning and complex grammatical structures',
      finishAndReportBtn: 'Submit Test & Generate Report ➔',
      evaluatingTitle: 'Examiner Board is evaluating your complete test...',
      evaluatingDesc: 'Assessing Fluency & Coherence, Lexical Resource, Grammatical Accuracy, and Pronunciation against official IELTS standards.',
      testFinishedSummary: 'Congratulations on completing your mock test! Your detailed performance report is ready below.',
    },
    guide: {
      title: 'AeroSpeak Guide & Strategy Playbook',
      subtitle: 'Examiner Scoring Rubric, Daily Routines & Fluency Mindset',
      tabs: {
        features: 'Feature Guide',
        rubric: 'IELTS 4-Pillar Rubric',
        plan: '15-Min Daily Routine',
        anxiety: 'Overcoming Speaking Anxiety',
        apiKey: 'Personal API Key Guide',
      },
      apiKeyGuide: {
        title: 'How to Get & Configure Your Personal Gemini API Key',
        intro: 'AeroSpeak AI operates with a high-security server proxy architecture (/api/*). Your API key is managed securely in the backend without exposing sensitive tokens to client web browsers.',
        step1Title: 'Step 1: Get your free Gemini API Key',
        step1Desc: 'Visit Google AI Studio (aistudio.google.com/app/apikey), sign in with your Google account, and click "Create API Key" to generate a free personal key in 30 seconds.',
        step2Title: 'Step 2: Add to AI Studio Secrets',
        step2Desc: 'In the AI Studio environment, navigate to Settings > Secrets, add a secret variable named GEMINI_API_KEY, and paste your key value.',
        step3Title: 'Step 3: Enjoy Dedicated Quota',
        step3Desc: 'The backend proxy automatically routes all speaking sessions, dynamic topic generation, and examiner evaluation calls through your personal quota with zero sharing bottlenecks.',
        securityNote: 'Security Notice: Never type your private API key into client-side web forms or public browsers. Managing keys via server secrets protects your Google Cloud billing and account safety.',
      },
      askMoreBtn: 'Ask AeroSpeak for advice',
      closeBtn: 'Close Guide',
    },
  },
  vi: {
    appName: 'AeroSpeak AI',
    appSubtitle: 'Chuyên gia khảo thí và Giảng viên luyện nói IELTS chuyên sâu',
    coachTitle: 'Giảng viên IELTS',
    targetGoal: 'Mục tiêu:',
    targetOptions: {
      '6.0': 'Band 6.0 (B2)',
      '6.5': 'Band 6.5 (B2+)',
      '7.0': 'Band 7.0 (C1)',
      '7.5': 'Band 7.5 (C1+)',
      '8.0+': 'Band 8.0+ (C2)',
      Fluency: 'Giao tiếp trôi chảy',
    },
    voiceSettings: 'Cài đặt',
    voiceLabel: 'Giọng đọc giám khảo (Gemini TTS):',
    autoPlayAudio: 'Tự động phát giọng đọc',
    languageToggle: 'Ngôn ngữ',
    modelLabel: 'Mô hình Gemini AI (Phiên bản 3.5+ & Tự động cập nhật):',
    modelOptions: {
      flashLatest: 'gemini-flash-latest (Tự động liên kết model mới nhất của Google)',
      flash38: 'gemini-3.8-flash (Model cao cấp tốc độ cao & tư duy sâu)',
      flashLite31: 'gemini-3.1-flash-lite (Model tối ưu phản hồi nhanh)',
    },
    close: 'Đóng',
    modes: {
      mode1_daily: {
        title: 'Luyện hàng ngày',
        submodes: {
          coffee_chat: 'Trò chuyện đời sống',
          travel_survival: 'Giao tiếp & Du lịch',
          opinion_builder: 'Thử thách nói 1 phút',
        },
      },
      mode2_pro: {
        title: 'Luyện thi & Phỏng vấn',
        submodes: {
          ielts_part1: 'IELTS Phần 1',
          ielts_part2: 'IELTS Phần 2 (Thẻ chủ đề)',
          ielts_part3: 'IELTS Phần 3 (Thảo luận)',
          job_interview: 'Phỏng vấn xin việc',
          business_pitch: 'Thuyết trình kinh doanh',
        },
      },
      mode3_mock: {
        title: 'Thi thử như thật',
      },
      mode4_guide: {
        title: 'Cẩm nang hướng dẫn',
      },
    },
    topicCard: {
      loading: 'Đang chuẩn bị chủ đề luyện nói mới...',
      changeTopic: 'Đổi chủ đề',
      scenarioContext: 'Tình huống và bối cảnh:',
      questionsPrompt: 'Gợi ý câu hỏi luyện tập (Chọn để bắt đầu trả lời):',
      cueCardPrepTitle: '1 phút chuẩn bị dàn ý',
      cueCardSpeakTitle: '2 phút trình bày liên tục',
      cueCardPrepDesc: 'Ghi chú các từ khóa và ý chính trước khi nói',
      cueCardSpeakDesc: 'Nói liên tục để xây dựng độ trôi chảy và nhịp điệu tự nhiên',
      opinionBuilderTitle: 'Thử thách phản xạ 60 giây',
      opinionBuilderDesc: 'Nói liên tục, không dịch nhẩm trong đầu để phá vỡ rào cản phản xạ',
      cueCardTopic: 'Chủ đề:',
      youShouldSay: 'Nội dung cần trình bày:',
      suggestedCollocations: 'Cụm từ và từ vựng gợi ý:',
    },
    chat: {
      initialGreeting: `Xin chào bạn! Chào mừng bạn đến với AeroSpeak AI.

Tôi là Cố vấn luyện nói và Giám khảo khảo thí tiếng Anh của bạn. Tôi sẵn sàng đồng hành giúp bạn nâng cao độ lưu loát, củng cố sự tự tin và chuẩn bị tốt nhất cho các kỳ thi chuẩn hóa quốc tế.

Bạn có thể sử dụng AeroSpeak AI cho các mục tiêu:
• Luyện phản xạ hàng ngày: Trò chuyện tự nhiên về sở thích và đời sống.
• Xử lý tình huống du lịch và giao tiếp: Đóng vai thực tế tại sân bay, nhà hàng và khách sạn.
• Phỏng vấn xin việc bằng tiếng Anh: Luyện trả lời câu hỏi tình huống theo cấu trúc chuyên nghiệp.
• Thi thử IELTS Speaking chuẩn: Luyện chuyên sâu Phần 1, 2, 3 với báo cáo chấm thi chi tiết.

Bạn muốn bắt đầu luyện tập phần nào hôm nay?`,
      starterPromptTitle: 'Chọn một chủ đề để bắt đầu ngay:',
      starters: {
        dailyChat: {
          title: 'Trò chuyện về sở thích',
          desc: 'Giao tiếp thoải mái, tự nhiên về thói quen và đời sống',
          prompt: 'Hãy trò chuyện với tôi về sở thích và lối sống hàng ngày.',
        },
        ieltsPractice: {
          title: 'Luyện thi IELTS Speaking',
          desc: 'Luyện từng phần với nhận xét chuẩn giám khảo',
          prompt: 'Tôi muốn luyện một chủ đề IELTS Speaking hôm nay.',
        },
        jobInterview: {
          title: 'Mô phỏng phỏng vấn xin việc',
          desc: 'Thực hành trả lời câu hỏi phỏng vấn nghề nghiệp',
          prompt: 'Hãy mô phỏng một buổi phỏng vấn xin việc bằng tiếng Anh.',
        },
        guideHelp: {
          title: 'Hướng dẫn tiêu chí & Mẹo tâm lý',
          desc: 'Tìm hiểu tiêu chí chấm điểm và cách giảm lo âu',
          prompt: 'Hãy hướng dẫn tôi cách nâng cao điểm số và khắc phục sự hồi hộp khi nói.',
        },
      },
      evalTurnBtn: 'Chấm điểm lượt nói này',
      listenPronunciation: 'Nghe phát âm',
      stopAudio: 'Dừng nghe',
      preparingAudio: 'Đang tải âm thanh...',
      thinking: 'AeroSpeak AI đang phân tích bài nói của bạn...',
      connectionError: 'Kết nối mạng bị gián đoạn. Vui lòng thử lại.',
    },
    voiceInput: {
      micActive: 'Đang lắng nghe và ghi âm...',
      micEncourage: 'Hãy nói tự nhiên bằng tiếng Anh...',
      listeningInterim: 'Đang nhận diện:',
      listenRecordedAudio: 'Nghe lại bản ghi của bạn:',
      placeholderActive: 'Đang nhận diện giọng nói... (bạn có thể chỉnh sửa)',
      placeholderIdle: 'Nhấn micro để nói tiếng Anh, hoặc nhập câu trả lời...',
      evaluateNow: 'Chấm điểm ngay',
      send: 'Gửi',
      shortcutHint: 'Nhấn Enter để gửi. Hỗ trợ nhận diện giọng nói độ chính xác cao.',
      micPermissionError: 'Quyền truy cập micro đã bị từ chối. Vui lòng cấp quyền micro trong trình duyệt.',
      micNotSupported: 'Trình duyệt chưa hỗ trợ nhận diện giọng nói trực tiếp. Bạn có thể gõ phím.',
    },
    evaluation: {
      modalTitle: 'Báo cáo đánh giá năng lực nói',
      modalSubtitle: 'Tiêu chuẩn khảo thí quốc tế (IELTS / CEFR) • AeroSpeak AI',
      estimatedBand: 'Điểm số ước tính / Mức độ lưu loát',
      overallComment: 'Nhận xét tổng quan của giám khảo:',
      yourSpeech: 'Bài nói gốc của bạn:',
      fluencyTitle: 'Độ lưu loát và Mạch lạc',
      rhythmAndPauses: 'Nhịp điệu và ngắt nghỉ:',
      lexicalTitle: 'Vốn từ vựng',
      originalWord: 'Từ bạn đã dùng:',
      upgradeWord: 'Gợi ý nâng cấp tự nhiên:',
      grammarTitle: 'Độ chính xác và Đa dạng ngữ pháp',
      needsImprovement: 'Câu gốc cần cải thiện:',
      nativeAlternative: 'Cách diễn đạt chuẩn bản ngữ:',
      pronunciationTitle: 'Phát âm và Ngữ điệu',
      stressAndIntonation: 'Trọng âm từ và Ngữ điệu câu:',
      connectedSpeech: 'Nối âm và Ngắt cụm nghĩa:',
      wordsToPractice: 'Các từ cần luyện lại:',
      modelAnswerTitle: 'Câu trả lời mẫu tham khảo',
      modelAnswerSubtitle: 'Chuẩn điểm cao bản ngữ',
      listenModelAnswer: 'Nghe đọc câu trả lời mẫu',
      playingAudio: 'Đang phát âm thanh...',
      mentorTakeawayTitle: 'Lời khuyên then chốt từ Giám khảo',
      copyReport: 'Sao chép báo cáo',
      copied: 'Đã sao chép!',
      continuePractice: 'Tiếp tục luyện tập ➔',
    },
    mockTest: {
      title: 'Thi thử IELTS Speaking chuẩn khảo thí',
      subtitle: 'Mô phỏng kỳ thi thời gian thực • Giám khảo giữ tác phong trang trọng và khách quan',
      introTitle: 'Cấu trúc bài thi tiêu chuẩn quốc tế:',
      introSteps: [
        'Phần 1 (4-5 phút): Phỏng vấn giới thiệu bản thân và các chủ đề quen thuộc.',
        'Phần 2 (3-4 phút): Thẻ chủ đề với 1 phút chuẩn bị và 2 phút nói liên tục.',
        'Phần 3 (4-5 phút): Thảo luận phân tích các câu hỏi trừu tượng và chuyên sâu.',
        'Báo cáo chấm thi: Phân tích toàn diện 4 tiêu chí sau khi hoàn tất buổi thi.',
      ],
      introNotice: 'Giám khảo sẽ không ngắt lời hay sửa lỗi trong lúc thi nhằm bảo đảm tính xác thực như phòng thi thực tế.',
      startTestBtn: 'Bắt đầu bài thi thử',
      part1Label: 'PHẦN 1: GIỚI THIỆU VÀ PHỎNG VẤN',
      part1Duration: '~4-5 phút',
      examinerPromptLabel: 'Giám khảo IELTS:',
      yourAnswerLabel: 'Câu trả lời của bạn:',
      recordBtn: 'Nhấn để nói',
      recordingStopBtn: 'Đang ghi âm (Nhấn để dừng)',
      answerPlaceholder: 'Nói qua micro hoặc gõ câu trả lời của bạn tại đây...',
      nextQuestionBtn: 'Câu hỏi tiếp theo',
      part2PrepLabel: 'PHẦN 2: THẺ CHỦ ĐỀ (1 PHÚT CHUẨN BỊ)',
      part2PrepRemaining: 'Thời gian còn lại:',
      part2NotesLabel: 'Ghi chú nháp:',
      part2NotesPlaceholder: 'Ghi nhanh các ý chính và từ khóa...',
      skipPrepBtn: 'Bắt đầu nói ngay ➔',
      part2SpeakLabel: 'PHẦN 2: BÀI NÓI 2 PHÚT LIÊN TỤC',
      part2SpeakTime: 'Thời gian:',
      finishPart2Btn: 'Hoàn tất Phần 2 và chuyển sang Phần 3 ➔',
      part3Label: 'PHẦN 3: THẢO LUẬN MỞ RỘNG',
      part3Sublabel: 'Đánh giá tư duy phản biện và khả năng diễn đạt cấu trúc phức tạp',
      finishAndReportBtn: 'Nộp bài và xem báo cáo chấm điểm ➔',
      evaluatingTitle: 'Hội đồng giám khảo đang chấm điểm bài thi của bạn...',
      evaluatingDesc: 'Đánh giá chi tiết 4 tiêu chí: Độ lưu loát, Vốn từ vựng, Ngữ pháp và Phát âm theo thang chuẩn quốc tế.',
      testFinishedSummary: 'Chúc mừng bạn đã hoàn thành bài thi thử! Bảng điểm chi tiết đã sẵn sàng bên dưới.',
    },
    guide: {
      title: 'Cẩm nang và Chiến lược luyện nói AeroSpeak',
      subtitle: 'Tiêu chuẩn chấm điểm, Lộ trình hàng ngày và Tâm lý phòng thi',
      tabs: {
        features: 'Hướng dẫn tính năng',
        rubric: '4 Tiêu chí IELTS',
        plan: 'Lộ trình 15 phút/ngày',
        anxiety: 'Vượt qua tâm lý sợ nói',
        apiKey: 'Hướng dẫn API Key cá nhân',
      },
      apiKeyGuide: {
        title: 'Hướng dẫn lấy & Cấu hình API Key Gemini cá nhân',
        intro: 'AeroSpeak AI vận hành theo kiến trúc Server Proxy bảo mật (/api/*). Toàn bộ API Key được lưu giữ và xử lý bảo mật trên máy chủ backend, tuyệt đối không bị lộ token ra ngoài trình duyệt web của người dùng.',
        step1Title: 'Bước 1: Lấy API Key Gemini miễn phí từ Google',
        step1Desc: 'Truy cập trang Google AI Studio (aistudio.google.com/app/apikey), đăng nhập tài khoản Google của bạn và nhấn nút "Create API Key" để nhận mã khóa API Key của riêng bạn hoàn toàn miễn phí.',
        step2Title: 'Bước 2: Cấu hình vào mục Secrets của AI Studio',
        step2Desc: 'Tại giao diện dự án AI Studio, mở menu Settings > Secrets, tạo biến môi trường có tên GEMINI_API_KEY và dán mã key vừa tạo vào.',
        step3Title: 'Bước 3: Tận hưởng hạn mức riêng biệt & tốc độ tối đa',
        step3Desc: 'Hệ thống proxy phía server sẽ tự động sử dụng trực tiếp hạn mức API riêng của bạn cho mọi lượt luyện nói, sinh đề và chấm thi.',
        securityNote: 'Lưu ý bảo mật: Theo chuẩn bảo mật quốc tế của Google, bạn không bao giờ nên nhập API key trực tiếp trên form giao diện web công khai khi chia sẻ app để tránh bị lộ mã key cá nhân. Việc cấu hình qua tab Secrets trên server giúp bảo vệ tài khoản của bạn an toàn 100%.',
      },
      askMoreBtn: 'Hỏi cố vấn AeroSpeak',
      closeBtn: 'Đóng cẩm nang',
    },
  },
};
