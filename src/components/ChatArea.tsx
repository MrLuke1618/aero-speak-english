import React, { useState } from 'react';
import {
  Volume2,
  AudioLines,
  Speech,
  Coffee,
  GraduationCap,
  Briefcase,
  Compass,
  Target,
  Headphones,
} from 'lucide-react';
import { AppLanguage, ChatMessage } from '../types';
import { requestTTS, soundManager } from '../utils/audio';
import { cleanAiArtifacts } from '../utils/textFormatter';
import { translations } from '../translations';

interface ChatAreaProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onEvaluateTurn: (text: string) => void;
  onQuickPrompt: (prompt: string) => void;
  voiceName: string;
  language: AppLanguage;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isLoading,
  onEvaluateTurn,
  onQuickPrompt,
  voiceName,
  language,
}) => {
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const t = translations[language];

  const handlePlayTTS = async (message: ChatMessage) => {
    if (playingMessageId === message.id && soundManager.isPlaying()) {
      soundManager.stop();
      setPlayingMessageId(null);
      return;
    }

    if (message.audioBase64) {
      setPlayingMessageId(message.id);
      soundManager.playBase64Wav(message.audioBase64, () => {
        setPlayingMessageId(null);
      });
      return;
    }

    setLoadingAudioId(message.id);
    try {
      const base64 = await requestTTS(message.content, voiceName);
      if (base64) {
        message.audioBase64 = base64;
        setPlayingMessageId(message.id);
        soundManager.playBase64Wav(base64, () => {
          setPlayingMessageId(null);
        });
      }
    } finally {
      setLoadingAudioId(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0d1017]">
      {/* Starter Prompts on initial load */}
      {messages.length <= 1 && (
        <div className="p-4 sm:p-5 rounded-xl bg-[#121622] border border-[#1f2638] space-y-3">
          <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            {t.chat.starterPromptTitle}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <button
              onClick={() => onQuickPrompt(t.chat.starters.dailyChat.prompt)}
              className="p-3 text-left rounded-lg bg-[#161c2b] hover:bg-[#1c2438] text-zinc-200 border border-[#222a3d] hover:border-emerald-500/40 transition-all flex items-center gap-2.5 group"
            >
              <div className="p-2 rounded-lg bg-[#111520] text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {t.chat.starters.dailyChat.title}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {t.chat.starters.dailyChat.desc}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickPrompt(t.chat.starters.ieltsPractice.prompt)}
              className="p-3 text-left rounded-lg bg-[#161c2b] hover:bg-[#1c2438] text-zinc-200 border border-[#222a3d] hover:border-emerald-500/40 transition-all flex items-center gap-2.5 group"
            >
              <div className="p-2 rounded-lg bg-[#111520] text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {t.chat.starters.ieltsPractice.title}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {t.chat.starters.ieltsPractice.desc}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickPrompt(t.chat.starters.jobInterview.prompt)}
              className="p-3 text-left rounded-lg bg-[#161c2b] hover:bg-[#1c2438] text-zinc-200 border border-[#222a3d] hover:border-emerald-500/40 transition-all flex items-center gap-2.5 group"
            >
              <div className="p-2 rounded-lg bg-[#111520] text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {t.chat.starters.jobInterview.title}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {t.chat.starters.jobInterview.desc}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickPrompt(t.chat.starters.guideHelp.prompt)}
              className="p-3 text-left rounded-lg bg-[#161c2b] hover:bg-[#1c2438] text-zinc-200 border border-[#222a3d] hover:border-emerald-500/40 transition-all flex items-center gap-2.5 group"
            >
              <div className="p-2 rounded-lg bg-[#111520] text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {t.chat.starters.guideHelp.title}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {t.chat.starters.guideHelp.desc}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Message Stream */}
      {messages.map((message) => {
        const isAssistant = message.role === 'assistant';

        return (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              isAssistant ? 'justify-start' : 'justify-end'
            }`}
          >
            {isAssistant && (
              <div className="w-8 h-8 rounded-lg bg-[#161b28] border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <AudioLines className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                isAssistant
                  ? 'bg-[#121622] border border-[#20273a] text-zinc-100'
                  : 'bg-[#161d2a] border border-emerald-500/40 text-zinc-100 shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line space-y-1">
                {cleanAiArtifacts(message.content)}
              </div>

              <div className="flex items-center justify-between gap-3 mt-3 pt-2 border-t border-[#1e2436] text-xs">
                <span className="text-[10px] font-mono text-zinc-500">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>

                <div className="flex items-center gap-1.5">
                  {isAssistant && (
                    <button
                      onClick={() => handlePlayTTS(message)}
                      disabled={loadingAudioId === message.id}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1b2234] hover:bg-[#232c44] text-emerald-400 font-mono font-medium transition-colors text-[11px] border border-[#27324c]"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>
                        {playingMessageId === message.id
                          ? t.chat.stopAudio
                          : loadingAudioId === message.id
                          ? t.chat.preparingAudio
                          : t.chat.listenPronunciation}
                      </span>
                    </button>
                  )}

                  {!isAssistant && (
                    <button
                      onClick={() => onEvaluateTurn(message.content)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono font-medium transition-colors text-[11px] border border-emerald-500/40"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>{t.chat.evalTurnBtn}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {!isAssistant && (
              <div className="w-8 h-8 rounded-lg bg-[#161d2a] border border-[#232c3f] flex items-center justify-center text-zinc-300 shrink-0">
                <Speech className="w-4 h-4" />
              </div>
            )}
          </div>
        );
      })}

      {/* Loading Thinking Indicator */}
      {isLoading && (
        <div className="flex items-center gap-3 justify-start">
          <div className="w-8 h-8 rounded-lg bg-[#161b28] border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <AudioLines className="w-4 h-4 animate-pulse" />
          </div>
          <div className="bg-[#121622] border border-[#20273a] rounded-xl px-4 py-3 text-xs text-zinc-300 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-100" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-200" />
            </div>
            <span className="font-mono text-zinc-300">{t.chat.thinking}</span>
          </div>
        </div>
      )}
    </div>
  );
};
