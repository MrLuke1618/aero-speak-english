import React, { useState } from 'react';
import {
  X,
  Target,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Radio,
  Headphones,
  Share2,
  Check,
  Sparkles,
} from 'lucide-react';
import { AppLanguage, EvaluationReport } from '../types';
import { requestTTS, soundManager } from '../utils/audio';
import { cleanAiArtifacts, deepCleanAiArtifacts } from '../utils/textFormatter';
import { translations } from '../translations';

interface EvaluationModalProps {
  evaluation: EvaluationReport;
  userSpeech: string;
  topic?: string;
  onClose: () => void;
  voiceName?: string;
  language: AppLanguage;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  evaluation: rawEvaluation,
  userSpeech: rawUserSpeech,
  topic,
  onClose,
  voiceName = 'Kore',
  language,
}) => {
  const evaluation = deepCleanAiArtifacts(rawEvaluation);
  const userSpeech = cleanAiArtifacts(rawUserSpeech);
  const t = translations[language];

  const [playingAnswerIndex, setPlayingAnswerIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadingTTS, setLoadingTTS] = useState(false);

  const handlePlayModelAnswer = async (text: string, index: number) => {
    if (playingAnswerIndex === index && soundManager.isPlaying()) {
      soundManager.stop();
      setPlayingAnswerIndex(null);
      return;
    }

    setLoadingTTS(true);
    try {
      const base64 = await requestTTS(text, voiceName);
      if (base64) {
        setPlayingAnswerIndex(index);
        soundManager.playBase64Wav(base64, () => {
          setPlayingAnswerIndex(null);
        });
      }
    } finally {
      setLoadingTTS(false);
    }
  };

  const handleCopyReport = () => {
    const textReport = cleanAiArtifacts(`
=== AeroSpeak AI: ${t.evaluation.modalTitle} ===
Topic: ${topic || 'Speaking Turn'}
${t.evaluation.estimatedBand}: ${evaluation.estimatedBand}
${t.evaluation.overallComment} ${evaluation.overallComment}

${t.evaluation.fluencyTitle}:
${evaluation.fluencyAndCoherence.analysis}

${t.evaluation.lexicalTitle}:
${evaluation.lexicalResource.analysis}
${evaluation.lexicalResource.upgrades
  .map((u) => `- ${t.evaluation.originalWord} "${u.originalWord}" ➔ ${t.evaluation.upgradeWord} "${u.upgradeWord}" (${u.explanation})`)
  .join('\n')}

${t.evaluation.grammarTitle}:
${evaluation.grammaticalAccuracy.analysis}
${evaluation.grammaticalAccuracy.corrections
  .map((c) => `- ${t.evaluation.needsImprovement} "${c.originalSentence}" ➔ ${t.evaluation.nativeAlternative} "${c.correctedSentence}" (${c.explanation})`)
  .join('\n')}

${t.evaluation.pronunciationTitle}:
${evaluation.pronunciationAndIntonation.stressAndIntonation}
${evaluation.pronunciationAndIntonation.connectedSpeechTip}

${t.evaluation.modelAnswerTitle}:
${evaluation.modelAnswers.map((m, i) => `[${i + 1}]: ${m}`).join('\n\n')}

${t.evaluation.mentorTakeawayTitle}:
${evaluation.mentorSummary}
    `).trim();

    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-[#0e121b] border border-[#20273a] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header HUD */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#121623] border-b border-[#20273a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100 uppercase tracking-wide">
                {t.evaluation.modalTitle}
              </h2>
              <p className="text-xs text-zinc-400">
                {t.evaluation.modalSubtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#182030] hover:bg-[#202b40] text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? t.evaluation.copied : t.evaluation.copyReport}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a2030] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-zinc-200 text-sm">
          {/* Estimated Band Score Banner */}
          <div className="p-4 rounded-xl bg-[#141926] border border-[#232c40] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-1">
                {t.evaluation.estimatedBand}
              </span>
              <div className="text-3xl font-black font-mono text-zinc-100 tracking-tight">
                {evaluation.estimatedBand}
              </div>
            </div>
            <div className="sm:max-w-md text-xs text-zinc-300 bg-[#0d1017] p-3 rounded-lg border border-[#1f2638]">
              <span className="font-semibold text-zinc-200 block mb-0.5 font-mono">
                {t.evaluation.overallComment}
              </span>
              <p className="leading-relaxed">"{evaluation.overallComment}"</p>
            </div>
          </div>

          {/* User's Original Speech */}
          <div className="bg-[#0b0e14] rounded-lg p-3.5 border border-[#1a2030]">
            <span className="text-xs font-mono font-medium text-zinc-400 block mb-1">
              {t.evaluation.yourSpeech}
            </span>
            <p className="text-zinc-200 text-xs sm:text-sm italic leading-relaxed font-sans">
              "{userSpeech}"
            </p>
          </div>

          {/* Fluency & Coherence */}
          <div className="space-y-2">
            <div className="text-zinc-100 font-semibold font-mono text-sm border-b border-[#1f2638] pb-1.5 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>{t.evaluation.fluencyTitle}</span>
            </div>
            <div className="bg-[#121622] rounded-lg p-3.5 border border-[#1f2638] space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed text-zinc-300">
                {evaluation.fluencyAndCoherence.analysis}
              </p>
              {evaluation.fluencyAndCoherence.speedAndPauses && (
                <div className="text-zinc-300 pt-1 text-xs font-mono">
                  <span className="text-emerald-400">{t.evaluation.rhythmAndPauses} </span>
                  {evaluation.fluencyAndCoherence.speedAndPauses}
                </div>
              )}
            </div>
          </div>

          {/* Lexical Resource */}
          <div className="space-y-2.5">
            <div className="text-zinc-100 font-semibold font-mono text-sm border-b border-[#1f2638] pb-1.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{t.evaluation.lexicalTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              {evaluation.lexicalResource.analysis}
            </p>

            {evaluation.lexicalResource.upgrades && evaluation.lexicalResource.upgrades.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {evaluation.lexicalResource.upgrades.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#121622] border border-[#1f2638] space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 font-mono">{t.evaluation.originalWord}</span>
                      <span className="line-through text-zinc-400 font-mono">
                        "{item.originalWord}"
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-mono font-medium">
                        {t.evaluation.upgradeWord}
                      </span>
                      <span className="text-white font-semibold font-mono">
                        "{item.upgradeWord}"
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pt-1 border-t border-[#1a2030]">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Grammar Accuracy */}
          <div className="space-y-2.5">
            <div className="text-zinc-100 font-semibold font-mono text-sm border-b border-[#1f2638] pb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.evaluation.grammarTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              {evaluation.grammaticalAccuracy.analysis}
            </p>

            {evaluation.grammaticalAccuracy.corrections &&
              evaluation.grammaticalAccuracy.corrections.length > 0 && (
                <div className="space-y-2">
                  {evaluation.grammaticalAccuracy.corrections.map((corr, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#121622] border border-[#1f2638] text-xs sm:text-sm space-y-1.5"
                    >
                      <div className="text-zinc-400 flex items-start gap-1.5">
                        <span className="font-mono text-zinc-400 shrink-0">{t.evaluation.needsImprovement}</span>
                        <span className="line-through text-zinc-400">"{corr.originalSentence}"</span>
                      </div>
                      <div className="text-zinc-200 flex items-start gap-1.5">
                        <span className="font-mono text-emerald-400 shrink-0">{t.evaluation.nativeAlternative}</span>
                        <span className="font-semibold text-white">"{corr.correctedSentence}"</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 pt-1 border-t border-[#1a2030]">
                        {corr.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Pronunciation & Intonation */}
          <div className="space-y-2">
            <div className="text-zinc-100 font-semibold font-mono text-sm border-b border-[#1f2638] pb-1.5 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>{t.evaluation.pronunciationTitle}</span>
            </div>
            <div className="bg-[#121622] border border-[#1f2638] rounded-lg p-3.5 text-xs sm:text-sm space-y-2 text-zinc-300">
              <p>
                <strong className="text-zinc-200 font-mono">{t.evaluation.stressAndIntonation} </strong>
                {evaluation.pronunciationAndIntonation.stressAndIntonation}
              </p>
              <p>
                <strong className="text-zinc-200 font-mono">{t.evaluation.connectedSpeech} </strong>
                {evaluation.pronunciationAndIntonation.connectedSpeechTip}
              </p>
              {evaluation.pronunciationAndIntonation.wordsToPractice &&
                evaluation.pronunciationAndIntonation.wordsToPractice.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs text-zinc-400 font-mono">{t.evaluation.wordsToPractice}</span>
                    {evaluation.pronunciationAndIntonation.wordsToPractice.map((w, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#182030] text-emerald-300 text-xs font-mono border border-[#242f48]"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Model Answers */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#1f2638] pb-1.5">
              <span className="text-zinc-100 font-semibold font-mono text-sm flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400" />
                {t.evaluation.modelAnswerTitle}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {t.evaluation.modelAnswerSubtitle}
              </span>
            </div>

            <div className="space-y-2.5">
              {evaluation.modelAnswers.map((answer, idx) => (
                <div
                  key={idx}
                  className="bg-[#121622] border border-[#1f2638] rounded-lg p-3.5 text-xs sm:text-sm space-y-2.5"
                >
                  <p className="text-zinc-200 leading-relaxed italic">
                    "{answer}"
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-zinc-500">
                      Sample #{idx + 1}
                    </span>
                    <button
                      onClick={() => handlePlayModelAnswer(answer, idx)}
                      disabled={loadingTTS}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#182030] hover:bg-[#202b40] text-emerald-400 border border-emerald-500/30 transition-colors"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>
                        {playingAnswerIndex === idx
                          ? t.evaluation.playingAudio
                          : t.evaluation.listenModelAnswer}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Takeaway */}
          <div className="p-4 rounded-xl bg-[#141926] border border-[#232c40] space-y-1.5">
            <div className="text-emerald-400 font-semibold font-mono text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.evaluation.mentorTakeawayTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {evaluation.mentorSummary}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121623] border-t border-[#20273a] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors shadow-sm"
          >
            {t.evaluation.continuePractice}
          </button>
        </div>
      </div>
    </div>
  );
};
