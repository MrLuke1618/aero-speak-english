import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Send,
  Square,
  AlertCircle,
  Headphones,
  Target,
  AudioLines,
} from 'lucide-react';
import { AppLanguage } from '../types';
import { createSpeechRecognizer } from '../utils/audio';
import { translations } from '../translations';

interface VoiceInputBarProps {
  onSendMessage: (text: string, userAudioBlob?: Blob) => void;
  onEvaluateDirectly: (text: string) => void;
  disabled?: boolean;
  language: AppLanguage;
}

export const VoiceInputBar: React.FC<VoiceInputBarProps> = ({
  onSendMessage,
  onEvaluateDirectly,
  disabled = false,
  language,
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);

  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const recordedBlobRef = useRef<Blob | null>(null);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  const t = translations[language];

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const startRecording = async () => {
    setMicError(null);
    setInterimTranscript('');
    setRecordedAudioUrl(null);
    recordedBlobRef.current = null;
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        recordedBlobRef.current = audioBlob;
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
    } catch (err: any) {
      console.warn('Microphone stream error:', err);
      setMicError(t.voiceInput.micPermissionError);
    }

    const recognizer = createSpeechRecognizer(
      (text: string, isFinal: boolean) => {
        if (isFinal) {
          setInputText((prev) => (prev ? `${prev.trim()} ${text.trim()}` : text.trim()));
          setInterimTranscript('');
        } else {
          setInterimTranscript(text);
        }
      },
      (error: string) => {
        console.warn('SpeechRecognition error:', error);
        if (error === 'not-allowed') {
          setMicError(t.voiceInput.micPermissionError);
        }
      },
      () => {}
    );

    if (recognizer) {
      recognitionRef.current = recognizer;
      try {
        recognizer.start();
      } catch (e) {
        console.warn('Failed to start recognizer:', e);
      }
    } else {
      setMicError(t.voiceInput.micNotSupported);
    }

    setIsRecording(true);
    setRecordingSeconds(0);
    timerIntervalRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isRecording) {
      stopRecording();
    }

    const fullText = (inputText + ' ' + interimTranscript).trim();
    if (!fullText) return;

    onSendMessage(fullText, recordedBlobRef.current || undefined);
    setInputText('');
    setInterimTranscript('');
    setRecordedAudioUrl(null);
    recordedBlobRef.current = null;
  };

  const handleEvaluateClick = () => {
    if (isRecording) {
      stopRecording();
    }
    const fullText = (inputText + ' ' + interimTranscript).trim();
    if (!fullText) return;

    onEvaluateDirectly(fullText);
  };

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const remainder = s % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="bg-[#0d1017] border-t border-[#1f2536] p-3 sm:p-4 space-y-2.5">
      {micError && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#191d29] border border-[#262c3e] text-zinc-300 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{micError}</span>
        </div>
      )}

      {isRecording && (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1a141b] border border-rose-500/40 text-xs text-rose-300 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="font-semibold">
              {t.voiceInput.micActive} ({formatSecs(recordingSeconds)})
            </span>
          </div>
          <span className="text-zinc-400 hidden sm:inline">
            {t.voiceInput.micEncourage}
          </span>
        </div>
      )}

      {interimTranscript && (
        <div className="px-3 py-1.5 rounded-lg bg-[#121622] border border-emerald-500/30 text-xs text-emerald-300 italic font-mono">
          <span className="text-zinc-400">{t.voiceInput.listeningInterim} </span>
          "{interimTranscript}"
        </div>
      )}

      {recordedAudioUrl && !isRecording && (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#131722] border border-[#20273a] text-xs text-zinc-300">
          <div className="flex items-center gap-2 font-mono">
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>{t.voiceInput.listenRecordedAudio}</span>
          </div>
          <audio controls src={recordedAudioUrl} className="h-7 w-48 sm:w-64" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled}
          title={isRecording ? 'Stop' : 'Start Mic'}
          className={`p-3 rounded-lg flex items-center justify-center transition-all shrink-0 ${
            isRecording
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
          } disabled:opacity-50`}
        >
          {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={
              isRecording ? t.voiceInput.placeholderActive : t.voiceInput.placeholderIdle
            }
            disabled={disabled}
            className="w-full bg-[#121622] border border-[#1f2638] rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 font-sans"
          />
        </div>

        {inputText.trim().length > 5 && (
          <button
            type="button"
            onClick={handleEvaluateClick}
            disabled={disabled}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#161c2b] hover:bg-[#1e263a] text-emerald-400 border border-[#232c40] text-xs font-mono font-semibold transition-colors shrink-0"
          >
            <Target className="w-3.5 h-3.5" />
            <span>{t.voiceInput.evaluateNow}</span>
          </button>
        )}

        <button
          type="submit"
          disabled={disabled || (!inputText.trim() && !interimTranscript.trim())}
          className="p-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all disabled:opacity-40 shrink-0"
          title={t.voiceInput.send}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 px-1">
        <span>{t.voiceInput.shortcutHint}</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-emerald-500/60">
          <AudioLines className="w-3.5 h-3.5" /> AeroSpeak Neural Voice Engine
        </span>
      </div>
    </div>
  );
};
