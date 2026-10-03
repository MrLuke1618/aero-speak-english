import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { getInstantCuratedTopic } from './src/curatedTopics';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Helper to remove any AI-like markdown artifacts such as ** or ###
function cleanText(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/\*\*/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/(^|\n)\*\s+/g, '$1• ')
    .trim();
}

function deepClean(obj: any): any {
  if (typeof obj === 'string') {
    return cleanText(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClean(item));
  }
  if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {};
    for (const key of Object.keys(obj)) {
      cleaned[key] = deepClean(obj[key]);
    }
    return cleaned;
  }
  return obj;
}

// Approved Google GenAI 3.5+ models & official auto-updating aliases
const VALID_TEXT_MODELS = [
  'gemini-flash-latest', // Google's official alias auto-tracking newest Gemini Flash
  'gemini-3.1-flash-lite', // Ultra-fast, zero spike 3.5+ model
  'gemini-3.8-flash',    // Flagship Gemini 3.8 Flash (>= 3.5)
  'gemini-3.1-pro-preview', // Flagship Pro Reasoning model for advanced users
];

function resolveGeminiTextModel(requestedModel?: string): string {
  if (requestedModel && VALID_TEXT_MODELS.includes(requestedModel)) {
    return requestedModel;
  }
  return process.env.GEMINI_TEXT_MODEL || 'gemini-flash-latest';
}

function resolveGeminiTTSModel(requestedModel?: string): string {
  if (requestedModel === 'gemini-3.8-flash-tts' || requestedModel === 'gemini-3.8-flash-lite-tts') {
    return requestedModel;
  }
  return process.env.GEMINI_TTS_MODEL || 'gemini-3.8-flash-lite-tts';
}

// Helper to instantiate client with optional custom user key or default server key
function getAIClient(customApiKey?: string) {
  const key = (customApiKey && typeof customApiKey === 'string' && customApiKey.trim().length > 10)
    ? customApiKey.trim()
    : process.env.GEMINI_API_KEY;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Multi-tier model runner with automatic fallback on 503 (high demand) or 429
async function generateWithModelFallback(requestedModel: string, payload: any, customApiKey?: string) {
  const client = getAIClient(customApiKey);
  const modelsToTry = [
    requestedModel,
    'gemini-flash-latest',
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
  ].filter((m, i, arr) => Boolean(m) && arr.indexOf(m) === i);

  let lastError: any = null;
  for (const model of modelsToTry) {
    try {
      const response = await client.models.generateContent({
        ...payload,
        model,
      });
      return { response, usedModel: model };
    } catch (err: any) {
      console.warn(`[AeroSpeak Model Runner] Model ${model} temporary demand spike (${err?.status || err?.message}). Switching to available candidate...`);
      lastError = err;
    }
  }
  throw lastError;
}

const SYSTEM_PROMPT = `
You are "AeroSpeak AI", an elite, empathetic, and expert AI English Speaking Examiner, Senior IELTS Coach, and Bilingual Mentor (fluent in English and Vietnamese).
Your mission is to deliver an immersive, highly personalized speaking practice, everyday fluency booster, and mock test experience.

Core Persona & Rules:
1. Tone & Empathy: Encouraging, professional, warm, and highly constructive. Always act as a supportive human mentor who builds user confidence while maintaining international evaluation standards (IELTS / CEFR).
2. Bilingual Intelligence: Seamlessly adapt to user language. Use natural Vietnamese to explain complex grammar rules, exam tactics, scoring criteria, or app features, and switch to natural native English during speaking simulations.
3. Dynamic Content Engine: Never reuse identical questions or hardcoded templates. Always generate original, contextual speaking questions tailored to the active mode and topic.
4. Clean & Natural Output: Absolutely avoid AI-like markdown syntax such as asterisks (**word** or *word*), robotic tags, or machine-like symbols. Write in clean, natural human text. Never wrap words in double asterisks.

Operational Modes:
- Mode 1: Daily English & Fluency Booster (Luyện tập hàng ngày)
  * Coffee Chat / Daily Chitchat: Friendly discussion on daily life, hobbies, current events.
  * Travel Survival & Socializing: Roleplay real-life situations (restaurant order, airport customs, asking directions, making international friends).
  * Opinion Builder (1-Minute Talk): Provide thought-provoking prompts to speak for 60 seconds without translating in their head.
- Mode 2: Professional & Career Simulation (Luyện thi & Phỏng vấn)
  * IELTS Speaking (Part 1, 2, 3): Professional examiner cadence, deeper follow-up questions to test critical thinking.
  * Job Interview: Behavioral STAR questions, tech/management/general scenarios, deep probing.
  * Business Pitch / Meeting: Professional presentations, executive discussions.
- Mode 3: Real Exam Simulation (Strict Mock Test - Thi thử như thật)
  * Unbiased, formal examiner. Do not interrupt or praise excessively during the test. Ask official-style questions sequentially.
- Mode 4: Bilingual Feature Guide & Support (Trợ lý hướng dẫn)
  * Guide users on how to practice, explain IELTS/CEFR bands, overcoming speaking anxiety, customized study schedules in English & Vietnamese.
`;

// Endpoint to validate a custom Gemini API key
app.post('/api/validate-key', async (req, res) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 15) {
      return res.status(400).json({ valid: false, error: 'API key format is invalid. Key should start with AIzaSy...' });
    }
    const testClient = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
    // Test a lightweight ping to verify credentials
    const response = await testClient.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: 'Ping',
    });
    if (response && response.text) {
      return res.json({ valid: true, message: 'API key is valid and active!' });
    }
    return res.status(400).json({ valid: false, error: 'Could not verify API key with Google Gemini service.' });
  } catch (error: any) {
    console.error('Validate key error:', error);
    return res.status(400).json({ valid: false, error: error?.message || 'Invalid Gemini API key.' });
  }
});

