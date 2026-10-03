import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopicCard } from './components/TopicCard';
import { ChatArea } from './components/ChatArea';
import { VoiceInputBar } from './components/VoiceInputBar';
import { EvaluationModal } from './components/EvaluationModal';
import { MockTestModal } from './components/MockTestModal';
import { GuideModal } from './components/GuideModal';
import {
  AppLanguage,
  ChatMessage,
  DynamicTopic,
  EvaluationReport,
  MainMode,
  SubMode,
  UserSettings,
} from './types';
import { requestTTS, soundManager } from './utils/audio';
import { cleanAiArtifacts } from './utils/textFormatter';
import { translations } from './translations';
import { getInstantCuratedTopic } from './curatedTopics';

export default function App() {
  const [currentMode, setCurrentMode] = useState<MainMode>('mode1_daily');
  const [currentSubMode, setCurrentSubMode] = useState<SubMode>('coffee_chat');

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('aerospeak_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          language: parsed.language || 'en',
          targetBand: parsed.targetBand || '7.0',
          autoPlayAudio: parsed.autoPlayAudio ?? true,
          voice: parsed.voice || 'Kore',
          speechRate: parsed.speechRate || 1.0,
          model: parsed.model || 'gemini-flash-latest',
        };
      } catch (e) {}
    }
    return {
      language: 'en',
      targetBand: '7.0',
      autoPlayAudio: true,
      voice: 'Kore',
      speechRate: 1.0,
      model: 'gemini-flash-latest',
    };
  });

  const t = translations[settings.language];

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'greeting_msg',
      role: 'assistant',
      content: translations[settings.language].chat.initialGreeting,
      timestamp: Date.now(),
    },
  ]);

  const [topic, setTopic] = useState<DynamicTopic>(() =>
    getInstantCuratedTopic('mode1_daily', 'coffee_chat', settings.language)
  );
  const [isLoadingTopic, setIsLoadingTopic] = useState<boolean>(false);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);

  // Evaluation modal state
  const [activeEvaluation, setActiveEvaluation] = useState<EvaluationReport | null>(null);
  const [evaluatedSpeechText, setEvaluatedSpeechText] = useState<string>('');

  // Modals for Mock Test & Guide
  const [showMockTestModal, setShowMockTestModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [guideModalTab, setGuideModalTab] = useState<'features' | 'rubric' | 'plan' | 'anxiety' | 'apiKey'>('features');

  // Save settings
  const handleUpdateSettings = (newPartial: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newPartial };
      localStorage.setItem('aerospeak_settings', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle Language Handler
  const handleToggleLanguage = (newLang: AppLanguage) => {
    if (settings.language === newLang) return;

    handleUpdateSettings({ language: newLang });

    // Update greeting if it's the only message or initial turn
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 'greeting_msg',
            role: 'assistant',
            content: translations[newLang].chat.initialGreeting,
            timestamp: Date.now(),
          },
        ];
      }
      return prev;
    });

    // Re-fetch topic in the newly selected language
    fetchTopic(currentMode, currentSubMode, newLang);
  };

  // Fetch dynamic topic from server
  const fetchTopic = async (mode: MainMode, subMode: SubMode, lang = settings.language) => {
    setIsLoadingTopic(true);
    try {
      const res = await fetch('/api/generate-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, subMode, language: lang, model: settings.model }),
      });
      if (res.ok) {
        const data = await res.json();
        setTopic(data);
      } else {
        setTopic(getInstantCuratedTopic(mode, subMode, lang));
      }
    } catch (err) {
      console.warn('Network issue fetching topic, using instant bank:', err);
      setTopic(getInstantCuratedTopic(mode, subMode, lang));
    } finally {
      setIsLoadingTopic(false);
    }
  };

  // Initial topic load and when subMode changes
  useEffect(() => {
    if (currentMode !== 'mode4_guide') {
      fetchTopic(currentMode, currentSubMode, settings.language);
    }
  }, [currentMode, currentSubMode]);

  // Mode Selection handler
  const handleSelectMode = (mode: MainMode) => {
    setCurrentMode(mode);
    if (mode === 'mode1_daily') {
      setCurrentSubMode('coffee_chat');
    } else if (mode === 'mode2_pro') {
      setCurrentSubMode('ielts_part1');
    } else if (mode === 'mode3_mock') {
      setShowMockTestModal(true);
    } else if (mode === 'mode4_guide') {
      setShowGuideModal(true);
    }
  };

  // SubMode selection
  const handleSelectSubMode = (sub: SubMode) => {
    setCurrentSubMode(sub);
  };

  // Sending message turn
  const handleSendMessage = async (text: string, userAudioBlob?: Blob) => {
    const userAudioUrl = userAudioBlob ? URL.createObjectURL(userAudioBlob) : undefined;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      userAudioUrl,
      modeAtTime: currentMode,
      subModeAtTime: currentSubMode,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: currentMode,
          subMode: currentSubMode,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          language: settings.language,
          targetBand: settings.targetBand,
          model: settings.model,
          activeTopic: topic ? `${topic.title}: ${topic.context}` : '',
        }),
      });

      if (!res.ok) {
        throw new Error('Chat response failed');
      }

      const data = await res.json();
      const rawReply = data.reply || (settings.language === 'vi' ? 'Tôi chưa nghe rõ. Bạn có thể diễn đạt lại không?' : "I didn't catch that. Could you try rephrasing?");
      const replyText = cleanAiArtifacts(rawReply);

      let audioBase64: string | undefined;

      // Auto-play TTS if enabled
      if (settings.autoPlayAudio) {
        const audio = await requestTTS(replyText, settings.voice);
        if (audio) {
          audioBase64 = audio;
          soundManager.playBase64Wav(audio);
        }
      }

      const assistantMessage: ChatMessage = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: Date.now(),
        audioBase64,
        modeAtTime: currentMode,
        subModeAtTime: currentSubMode,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: t.chat.connectionError,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Evaluate speech turn
  const handleEvaluateSpeech = async (speechText: string) => {
    setIsLoadingChat(true);
    setEvaluatedSpeechText(speechText);

    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          speechText,
          topic: topic?.title || 'Speaking Turn',
          mode: currentMode,
          targetBand: settings.targetBand,
          language: settings.language,
          model: settings.model,
        }),
      });

      if (!res.ok) {
        throw new Error('Evaluation request failed');
      }

      const report: EvaluationReport = await res.json();
      setActiveEvaluation(report);
    } catch (err) {
      console.error('Failed to evaluate:', err);
      alert(settings.language === 'vi' ? 'Không thể thực hiện đánh giá lúc này. Vui lòng thử lại.' : 'Failed to evaluate at this time. Please try again.');
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Mock test completion handler
  const handleMockTestFinished = (report: EvaluationReport, fullTranscript: string) => {
    setShowMockTestModal(false);
    setEvaluatedSpeechText(fullTranscript);
    setActiveEvaluation(report);

    const summaryMsg: ChatMessage = {
      id: `mock_res_${Date.now()}`,
      role: 'assistant',
      content: `${t.mockTest.testFinishedSummary}\n\n• ${t.evaluation.estimatedBand}: ${cleanAiArtifacts(report.estimatedBand)}\n• ${t.evaluation.overallComment} "${cleanAiArtifacts(report.overallComment)}"`,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, summaryMsg]);
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Top Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenMockTestModal={() => setShowMockTestModal(true)}
        onOpenGuideModal={(tab) => {
          setGuideModalTab(tab || 'features');
          setShowGuideModal(true);
        }}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Left Column: Dynamic Topic & Context Panel */}
        <section className="w-full lg:w-96 xl:w-[420px] flex flex-col shrink-0">
          <TopicCard
            currentMode={currentMode}
            currentSubMode={currentSubMode}
            onSelectSubMode={handleSelectSubMode}
            topic={topic}
            isLoadingTopic={isLoadingTopic}
            onGenerateNewTopic={() => fetchTopic(currentMode, currentSubMode, settings.language)}
            onQuickStartPrompt={(q) => handleSendMessage(q)}
            language={settings.language}
          />
        </section>

        {/* Right Column: Interactive Chat & Voice Interaction Area */}
        <section className="flex-1 flex flex-col bg-[#10141f] border border-[#1f2638] rounded-xl overflow-hidden shadow-2xl">
          <ChatArea
            messages={messages}
            isLoading={isLoadingChat}
            onEvaluateTurn={handleEvaluateSpeech}
            onQuickPrompt={(p) => handleSendMessage(p)}
            voiceName={settings.voice}
            language={settings.language}
          />

          <VoiceInputBar
            onSendMessage={handleSendMessage}
            onEvaluateDirectly={handleEvaluateSpeech}
            disabled={isLoadingChat}
            language={settings.language}
          />
        </section>
      </main>

      {/* Evaluation Report Modal */}
      {activeEvaluation && (
        <EvaluationModal
          evaluation={activeEvaluation}
          userSpeech={evaluatedSpeechText}
          topic={topic?.title}
          onClose={() => setActiveEvaluation(null)}
          voiceName={settings.voice}
          language={settings.language}
        />
      )}

      {/* Mode 3: Strict Mock Test Modal */}
      {showMockTestModal && (
        <MockTestModal
          onClose={() => setShowMockTestModal(false)}
          onFinishEvaluation={handleMockTestFinished}
          voiceName={settings.voice}
          language={settings.language}
          model={settings.model}
        />
      )}

      {/* Mode 4: Feature Guide Modal */}
      {showGuideModal && (
        <GuideModal
          onClose={() => setShowGuideModal(false)}
          onAskMentor={(q) => {
            setShowGuideModal(false);
            handleSendMessage(q);
          }}
          language={settings.language}
          initialTab={guideModalTab}
        />
      )}
    </div>
  );
}
