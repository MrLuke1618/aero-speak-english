import React, { useState } from 'react';
import {
  X,
  Compass,
  GraduationCap,
  Flame,
  ShieldCheck,
  Target,
  Sparkles,
  BarChart3,
  BookOpen,
  Radio,
  Key,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { AppLanguage } from '../types';
import { translations } from '../translations';

interface GuideModalProps {
  onClose: () => void;
  onAskMentor: (question: string) => void;
  language: AppLanguage;
  initialTab?: 'features' | 'rubric' | 'plan' | 'anxiety' | 'apiKey';
}

export const GuideModal: React.FC<GuideModalProps> = ({
  onClose,
  onAskMentor,
  language,
  initialTab = 'features',
}) => {
  const [activeTab, setActiveTab] = useState<'features' | 'rubric' | 'plan' | 'anxiety' | 'apiKey'>(initialTab);
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-[#0e121b] border border-[#20273a] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header HUD */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#121623] border-b border-[#20273a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100 uppercase tracking-wide">
                {t.guide.title}
              </h2>
              <p className="text-xs text-zinc-400">
                {t.guide.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a2030] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#20273a] overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'features'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.guide.tabs.features}</span>
          </button>
          <button
            onClick={() => setActiveTab('rubric')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rubric'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.guide.tabs.rubric}</span>
          </button>
          <button
            onClick={() => setActiveTab('plan')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'plan'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{t.guide.tabs.plan}</span>
          </button>
          <button
            onClick={() => setActiveTab('anxiety')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'anxiety'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.guide.tabs.anxiety}</span>
          </button>
          <button
            onClick={() => setActiveTab('apiKey')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'apiKey'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>{t.guide.tabs.apiKey}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-zinc-200 text-xs sm:text-sm">
          {activeTab === 'features' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1.5">
                <h4 className="font-semibold text-emerald-400 font-mono">
                  1. {language === 'vi' ? 'Luyện tập hàng ngày (Daily Fluency)' : 'Daily English & Fluency Booster'}
                </h4>
                <p className="text-zinc-300 leading-relaxed font-sans">
                  {language === 'vi'
                    ? 'Bao gồm Coffee Chat (trò chuyện đời sống), Travel Survival (tình huống du lịch và gọi món), và Thử thách nói 1 phút liên tục không ngắt quãng để phá bỏ thói quen dịch nhẩm.'
                    : 'Features casual Coffee Chats, Travel Survival roleplay, and the 60-Second Flow Challenge to break the habit of mental translation and establish rapid speech flow.'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1.5">
                <h4 className="font-semibold text-emerald-400 font-mono">
                  2. {language === 'vi' ? 'Luyện thi IELTS & Phỏng vấn (Career Simulation)' : 'IELTS & Job Interview Simulation'}
                </h4>
                <p className="text-zinc-300 leading-relaxed font-sans">
                  {language === 'vi'
                    ? 'Thực hành chuyên sâu từng phần IELTS Part 1, 2, 3 và Phỏng vấn xin việc bằng tiếng Anh theo mô hình STAR, với câu hỏi khai thác sâu tư duy phản biện.'
                    : 'Targeted preparation for IELTS Speaking Parts 1, 2, and 3, plus behavioral job interviews using the STAR framework with analytical follow-up questions.'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1.5">
                <h4 className="font-semibold text-emerald-400 font-mono">
                  3. {language === 'vi' ? 'Thi thử như thật (Strict Mock Test)' : 'Strict Mock Test Simulation'}
                </h4>
                <p className="text-zinc-300 leading-relaxed font-sans">
                  {language === 'vi'
                    ? 'Mô phỏng đầy đủ quy trình thi thật. Giám khảo không ngắt lời, kiểm soát thời gian nghiêm ngặt và cung cấp báo cáo đánh giá 4 tiêu chí toàn diện khi hoàn thành.'
                    : 'Authentic exam environment without mid-test interruptions, strictly timed sections, and a comprehensive master report upon completion.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'rubric' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1">
                  <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5" />
                    {language === 'vi' ? '1. Độ lưu loát & Mạch lạc' : '1. Fluency & Coherence'}
                  </span>
                  <p className="text-zinc-300 leading-relaxed text-xs font-sans">
                    {language === 'vi'
                      ? 'Nói đều đặn, ngắt nghỉ theo cụm nghĩa tự nhiên, liên kết ý tưởng trôi chảy mà không ngập ngừng kéo dài.'
                      : 'Speaking continuously without unnatural pauses, linking thoughts coherently with natural discourse markers.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1">
                  <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {language === 'vi' ? '2. Vốn từ vựng' : '2. Lexical Resource'}
                  </span>
                  <p className="text-zinc-300 leading-relaxed text-xs font-sans">
                    {language === 'vi'
                      ? 'Sử dụng từ vựng đa dạng, collocations và thành ngữ chính xác theo từng ngữ cảnh chuyên biệt.'
                      : 'Wide range of topic vocabulary, natural collocations, and idiomatic precision.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1">
                  <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {language === 'vi' ? '3. Ngữ pháp chuẩn xác' : '3. Grammatical Range & Accuracy'}
                  </span>
                  <p className="text-zinc-300 leading-relaxed text-xs font-sans">
                    {language === 'vi'
                      ? 'Kết hợp câu đơn và câu phức linh hoạt, dùng đúng các thì và cấu trúc điều kiện hoặc mệnh đề.'
                      : 'Flexible mix of simple and complex sentence structures, accurate tenses, and few systematic errors.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1">
                  <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    {language === 'vi' ? '4. Phát âm & Ngữ điệu' : '4. Pronunciation & Intonation'}
                  </span>
                  <p className="text-zinc-300 leading-relaxed text-xs font-sans">
                    {language === 'vi'
                      ? 'Phát âm rõ âm đuôi, nhấn trọng âm từ đúng, nối âm tự nhiên và ngữ điệu câu có nhịp điệu sinh động.'
                      : 'Clear articulation, correct word stress, natural connected speech, and rhythmic intonation.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="space-y-2.5 font-sans">
              <div className="p-3 rounded-lg bg-[#131724] border border-[#20273a] flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 text-xs font-bold">01 - 05m:</span>
                <div>
                  <strong className="text-zinc-100 block">
                    {language === 'vi' ? 'Khởi động phản xạ (Warm-up):' : 'Warm-up Routine:'}
                  </strong>
                  <p className="text-zinc-400 text-xs">
                    {language === 'vi'
                      ? 'Vào chế độ Luyện hàng ngày, trò chuyện 2-3 lượt câu để mở khẩu hình miệng.'
                      : 'Spend 5 minutes in Daily Fluency answering light conversational questions.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#131724] border border-[#20273a] flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 text-xs font-bold">05 - 12m:</span>
                <div>
                  <strong className="text-zinc-100 block">
                    {language === 'vi' ? 'Thử thách bài nói dài (Long Turn Practice):' : 'Long Turn Practice:'}
                  </strong>
                  <p className="text-zinc-400 text-xs">
                    {language === 'vi'
                      ? 'Nói liên tục trong 1 đến 2 phút, sau đó nhấn Chấm điểm ngay để xem phân tích từ vựng và ngữ pháp.'
                      : 'Speak continuously for 1-2 minutes, then click Evaluate Now to receive detailed lexical feedback.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#131724] border border-[#20273a] flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 text-xs font-bold">12 - 20m:</span>
                <div>
                  <strong className="text-zinc-100 block">
                    {language === 'vi' ? 'Luyện nghe & Nhại giọng (Shadowing):' : 'Shadowing Model Answers:'}
                  </strong>
                  <p className="text-zinc-400 text-xs">
                    {language === 'vi'
                      ? 'Bấm nghe câu trả lời mẫu của AI và phát âm lại theo đúng nhịp điệu của người bản xứ.'
                      : 'Listen to the high-band model answer audio and shadow the pronunciation and intonation twice.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'anxiety' && (
            <div className="space-y-3 font-sans">
              <div className="p-3 rounded-lg bg-[#131724] border border-[#20273a] space-y-1">
                <strong className="text-emerald-400 block font-mono">
                  {language === 'vi' ? '1. Đừng cố dịch từng chữ trong đầu' : '1. Do not translate word-by-word in your head'}
                </strong>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {language === 'vi'
                    ? 'Tập suy nghĩ theo cụm ý. Nếu quên một từ, hãy diễn giải ý nghĩa bằng các từ đơn giản hơn (paraphrase).'
                    : 'Think in conceptual chunks. If you forget a specific word, paraphrase using familiar vocabulary.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#131724] border border-[#20273a] space-y-1">
                <strong className="text-emerald-400 block font-mono">
                  {language === 'vi' ? '2. Tận dụng từ liên kết tự nhiên' : '2. Use natural conversational fillers'}
                </strong>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {language === 'vi'
                    ? 'Dùng các cụm tự nhiên như: "To be honest...", "From my perspective...", "That is an interesting question..." để có thêm thời gian suy nghĩ thay vì ngập ngừng.'
                    : 'Natural phrases like "To be completely honest...", "From my perspective...", and "That is a fascinating question..." provide natural thinking time.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'apiKey' && (
            <div className="space-y-4 font-sans">
              <div className="p-4 rounded-xl bg-[#131724] border border-[#20273a] space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold text-sm">
                  <Key className="w-4 h-4" />
                  <span>{t.guide.apiKeyGuide.title}</span>
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {t.guide.apiKeyGuide.intro}
                </p>
                <div className="pt-1.5">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors shadow-md shadow-emerald-500/20"
                  >
                    <span>Google AI Studio API Key Manager</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1.5">
                  <span className="font-mono text-emerald-400 text-xs font-bold block">
                    {t.guide.apiKeyGuide.step1Title}
                  </span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {t.guide.apiKeyGuide.step1Desc}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1.5">
                  <span className="font-mono text-emerald-400 text-xs font-bold block">
                    {t.guide.apiKeyGuide.step2Title}
                  </span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {t.guide.apiKeyGuide.step2Desc}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#131724] border border-[#20273a] space-y-1.5">
                  <span className="font-mono text-emerald-400 text-xs font-bold block">
                    {t.guide.apiKeyGuide.step3Title}
                  </span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {t.guide.apiKeyGuide.step3Desc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#181d2a] border border-[#263048] flex items-start gap-2.5 text-xs text-zinc-300">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t.guide.apiKeyGuide.securityNote}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#121623] border-t border-[#20273a] flex items-center justify-between font-mono">
          <button
            onClick={() => {
              onClose();
              onAskMentor(language === 'vi' ? 'Hãy cho tôi một lời khuyên luyện nói hôm nay.' : 'Please give me a personalized speaking tip for today.');
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#182030] hover:bg-[#202b40] text-emerald-400 border border-emerald-500/30 transition-colors"
          >
            {t.guide.askMoreBtn}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors"
          >
            {t.guide.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