// Chat endpoint for conversational speaking turns
app.post('/api/chat', async (req, res) => {
  try {
    const {
      mode = 'mode1_daily',
      subMode = 'coffee_chat',
      messages = [],
      language = 'en',
      targetBand = '7.0',
      activeTopic = '',
    } = req.body;

    const customApiKey = (req.headers['x-gemini-api-key'] as string) || req.body?.apiKey;

    const formattedHistory = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const languageInstruction =
      language === 'vi'
        ? `QUY TẮC NGÔN NGỮ TUYỆT ĐỐI (TIẾNG VIỆT):
Toàn bộ lời thoại, lời giải thích, câu hướng dẫn, phản hồi phải 100% bằng TIẾNG VIỆT tự nhiên, trang nhã.
Khi đặt câu hỏi luyện nói tiếng Anh cho người dùng, hãy đưa câu hỏi tiếng Anh kèm lời gợi ý bằng tiếng Việt.
TUYỆT ĐỐI KHÔNG pha trộn nửa Anh nửa Việt lộn xộn trong câu văn giải thích.`
        : `ABSOLUTE LANGUAGE RULE (100% ENGLISH ONLY):
The user has selected ENGLISH mode. You MUST think, speak, and respond 100% EXCLUSIVELY in natural, professional English.
Do NOT use ANY Vietnamese words, phrases, or translations anywhere in your response.
Act as an elite native English speaking examiner and coach.`;

    const modeInstructions = `
Active Language Setting: ${language}
${languageInstruction}

Current Active Mode: ${mode} (Sub-mode: ${subMode})
Active Topic Context: ${activeTopic || 'General speaking context'}
User Target Score / Goal: ${targetBand}

Guidelines for this turn:
- Keep the response conversational, under 120 words so the user gets ample time to speak next.
- Never output markdown asterisks (**) or robotic machine symbols.
- Always conclude with an engaging, clear question for the user to respond to.
`;

    const textModel = resolveGeminiTextModel(req.body.model);

    const { response } = await generateWithModelFallback(textModel, {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `System Directive: ${SYSTEM_PROMPT}\n\nContext for this session:\n${modeInstructions}\n\nChat history:\n${JSON.stringify(
                formattedHistory
              )}\n\nPlease respond naturally as AeroSpeak AI in the required language:`,
            },
          ],
        },
      ],
    }, customApiKey);

    const reply = cleanText(response.text || '');
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Failed to process chat response' });
  }
});

