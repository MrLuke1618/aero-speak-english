export type AppLanguage = 'en' | 'vi';

export type MainMode =
  | 'mode1_daily'
  | 'mode2_pro'
  | 'mode3_mock'
  | 'mode4_guide';

export type SubMode =
  // Mode 1
  | 'coffee_chat'
  | 'travel_survival'
  | 'opinion_builder'
  // Mode 2
  | 'ielts_part1'
  | 'ielts_part2'
  | 'ielts_part3'
  | 'job_interview'
  | 'business_pitch'
  // Mode 3
  | 'full_ielts_mock'
  | 'strict_job_interview'
  // Mode 4
  | 'app_guide'
  | 'scoring_criteria'
  | 'study_plan'
  | 'anxiety_tips';

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: number;
  audioBase64?: string;
  userAudioUrl?: string;
  evaluation?: EvaluationReport;
  modeAtTime?: MainMode;
  subModeAtTime?: SubMode;
}

export interface DynamicTopic {
  title: string;
  context: string;
  questions: string[];
  cueCard?: {
    topic: string;
    prompts: string[];
    prepTimeSeconds?: number;
    speakTimeSeconds?: number;
  };
  suggestedKeyWords: string[];
}

export interface LexicalUpgrade {
  originalWord: string;
  upgradeWord: string;
  explanation: string;
}

export interface GrammarCorrection {
  originalSentence: string;
  correctedSentence: string;
  explanation: string;
}

export interface EvaluationReport {
  estimatedBand: string;
  overallComment: string;
  fluencyAndCoherence: {
    rating?: string;
    analysis: string;
    speedAndPauses?: string;
    cohesiveDevices?: string;
  };
  lexicalResource: {
    rating?: string;
    analysis: string;
    upgrades: LexicalUpgrade[];
  };
  grammaticalAccuracy: {
    rating?: string;
    analysis: string;
    corrections: GrammarCorrection[];
  };
  pronunciationAndIntonation: {
    rating?: string;
    stressAndIntonation: string;
    connectedSpeechTip: string;
    wordsToPractice?: string[];
  };
  modelAnswers: string[];
  mentorSummary: string;
}

export interface UserSettings {
  language: AppLanguage;
  targetBand: string;
  autoPlayAudio: boolean;
  voice: 'Kore' | 'Puck' | 'Zephyr' | 'Fenrir' | 'Charon';
  speechRate: number;
  model: 'gemini-flash-latest' | 'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview';
  customApiKey?: string;
  isProUnlocked?: boolean;
}
