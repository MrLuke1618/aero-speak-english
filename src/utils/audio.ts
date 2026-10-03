/**
 * Audio helpers for AeroSpeak AI
 * - Gemini TTS playback (WAV base64)
 * - Browser Web Speech Recognition
 * - Mic Audio recording & playback for user self-monitoring
 */

class SoundManager {
  private currentAudio: HTMLAudioElement | null = null;

  public playBase64Wav(base64: string, onEnded?: () => void): HTMLAudioElement {
    this.stop();
    const audioSrc = `data:audio/wav;base64,${base64}`;
    const audio = new Audio(audioSrc);
    this.currentAudio = audio;
    if (onEnded) {
      audio.onended = () => {
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        onEnded();
      };
    }
    audio.play().catch((err) => {
      console.warn('Audio play error (user gesture might be required):', err);
    });
    return audio;
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  public isPlaying(): boolean {
    return !!this.currentAudio && !this.currentAudio.paused;
  }
}

export const soundManager = new SoundManager();

export async function requestTTS(text: string, voice = 'Kore'): Promise<string | null> {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice }),
    });
    if (!res.ok) {
      throw new Error(`TTS failed with status ${res.status}`);
    }
    const data = await res.json();
    return data.audioBase64 || null;
  } catch (err) {
    console.error('Failed to fetch TTS:', err);
    return null;
  }
}

// Browser Web Speech API helper
export interface SpeechRecognitionResultState {
  transcript: string;
  isListening: boolean;
  error?: string;
}

export function createSpeechRecognizer(
  onResult: (text: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void
) {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcriptPiece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcriptPiece;
      } else {
        interimTranscript += transcriptPiece;
      }
    }

    if (finalTranscript) {
      onResult(finalTranscript, true);
    } else if (interimTranscript) {
      onResult(interimTranscript, false);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error event:', event.error);
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
}