// Comprehensive Evaluation Endpoint
app.post('/api/evaluate', async (req, res) => {
  try {
    const {
      speechText,
      topic,
      mode = 'mode2_pro',
      targetBand = '7.0',
      language = 'en',
    } = req.body;

    if (!speechText || speechText.trim().length === 0) {
      return res.status(400).json({ error: 'Speech text is required for evaluation.' });
    }

    const languageDirective =
      language === 'vi'
        ? `QUY TẮC NGÔN NGỮ: Toàn bộ các trường đánh giá (nhận xét tổng quan, phân tích độ lưu loát, giải thích từ vựng nâng cấp, giải thích lỗi ngữ pháp, phát âm và tóm tắt lời khuyên của mentor) PHẢI được viết 100% bằng TIẾNG VIỆT rõ ràng, dễ hiểu. Không dùng tiếng Anh cho phần nhận xét (chỉ dùng tiếng Anh cho ví dụ trích dẫn và câu trả lời mẫu).`
        : `LANGUAGE DIRECTIVE: The app is in ENGLISH mode. All evaluation sections, overall comments, fluency analysis, vocabulary explanations, grammar explanations, pronunciation notes, and mentor takeaway MUST be written 100% EXCLUSIVELY in ENGLISH. Do NOT include any Vietnamese words or translations.`;

    const prompt = `
You are AeroSpeak AI, acting as a Senior British Council / IDP IELTS Examiner and speech coach.
Evaluate this user's English speech according to official IELTS / CEFR speaking assessment criteria:
1. Fluency & Coherence
2. Lexical Resource (Vocabulary)
3. Grammatical Range & Accuracy
4. Pronunciation & Intonation

${languageDirective}

User's response transcript:
"${speechText}"

Topic / Question given:
"${topic || 'General Speaking Turn'}"

User Target Band: ${targetBand}
Mode: ${mode}

IMPORTANT:
- Absolutely NO markdown asterisks (**) or header hashtags (###).
- High quality model answers.
`;

    const customApiKey = (req.headers['x-gemini-api-key'] as string) || req.body?.apiKey;
    const textModel = resolveGeminiTextModel(req.body.model);

    const { response } = await generateWithModelFallback(textModel, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedBand: {
              type: Type.STRING,
              description: 'e.g. Band 7.0 - Good User (CEFR C1)',
            },
            overallComment: {
              type: Type.STRING,
              description: 'Constructive general assessment written in the selected language',
            },
            fluencyAndCoherence: {
              type: Type.OBJECT,
              properties: {
                rating: { type: Type.STRING },
                analysis: { type: Type.STRING },
                speedAndPauses: { type: Type.STRING },
                cohesiveDevices: { type: Type.STRING },
              },
              required: ['analysis'],
            },
            lexicalResource: {
              type: Type.OBJECT,
              properties: {
                rating: { type: Type.STRING },
                analysis: { type: Type.STRING },
                upgrades: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      originalWord: { type: Type.STRING },
                      upgradeWord: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                    },
                    required: ['originalWord', 'upgradeWord', 'explanation'],
                  },
                },
              },
              required: ['analysis', 'upgrades'],
            },
            grammaticalAccuracy: {
              type: Type.OBJECT,
              properties: {
                rating: { type: Type.STRING },
                analysis: { type: Type.STRING },
                corrections: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      originalSentence: { type: Type.STRING },
                      correctedSentence: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                    },
                    required: ['originalSentence', 'correctedSentence', 'explanation'],
                  },
                },
              },
              required: ['analysis', 'corrections'],
            },
            pronunciationAndIntonation: {
              type: Type.OBJECT,
              properties: {
                rating: { type: Type.STRING },
                stressAndIntonation: { type: Type.STRING },
                connectedSpeechTip: { type: Type.STRING },
                wordsToPractice: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['stressAndIntonation', 'connectedSpeechTip'],
            },
            modelAnswers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '1 or 2 high-band native model answers in English',
            },
            mentorSummary: {
              type: Type.STRING,
              description: 'Clear, actionable examiner recap strictly in the selected language',
            },
          },
          required: [
            'estimatedBand',
            'overallComment',
            'fluencyAndCoherence',
            'lexicalResource',
            'grammaticalAccuracy',
            'pronunciationAndIntonation',
            'modelAnswers',
            'mentorSummary',
          ],
        },
      },
    }, customApiKey);

    const parsed = deepClean(JSON.parse(response.text || '{}'));
    res.json(parsed);
  } catch (error: any) {
    console.error('Evaluate error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate evaluation report' });
  }
});

