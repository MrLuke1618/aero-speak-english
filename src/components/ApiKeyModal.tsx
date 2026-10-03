import React, { useState } from 'react';
import {
  X,
  Key,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Lock,
  Trash2,
} from 'lucide-react';
import { AppLanguage } from '../types';

interface ApiKeyModalProps {
  currentApiKey?: string;
  onSaveKey: (key: string) => void;
  onRemoveKey: () => void;
  onClose: () => void;
  language: AppLanguage;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  currentApiKey = '',
  onSaveKey,
  onRemoveKey,
  onClose,
  language,
}) => {
  const [inputKey, setInputKey] = useState(currentApiKey);
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const isVi = language === 'vi';

  const handleValidateAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputKey.trim();
    if (!clean) {
      setValidationResult({
        success: false,
        message: isVi
          ? 'Vui lòng nhập mã Gemini API Key hợp lệ.'
          : 'Please enter a valid Gemini API Key.',
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const res = await fetch('/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: clean }),
      });

      const data = await res.json();
      if (res.ok && data.valid) {
        setValidationResult({
          success: true,
          message: isVi
            ? 'Xác thực thành công! Đã kích hoạt tính năng Pro với API Key cá nhân.'
            : 'Verification successful! Pro features unlocked with your personal API key.',
        });
        onSaveKey(clean);
      } else {
        setValidationResult({
          success: false,
          message:
            data.error ||
            (isVi
              ? 'Khóa API không hợp lệ hoặc chưa được kích hoạt quyền truy cập Gemini API.'
              : 'Invalid API key or Gemini API access is not enabled.'),
        });
      }
    } catch (err: any) {
      setValidationResult({
        success: false,
        message: isVi
          ? 'Lỗi kết nối khi kiểm tra khóa. Vui lòng thử lại.'
          : 'Connection error while validating key. Please try again.',
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemove = () => {
    onRemoveKey();
    setInputKey('');
    setValidationResult({
      success: true,
      message: isVi
        ? 'Đã xóa API Key cá nhân. Ứng dụng đã chuyển về chế độ tiêu chuẩn mặc định.'
        : 'Personal API key removed. Reverted to standard default mode.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-6 bg-[#0e121c] border border-[#20273a] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header HUD */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#121623] border-b border-[#20273a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100 uppercase tracking-wide flex items-center gap-2">
                <span>{isVi ? 'Kích hoạt Tính năng Nâng cao (Gemini API)' : 'Unlock Advanced Features (Gemini API)'}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/40">
                  PRO
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                {isVi
                  ? 'Sử dụng API Key cá nhân để mở khóa toàn bộ mô hình cao cấp và hạn mức riêng biệt'
                  : 'Use your personal API key to unlock flagship models and dedicated quotas'}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-zinc-200 text-xs sm:text-sm">
          {/* Unlocked Benefits Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-lg bg-[#141824] border border-[#20273a] space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isVi ? 'Gemini 3.1 Pro' : 'Gemini 3.1 Pro'}</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {isVi
                  ? 'Kích hoạt mô hình lý luận sâu, phân tích cấu trúc Band 8.5+ chuyên sâu.'
                  : 'Unlocks flagship deep reasoning and advanced Band 8.5+ analytical feedback.'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#141824] border border-[#20273a] space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold text-xs">
                <Zap className="w-3.5 h-3.5" />
                <span>{isVi ? 'Hạn mức riêng' : 'Dedicated Quota'}</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {isVi
                  ? 'Tốc độ phản hồi tức thì, không bị giới hạn hoặc chờ đợi theo hạn mức chung.'
                  : 'Fast response times directly tied to your Google account with zero bottlenecks.'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#141824] border border-[#20273a] space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isVi ? 'Phân tích IPA' : 'Phonetic IPA'}</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {isVi
                  ? 'Bóc tách ngữ âm chi tiết từng từ, trọng âm và cao độ ngữ điệu người bản ngữ.'
                  : 'Deep syllable stress analysis and connected speech intonation tips.'}
              </p>
            </div>
          </div>

          {/* Form Input */}
          <form onSubmit={handleValidateAndSave} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isVi ? 'Nhập Gemini API Key của bạn:' : 'Enter your Gemini API Key:'}</span>
                </label>
                {currentApiKey && (
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {isVi ? 'Đang hoạt động' : 'Currently Active'}
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-[#0a0d14] border border-[#1f2638] focus:border-emerald-500 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 font-mono">
                {isVi
                  ? 'Khóa được lưu cục bộ trên trình duyệt của bạn (localStorage) và gửi an toàn qua proxy máy chủ.'
                  : 'Key is stored locally in your browser and securely proxied through server endpoints.'}
              </p>
            </div>

            {/* Validation Feedback */}
            {validationResult && (
              <div
                className={`p-3 rounded-lg text-xs font-mono flex items-start gap-2 ${
                  validationResult.success
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
                }`}
              >
                {validationResult.success ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span className="leading-relaxed">{validationResult.message}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isValidating || !inputKey.trim()}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors flex items-center gap-2 disabled:opacity-40 shadow-sm shadow-emerald-500/20"
                >
                  {isValidating ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      <span>{isVi ? 'Đang kiểm tra...' : 'Validating Key...'}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isVi ? 'Xác thực & Lưu Key' : 'Validate & Save Key'}</span>
                    </>
                  )}
                </button>

                {currentApiKey && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-3 py-2 rounded-lg bg-[#182030] hover:bg-rose-950/30 text-rose-400 border border-rose-500/30 text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isVi ? 'Gỡ bỏ' : 'Remove Key'}</span>
                  </button>
                )}
              </div>

              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-mono underline underline-offset-4"
              >
                <span>{isVi ? 'Lấy API Key miễn phí tại Google AI Studio' : 'Get Free Key at Google AI Studio'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </form>

          {/* Step-by-step instructions card */}
          <div className="p-4 rounded-xl bg-[#121622] border border-[#20273a] space-y-2.5">
            <div className="font-mono font-semibold text-xs text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isVi ? 'Hướng dẫn 3 bước lấy API Key cá nhân:' : 'How to get your personal API Key in 3 steps:'}</span>
            </div>

            <ol className="space-y-2 text-xs text-zinc-300 font-sans list-decimal list-inside leading-relaxed">
              <li>
                <strong className="text-zinc-100">
                  {isVi ? 'Truy cập Google AI Studio: ' : 'Visit Google AI Studio: '}
                </strong>
                {isVi
                  ? 'Mở trang aistudio.google.com/app/apikey và đăng nhập tài khoản Google.'
                  : 'Open aistudio.google.com/app/apikey and sign in with your Google account.'}
              </li>
              <li>
                <strong className="text-zinc-100">
                  {isVi ? 'Tạo khóa mới: ' : 'Create New Key: '}
                </strong>
                {isVi
                  ? 'Nhấn nút "Create API Key" (chọn tạo trong dự án mới hoặc dự án Google Cloud có sẵn).'
                  : 'Click "Create API Key" (choose in a new project or existing Google Cloud project).'}
              </li>
              <li>
                <strong className="text-zinc-100">
                  {isVi ? 'Dán vào ứng dụng: ' : 'Paste into the app: '}
                </strong>
                {isVi
                  ? 'Sao chép chuỗi mã (bắt đầu bằng AIzaSy...) dán vào ô bên trên và bấm "Xác thực & Lưu Key".'
                  : 'Copy the token string (starting with AIzaSy...), paste it into the box above, and click "Validate & Save Key".'}
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#121623] border-t border-[#20273a] flex items-center justify-between font-mono">
          <span className="text-[11px] text-zinc-500">
            {currentApiKey
              ? isVi
                ? 'Đang dùng: API Key cá nhân'
                : 'Using: Personal Custom Key'
              : isVi
              ? 'Đang dùng: Máy chủ tiêu chuẩn mặc định'
              : 'Using: Default Server Standard'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-[#182030] hover:bg-[#202b40] text-zinc-200 border border-[#28344e] transition-colors"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
