import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Timer,
  Play,
  Mic,
  ChevronRight,
  AudioLines,
  Target,
} from 'lucide-react';
import { AppLanguage, EvaluationReport } from '../types';
import { createSpeechRecognizer, requestTTS, soundManager } from '../utils/audio';
import { cleanAiArtifacts, deepCleanAiArtifacts } from '../utils/textFormatter';
import { translations } from '../translations';

interface MockTestModalProps {
  onClose: () => void;
  onFinishEvaluation: (evaluation: EvaluationReport, transcript: string) => void;
  voiceName: string;
  language: AppLanguage;
  model?: string;
}

export const MockTestModal: React.FC<MockTestModalProps> = ({
  onClose,
  onFinishEvaluation,
  voiceName,
  language,
  model,
}) => {
  const t = translations[language];

  // Test stages
  const [stage, setStage] = useState<
    'intro' | 'part1' | 'part2_prep' | 'part2_speak' | 'part3' | 'evaluating'
  >('intro');

  const [questionIndex, setQuestionIndex] = useState(0);
  const [part1Questions] = useState<string[]>([
    'Good morning. I am your IELTS examiner today. Could you please state your full name?',
    'Let’s talk about your hometown or the city where you live. What do you enjoy most about living there?',
    'How has your local area developed over the past few years?',
    'Do you prefer spending your free time indoors or outdoors?',
  ]);

  const [part2CueCard] = useState({
    topic: 'Describe an ambition or significant goal that you have had for a long time.',
    prompts: [
      'What this ambition or goal is',
      'When you first decided to pursue it',
      'What steps you have taken so far towards achieving it',
      'And explain why achieving this is so meaningful to your future.',
    ],
  });

  const [part3Questions] = useState<string[]>([
    'Let us discuss personal goals in modern society. Why is having clear ambitions important for young people today?',
    'Some people believe that society places too much emphasis on professional success. What is your perspective on this?',
    'In what ways do you think modern technology assists or hinders individuals in achieving their goals?',
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [userSpeechTurn, setUserSpeechTurn] = useState('');
  const [allTestTranscripts, setAllTestTranscripts] = useState<string[]>([]);
  const [prepSecondsLeft, setPrepSecondsLeft] = useState(60);
  const [speakSecondsLeft, setSpeakSecondsLeft] = useState(120);
  const [notes, setNotes] = useState('');
  const [isExaminerSpeaking, setIsExaminerSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const speakExaminerPrompt = async (text: string) => {
    setIsExaminerSpeaking(true);
    const audio = await requestTTS(text, voiceName);
    if (audio) {
      soundManager.playBase64Wav(audio, () => {
        setIsExaminerSpeaking(false);
      });
    } else {
      setIsExaminerSpeaking(false);
    }
  };

  const startExam = () => {
    setStage('part1');
    setQuestionIndex(0);
    setAllTestTranscripts([]);
    speakExaminerPrompt(part1Questions[0]);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    } else {
      setUserSpeechTurn('');
      const recognizer = createSpeechRecognizer(
        (text: string, isFinal: boolean) => {
          setUserSpeechTurn((prev) => (prev ? `${prev.trim()} ${text.trim()}` : text.trim()));
        },
        (err) => console.warn(err),
        () => setIsRecording(false)
      );
      if (recognizer) {
        recognitionRef.current = recognizer;
        try {
          recognizer.start();
          setIsRecording(true);
        } catch (e) {}
      }
    }
  };

  const handleNextPart1 = () => {
    if (isRecording) toggleRecording();
    const finalSpeech = userSpeechTurn.trim() || '(Candidate responded)';
    setAllTestTranscripts((prev) => [...prev, `[Part 1 - Question ${questionIndex + 1}]: ${finalSpeech}`]);
    setUserSpeechTurn('');

    if (questionIndex + 1 < part1Questions.length) {
      const nextIdx = questionIndex + 1;
      setQuestionIndex(nextIdx);
      speakExaminerPrompt(part1Questions[nextIdx]);
    } else {
      setStage('part2_prep');
      setPrepSecondsLeft(60);
      speakExaminerPrompt(
        `Now in Part 2, I will give you a topic card. You have one minute to prepare notes, and then two minutes to speak.`
      );
    }
  };

  useEffect(() => {
    if (stage === 'part2_prep') {
      timerRef.current = setInterval(() => {
        setPrepSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setStage('part2_speak');
            setSpeakSecondsLeft(120);
            speakExaminerPrompt(`Your preparation time is up. Please begin speaking now.`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'part2_speak') {
      timerRef.current = setInterval(() => {
        setSpeakSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [stage]);

  const handleFinishPart2 = () => {
    if (isRecording) toggleRecording();
    const finalSpeech = userSpeechTurn.trim() || '(Candidate finished cue card speech)';
    setAllTestTranscripts((prev) => [...prev, `[Part 2 Long Turn]: ${finalSpeech}`]);
    setUserSpeechTurn('');
    setStage('part3');
    setQuestionIndex(0);
    speakExaminerPrompt(
      `Thank you. In Part 3, I would like to ask you some broader questions related to this topic. ${part3Questions[0]}`
    );
  };

  const handleNextPart3 = () => {
    if (isRecording) toggleRecording();
    const finalSpeech = userSpeechTurn.trim() || '(Candidate answered abstract question)';
    setAllTestTranscripts((prev) => [...prev, `[Part 3 - Question ${questionIndex + 1}]: ${finalSpeech}`]);
    setUserSpeechTurn('');

    if (questionIndex + 1 < part3Questions.length) {
      const nextIdx = questionIndex + 1;
      setQuestionIndex(nextIdx);
      speakExaminerPrompt(part3Questions[nextIdx]);
    } else {
      finishAndEvaluate();
    }
  };

  const finishAndEvaluate = async () => {
    setStage('evaluating');
    const combinedTranscript = allTestTranscripts.join('\n\n');
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          speechText: combinedTranscript || 'Candidate performed complete IELTS Speaking test.',
          topic: 'Full Formal IELTS Mock Test',
          mode: 'mode3_mock',
          targetBand: '7.5',
          language,
          model,
        }),
      });

      if (!res.ok) throw new Error('Evaluation failed');
      const data = deepCleanAiArtifacts(await res.json());
      onFinishEvaluation(data, cleanAiArtifacts(combinedTranscript));
    } catch (err) {
      console.error(err);
      alert('Error generating test report. Please try again.');
      setStage('intro');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-[#0e121c] border border-[#20273a] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header HUD */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#121623] border-b border-[#20273a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100 uppercase tracking-wide">
                {t.mockTest.title}
              </h2>
              <p className="text-xs text-zinc-400">
                {t.mockTest.subtitle}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-zinc-200">
          {/* Stage 0: Intro */}
          {stage === 'intro' && (
            <div className="space-y-5 text-sm">
              <div className="p-4 rounded-xl bg-[#141824] border border-[#20283b] space-y-2">
                <h3 className="font-mono font-semibold text-base text-emerald-400 uppercase tracking-wide">
                  {t.mockTest.introTitle}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 list-disc list-inside">
                  {t.mockTest.introSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-[#141824] border border-[#20283b] text-zinc-300 text-xs">
                {t.mockTest.introNotice}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={startExam}
                  className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-sm transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.mockTest.startTestBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* Stage 1: Part 1 */}
          {stage === 'part1' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-[#20273a] pb-2">
                <span className="font-semibold text-emerald-400">
                  {t.mockTest.part1Label} ({questionIndex + 1}/{part1Questions.length})
                </span>
                <span>{t.mockTest.part1Duration}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#131724] border border-[#222a3d] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1a2133] text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <AudioLines className={`w-4 h-4 ${isExaminerSpeaking ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 block mb-1">
                    {t.mockTest.examinerPromptLabel}
                  </span>
                  <p className="text-base font-medium text-zinc-100 leading-relaxed font-sans">
                    "{part1Questions[questionIndex]}"
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{t.mockTest.yourAnswerLabel}</span>
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isRecording
                        ? 'bg-rose-600 text-white'
                        : 'bg-[#182030] text-emerald-400 border border-emerald-500/30 hover:bg-[#202b40]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isRecording ? t.mockTest.recordingStopBtn : t.mockTest.recordBtn}</span>
                  </button>
                </div>

                <textarea
                  value={userSpeechTurn}
                  onChange={(e) => setUserSpeechTurn(e.target.value)}
                  placeholder={t.mockTest.answerPlaceholder}
                  rows={4}
                  className="w-full bg-[#0a0d14] border border-[#1e2536] rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextPart1}
                  disabled={!userSpeechTurn.trim() && !isRecording}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors disabled:opacity-40 flex items-center gap-1.5"
                >
                  <span>{t.mockTest.nextQuestionBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Stage 2 Prep */}
          {stage === 'part2_prep' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-[#20273a] pb-2">
                <span className="font-semibold text-emerald-400">
                  {t.mockTest.part2PrepLabel}
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  {t.mockTest.part2PrepRemaining} {prepSecondsLeft}s
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#131724] border border-[#222a3d] space-y-2">
                <h4 className="font-semibold text-zinc-100 text-sm sm:text-base font-sans">
                  {part2CueCard.topic}
                </h4>
                <p className="text-xs text-zinc-400 font-mono">{t.topicCard.youShouldSay}</p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-zinc-300 font-sans">
                  {part2CueCard.prompts.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400 block">
                  {t.mockTest.part2NotesLabel}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.mockTest.part2NotesPlaceholder}
                  rows={3}
                  className="w-full bg-[#0a0d14] border border-[#1e2536] rounded-lg p-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    clearInterval(timerRef.current);
                    setStage('part2_speak');
                    setSpeakSecondsLeft(120);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors"
                >
                  {t.mockTest.skipPrepBtn}
                </button>
              </div>
            </div>
          )}

          {/* Stage 2 Speaking */}
          {stage === 'part2_speak' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-[#20273a] pb-2">
                <span className="font-semibold text-emerald-400">
                  {t.mockTest.part2SpeakLabel}
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm tracking-widest">
                  {t.mockTest.part2SpeakTime} {Math.floor(speakSecondsLeft / 60)}:
                  {speakSecondsLeft % 60 < 10 ? '0' : ''}
                  {speakSecondsLeft % 60}
                </span>
              </div>

              <div className="p-3 bg-[#131724] rounded-lg border border-[#222a3d] text-xs text-zinc-300">
                <strong className="text-emerald-400 font-mono">Topic: </strong> {part2CueCard.topic}
                {notes && (
                  <p className="mt-1 pt-1 border-t border-[#1e2536] font-mono text-zinc-400 text-[11px]">
                    Notes: {notes}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{t.mockTest.yourAnswerLabel}</span>
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                      isRecording
                        ? 'bg-rose-600 text-white'
                        : 'bg-[#182030] text-emerald-400 border border-emerald-500/30 hover:bg-[#202b40]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isRecording ? t.mockTest.recordingStopBtn : t.mockTest.recordBtn}</span>
                  </button>
                </div>

                <textarea
                  value={userSpeechTurn}
                  onChange={(e) => setUserSpeechTurn(e.target.value)}
                  placeholder={t.mockTest.answerPlaceholder}
                  rows={6}
                  className="w-full bg-[#0a0d14] border border-[#1e2536] rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleFinishPart2}
                  disabled={!userSpeechTurn.trim() && !isRecording}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors disabled:opacity-40"
                >
                  {t.mockTest.finishPart2Btn}
                </button>
              </div>
            </div>
          )}

          {/* Stage 3 */}
          {stage === 'part3' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-[#20273a] pb-2">
                <span className="font-semibold text-emerald-400">
                  {t.mockTest.part3Label} ({questionIndex + 1}/{part3Questions.length})
                </span>
                <span>{t.mockTest.part3Sublabel}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#131724] border border-[#222a3d] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1a2133] text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <AudioLines className={`w-4 h-4 ${isExaminerSpeaking ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 block mb-1">
                    {t.mockTest.examinerPromptLabel}
                  </span>
                  <p className="text-base font-medium text-zinc-100 leading-relaxed font-sans">
                    "{part3Questions[questionIndex]}"
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{t.mockTest.yourAnswerLabel}</span>
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                      isRecording
                        ? 'bg-rose-600 text-white'
                        : 'bg-[#182030] text-emerald-400 border border-emerald-500/30 hover:bg-[#202b40]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isRecording ? t.mockTest.recordingStopBtn : t.mockTest.recordBtn}</span>
                  </button>
                </div>

                <textarea
                  value={userSpeechTurn}
                  onChange={(e) => setUserSpeechTurn(e.target.value)}
                  placeholder={t.mockTest.answerPlaceholder}
                  rows={4}
                  className="w-full bg-[#0a0d14] border border-[#1e2536] rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextPart3}
                  disabled={!userSpeechTurn.trim() && !isRecording}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors disabled:opacity-40"
                >
                  {questionIndex + 1 < part3Questions.length
                    ? t.mockTest.nextQuestionBtn
                    : t.mockTest.finishAndReportBtn}
                </button>
              </div>
            </div>
          )}

          {/* Stage Evaluating */}
          {stage === 'evaluating' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono">
              <div className="w-12 h-12 rounded-xl bg-[#141926] border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-pulse">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-100">
                {t.mockTest.evaluatingTitle}
              </h3>
              <p className="text-xs text-zinc-400 max-w-md font-sans">
                {t.mockTest.evaluatingDesc}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