// Dynamic Topic Generator endpoint (No hardcoding)
app.post('/api/generate-topic', async (req, res) => {
  try {
    const { mode, subMode, language = 'en', userInterests } = req.body;

    const languageInstruction =
      language === 'vi'
        ? 'Viết tiêu đề (title) và bối cảnh (context) bằng TIẾNG VIỆT. Các câu hỏi luyện tập (questions) là câu hỏi tiếng Anh kèm giải thích tiếng Việt ngắn gọn.'
        : 'Write the title, context, questions, and all prompts 100% EXCLUSIVELY in ENGLISH. Do NOT include any Vietnamese text.';

    const prompt = `
Generate a fresh, original, engaging practice topic and starter questions for English speaking practice.
Target Mode: ${mode}
Sub-mode: ${subMode}
Optional user interest/focus: ${userInterests || 'General life, work, culture, personal experiences'}

LANGUAGE REQUIREMENT:
${languageInstruction}

IMPORTANT: Do NOT use markdown asterisks (**) anywhere in the output. Use clean text.

Return dynamic content in JSON:
- title: string (Engaging topic title in the requested language)
- context: string (Brief setup or roleplay scenario in the requested language)
- questions: array of 3-4 progressive questions
- cueCard: (optional if subMode is ielts_p2): { topic: string, prompts: string[], prepTimeSeconds: number, speakTimeSeconds: number }
- suggestedKeyWords: array of 4-5 high-level collocations or idioms suitable for this topic
`;

    const customApiKey = (req.headers['x-gemini-api-key'] as string) || req.body?.apiKey;
    const textModel = resolveGeminiTextModel(req.body.model);

    try {
      const { response } = await generateWithModelFallback(textModel, {
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              context: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              cueCard: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  prompts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  prepTimeSeconds: { type: Type.INTEGER },
                  speakTimeSeconds: { type: Type.INTEGER },
                },
              },
              suggestedKeyWords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['title', 'context', 'questions', 'suggestedKeyWords'],
          },
        },
      }, customApiKey);

      const data = deepClean(JSON.parse(response.text || '{}'));
      return res.json(data);
    } catch (genError: any) {
      console.warn('[AeroSpeak Instant Fallback] Demand spike or API latency on model:', genError?.message);
      // Immediately serve curated topic so the user gets instant results with zero delay or 503 error
      const instantTopic = getInstantCuratedTopic(mode, subMode, language === 'vi' ? 'vi' : 'en');
      return res.json(instantTopic);
    }
  } catch (error: any) {
    console.error('Generate topic fatal error:', error);
    const instantTopic = getInstantCuratedTopic(req.body?.mode || 'mode1_daily', req.body?.subMode || 'coffee_chat', req.body?.language === 'vi' ? 'vi' : 'en');
    res.json(instantTopic);
  }
});

// Text-to-Speech Endpoint with gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore', style = 'Warm, natural English speaking coach', ttsModel } = req.body;
    const customApiKey = (req.headers['x-gemini-api-key'] as string) || req.body?.apiKey;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    // Limit text to avoid excessively large payloads and clean any markdown
    const trimmedText = cleanText(text).slice(0, 800);
    const model = resolveGeminiTTSModel(ttsModel);
    const client = getAIClient(customApiKey);

    const response = await client.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: trimmedText,
              speechMetadata: {
                style,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }, // 'Kore', 'Puck', 'Zephyr', 'Fenrir', 'Charon'
          },
        },
      },
    });

    const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioBase64) {
      return res.status(500).json({ error: 'No audio returned from Gemini TTS' });
    }

    res.json({
      audioBase64,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    console.error('TTS error:', error);
    res.status(500).json({ error: error.message || 'Failed to synthesize speech' });
  }
});

// Model Info Endpoint
app.get('/api/model-info', (req, res) => {
  res.json({
    defaultTextModel: resolveGeminiTextModel(),
    defaultTTSModel: resolveGeminiTTSModel(),
    supportedModels: VALID_TEXT_MODELS,
    status: 'Google Gemini 3.5+ & Latest Auto-Tracking Enabled',
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AeroSpeak AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
