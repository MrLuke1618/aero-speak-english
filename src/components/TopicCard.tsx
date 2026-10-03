import React, { useState, useEffect } from 'react';
import {
  Shuffle,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Compass,
  Flame,
  Speech,
  Briefcase,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { AppLanguage, DynamicTopic, MainMode, SubMode } from '../types';
import { deepCleanAiArtifacts } from '../utils/textFormatter';
import { translations } from '../translations';

interface TopicCardProps {
  currentMode: MainMode;
  currentSubMode: SubMode;
  onSelectSubMode: (subMode: SubMode) => void;
  topic: DynamicTopic | null;
  isLoadingTopic: boolean;
  onGenerateNewTopic: () => void;
  onQuickStartPrompt: (question: string) => void;
  language: AppLanguage;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  currentMode,
  currentSubMode,
  onSelectSubMode,
  topic: rawTopic,
  isLoadingTopic,
  onGenerateNewTopic,
  onQuickStartPrompt,
  language,
}) => {
  const topic = rawTopic ? deepCleanAiArtifacts(rawTopic) : null;
  const t = translations[language];

  // Timer state for Cue Card / 1-minute talk
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [timerMax, setTimerMax] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'prep' | 'speak'>('prep');

  // Sync timers when submode changes
  useEffect(() => {
    if (currentSubMode === 'opinion_builder') {
      setTimerSeconds(60);
      setTimerMax(60);
      setTimerMode('speak');
      setIsTimerRunning(false);
    } else if (currentSubMode === 'ielts_part2') {
      setTimerSeconds(60);
      setTimerMax(60);
      setTimerMode('prep');
      setIsTimerRunning(false);
    }
  }, [currentSubMode]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (currentSubMode === 'ielts_part2' && timerMode === 'prep') {
        setTimerMode('speak');
        setTimerSeconds(120);
        setTimerMax(120);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, currentSubMode, timerMode]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (mode: 'prep' | 'speak', seconds: number) => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(seconds);
    setTimerMax(seconds);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="bg-[#10141f] border border-[#1f2638] rounded-xl p-4 sm:p-5 space-y-4 shadow-sm">
      {/* Submode Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
        {currentMode === 'mode1_daily' && (
          <>
            <button
              onClick={() => onSelectSubMode('coffee_chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'coffee_chat'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>{t.modes.mode1_daily.submodes.coffee_chat}</span>
            </button>
            <button
              onClick={() => onSelectSubMode('travel_survival')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'travel_survival'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.modes.mode1_daily.submodes.travel_survival}</span>
            </button>
            <button
              onClick={() => onSelectSubMode('opinion_builder')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'opinion_builder'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{t.modes.mode1_daily.submodes.opinion_builder}</span>
            </button>
          </>
        )}

        {currentMode === 'mode2_pro' && (
          <>
            <button
              onClick={() => onSelectSubMode('ielts_part1')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'ielts_part1'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <Speech className="w-3.5 h-3.5" />
              <span>{t.modes.mode2_pro.submodes.ielts_part1}</span>
            </button>
            <button
              onClick={() => onSelectSubMode('ielts_part2')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'ielts_part2'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{t.modes.mode2_pro.submodes.ielts_part2}</span>
            </button>
            <button
              onClick={() => onSelectSubMode('ielts_part3')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'ielts_part3'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.modes.mode2_pro.submodes.ielts_part3}</span>
            </button>
            <button
              onClick={() => onSelectSubMode('job_interview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'job_interview'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.modes.mode2_pro.submodes.job_interview}</span>
            </button>
            <button
              onClick={() => onSelectSubMode('business_pitch')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                currentSubMode === 'business_pitch'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 bg-[#161b28]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.modes.mode2_pro.submodes.business_pitch}</span>
            </button>
          </>
        )}
      </div>

      {/* Main Topic Header */}
      <div className="flex items-start justify-between gap-3 border-t border-[#1f2638] pt-3">
        <div className="space-y-1">
          <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400/80">
            {currentMode === 'mode1_daily'
              ? t.modes.mode1_daily.title
              : t.modes.mode2_pro.title}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
            {topic ? topic.title : t.topicCard.loading}
          </h3>
        </div>

        <button
          onClick={onGenerateNewTopic}
          disabled={isLoadingTopic}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#161b28] hover:bg-[#1f2638] text-emerald-400 border border-[#232b3f] hover:border-emerald-500/40 transition-colors shrink-0 disabled:opacity-50"
        >
          <Shuffle className={`w-3.5 h-3.5 ${isLoadingTopic ? 'animate-spin' : ''}`} />
          <span>{t.topicCard.changeTopic}</span>
        </button>
      </div>

      {/* Scenario Context */}
      {topic?.context && (
        <div className="p-3 rounded-lg bg-[#141824] border border-[#1f2638] text-xs text-zinc-300 leading-relaxed font-sans">
          <strong className="text-zinc-200 font-semibold">{t.topicCard.scenarioContext} </strong>
          {topic.context}
        </div>
      )}

      {/* Cue Card Timer for IELTS Part 2 or 1-Minute Talk */}
      {(currentSubMode === 'ielts_part2' || currentSubMode === 'opinion_builder') && (
        <div className="p-3.5 rounded-lg bg-[#141926] border border-[#232c40] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-200 block">
                {currentSubMode === 'ielts_part2'
                  ? timerMode === 'prep'
                    ? t.topicCard.cueCardPrepTitle
                    : t.topicCard.cueCardSpeakTitle
                  : t.topicCard.opinionBuilderTitle}
              </span>
              <span className="text-[11px] text-zinc-400">
                {currentSubMode === 'ielts_part2' && timerMode === 'prep'
                  ? t.topicCard.cueCardPrepDesc
                  : t.topicCard.cueCardSpeakDesc}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="font-mono text-xl font-bold px-3 py-1 rounded bg-[#0a0d14] text-emerald-400 border border-[#222a3d] tracking-wider">
              {formatTimer(timerSeconds)}
            </div>

            <button
              onClick={toggleTimer}
              className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-colors"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() =>
                resetTimer(
                  currentSubMode === 'opinion_builder' ? 'speak' : 'prep',
                  currentSubMode === 'opinion_builder' ? 60 : 60
                )
              }
              className="p-1.5 rounded-lg bg-[#1c2234] hover:bg-[#252d44] text-zinc-300 transition-colors border border-[#2a344d]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Suggested Questions or Cue Card */}
      {topic?.cueCard && currentSubMode === 'ielts_part2' ? (
        <div className="p-3.5 rounded-lg bg-[#141824] border border-[#1f2638] space-y-2 text-xs">
          <div className="font-semibold text-emerald-400">
            {t.topicCard.cueCardTopic} {topic.cueCard.topic}
          </div>
          <p className="text-zinc-400">{t.topicCard.youShouldSay}</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            {topic.cueCard.prompts.map((p, idx) => (
              <li key={idx} className="leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        topic?.questions && (
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-zinc-400 block font-mono">
              {t.topicCard.questionsPrompt}
            </span>
            <div className="space-y-1.5">
              {topic.questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickStartPrompt(q)}
                  className="w-full text-left p-2.5 rounded-lg bg-[#131722] hover:bg-[#1a2030] text-xs text-zinc-200 border border-[#1e2536] hover:border-emerald-500/40 transition-all flex items-start gap-2 group"
                >
                  <span className="w-4 h-4 rounded bg-[#1c2333] text-emerald-400 font-mono text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed group-hover:text-zinc-100">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )
      )}

      {/* Suggested Collocations */}
      {topic?.suggestedKeyWords && topic.suggestedKeyWords.length > 0 && (
        <div className="pt-2 border-t border-[#1f2638] flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-400 font-medium flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            {t.topicCard.suggestedCollocations}
          </span>
          {topic.suggestedKeyWords.map((kw, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-[#161b28] text-emerald-300 border border-[#232b3f] text-[11px] font-mono"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
