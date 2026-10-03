import React, { useState } from 'react';
import {
  AudioLines,
  Flame,
  GraduationCap,
  Target,
  Compass,
  Languages,
  Volume2,
  VolumeX,
  Settings,
  Key,
} from 'lucide-react';
import { AppLanguage, MainMode, UserSettings } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  currentMode: MainMode;
  onSelectMode: (mode: MainMode) => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onOpenMockTestModal: () => void;
  onOpenGuideModal: (tab?: any) => void;
  onOpenApiKeyModal: () => void;
  onToggleLanguage: (lang: AppLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  settings,
  onUpdateSettings,
  onOpenMockTestModal,
  onOpenGuideModal,
  onOpenApiKeyModal,
  onToggleLanguage,
}) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const t = translations[settings.language];

  return (
    <header className="sticky top-0 z-40 bg-[#0d1017] border-b border-[#1f2536] text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Identity with AudioLines & Tactical badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500 text-zinc-950 font-bold shadow-sm shadow-emerald-500/20">
              <AudioLines className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-wider uppercase text-zinc-100 font-mono">
                  {t.appName}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-0.5 bg-emerald-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {t.coachTitle}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden md:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Unified Gaming HUD Navigation Bar */}
          <nav className="hidden lg:flex items-center bg-[#131722] rounded-lg p-1 border border-[#202638] text-xs">
            <button
              onClick={() => onSelectMode('mode1_daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                currentMode === 'mode1_daily'
                  ? 'bg-emerald-500 text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white hover:bg-[#1a2030]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{t.modes.mode1_daily.title}</span>
            </button>

            <button
              onClick={() => onSelectMode('mode2_pro')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                currentMode === 'mode2_pro'
                  ? 'bg-emerald-500 text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white hover:bg-[#1a2030]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.modes.mode2_pro.title}</span>
            </button>

            <button
              onClick={() => {
                onSelectMode('mode3_mock');
                onOpenMockTestModal();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                currentMode === 'mode3_mock'
                  ? 'bg-emerald-500 text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white hover:bg-[#1a2030]'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{t.modes.mode3_mock.title}</span>
            </button>

            <button
              onClick={() => {
                onSelectMode('mode4_guide');
                onOpenGuideModal();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                currentMode === 'mode4_guide'
                  ? 'bg-emerald-500 text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white hover:bg-[#1a2030]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.modes.mode4_guide.title}</span>
            </button>
          </nav>

          {/* Right Controls: Language Switcher, Band, Audio, Settings */}
          <div className="flex items-center gap-2">
            {/* Language Switcher with Languages icon */}
            <div className="flex items-center bg-[#131722] border border-[#202638] rounded-lg p-0.5 text-xs font-mono">
              <span className="pl-1.5 pr-0.5 text-zinc-500 hidden sm:inline">
                <Languages className="w-3.5 h-3.5 text-zinc-400" />
              </span>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  settings.language === 'en'
                    ? 'bg-emerald-500 text-zinc-950 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => onToggleLanguage('vi')}
                className={`px-2 py-1 rounded transition-colors ${
                  settings.language === 'vi'
                    ? 'bg-emerald-500 text-zinc-950 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Chuyển sang Tiếng Việt"
              >
                VI
              </button>
            </div>

            {/* Target Goal Selector with Target icon */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#131722] border border-[#202638] text-zinc-300 text-xs">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-zinc-400">{t.targetGoal}</span>
              <select
                value={settings.targetBand}
                onChange={(e) => onUpdateSettings({ targetBand: e.target.value })}
                className="bg-transparent border-none text-zinc-100 font-semibold focus:ring-0 cursor-pointer text-xs pr-1"
              >
                <option value="6.0" className="bg-[#131722] text-zinc-100">{t.targetOptions['6.0']}</option>
                <option value="6.5" className="bg-[#131722] text-zinc-100">{t.targetOptions['6.5']}</option>
                <option value="7.0" className="bg-[#131722] text-zinc-100">{t.targetOptions['7.0']}</option>
                <option value="7.5" className="bg-[#131722] text-zinc-100">{t.targetOptions['7.5']}</option>
                <option value="8.0+" className="bg-[#131722] text-zinc-100">{t.targetOptions['8.0+']}</option>
                <option value="Fluency" className="bg-[#131722] text-zinc-100">{t.targetOptions['Fluency']}</option>
              </select>
            </div>

            {/* API Key / Pro Unlock Button */}
            <button
              onClick={onOpenApiKeyModal}
              title={
                settings.customApiKey
                  ? settings.language === 'vi'
                    ? 'API Key cá nhân đang hoạt động (Pro)'
                    : 'Personal API Key Active (Pro)'
                  : settings.language === 'vi'
                  ? 'Nhập API Key cá nhân để mở khóa tính năng nâng cao'
                  : 'Input personal API Key to unlock advanced features'
              }
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors ${
                settings.customApiKey
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25 shadow-sm shadow-emerald-500/20'
                  : 'bg-[#141926] text-zinc-300 border-[#232c40] hover:border-emerald-500/40 hover:text-emerald-300'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">
                {settings.customApiKey ? 'PRO KEY' : 'API KEY'}
              </span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => onUpdateSettings({ autoPlayAudio: !settings.autoPlayAudio })}
              title={settings.autoPlayAudio ? `${t.autoPlayAudio}: ON` : `${t.autoPlayAudio}: OFF`}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                settings.autoPlayAudio
                  ? 'bg-[#182030] text-emerald-400 border-emerald-500/40'
                  : 'bg-[#131722] text-zinc-500 border-[#202638]'
              }`}
            >
              {settings.autoPlayAudio ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Settings dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="p-2 rounded-lg bg-[#131722] hover:bg-[#1a2030] text-zinc-300 border border-[#202638] transition-colors"
                title={t.voiceSettings}
              >
                <Settings className="w-4 h-4" />
              </button>

              {showSettingsDropdown && (
                <div className="absolute right-0 mt-2 w-72 p-3.5 bg-[#121622] border border-[#232a3e] rounded-xl shadow-2xl z-50 text-xs space-y-3 font-sans">
                  <div className="font-semibold text-zinc-200 border-b border-[#202638] pb-1.5 flex items-center justify-between">
                    <span>{t.voiceSettings}</span>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1 font-medium">{t.modelLabel}</label>
                    <select
                      value={settings.model}
                      onChange={(e) => onUpdateSettings({ model: e.target.value as any })}
                      className="w-full bg-[#182030] border border-[#263048] rounded-lg p-1.5 text-zinc-200 focus:border-emerald-500 font-mono text-[11px]"
                    >
                      <option value="gemini-flash-latest">{t.modelOptions.flashLatest}</option>
                      <option value="gemini-3.1-flash-lite">{t.modelOptions.flashLite31}</option>
                      <option value="gemini-3.8-flash">{t.modelOptions.flash38}</option>
                      {settings.customApiKey && (
                        <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Flagship Pro Reasoning)</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1 font-medium">{t.voiceLabel}</label>
                    <select
                      value={settings.voice}
                      onChange={(e) => onUpdateSettings({ voice: e.target.value as any })}
                      className="w-full bg-[#182030] border border-[#263048] rounded-lg p-1.5 text-zinc-200 focus:border-emerald-500"
                    >
                      <option value="Kore">Kore (British, Clear & Warm)</option>
                      <option value="Zephyr">Zephyr (Contemporary & Expressive)</option>
                      <option value="Puck">Puck (Natural & Confident)</option>
                      <option value="Fenrir">Fenrir (Deep & Articulate)</option>
                      <option value="Charon">Charon (Formal & Objective)</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-[#202638] flex items-center justify-between">
                    <span className="text-zinc-400">{t.languageToggle}</span>
                    <span className="font-mono font-bold text-emerald-400 uppercase">
                      {settings.language}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setShowSettingsDropdown(false);
                      onOpenApiKeyModal();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded text-emerald-300 font-mono text-[11px] border border-emerald-500/40 transition-colors font-semibold"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>
                      {settings.language === 'vi'
                        ? settings.customApiKey
                          ? 'Quản lý API Key cá nhân (PRO)'
                          : 'Nhập API Key để mở khóa PRO'
                        : settings.customApiKey
                        ? 'Manage Personal API Key (PRO)'
                        : 'Enter API Key to Unlock PRO'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowSettingsDropdown(false);
                      onOpenGuideModal('apiKey');
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#182030] hover:bg-[#202b40] rounded text-emerald-400 font-mono text-[11px] border border-emerald-500/30 transition-colors"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>{t.guide.tabs.apiKey}</span>
                  </button>

                  <button
                    onClick={() => setShowSettingsDropdown(false)}
                    className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 rounded text-zinc-950 font-bold transition-colors"
                  >
                    {t.close}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden items-center justify-between gap-1 mt-2.5 pt-2 border-t border-[#1f2536] overflow-x-auto text-xs">
          <button
            onClick={() => onSelectMode('mode1_daily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentMode === 'mode1_daily'
                ? 'bg-emerald-500 text-zinc-950 font-bold'
                : 'text-zinc-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{t.modes.mode1_daily.title}</span>
          </button>

          <button
            onClick={() => onSelectMode('mode2_pro')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentMode === 'mode2_pro'
                ? 'bg-emerald-500 text-zinc-950 font-bold'
                : 'text-zinc-400'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.modes.mode2_pro.title}</span>
          </button>

          <button
            onClick={() => {
              onSelectMode('mode3_mock');
              onOpenMockTestModal();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentMode === 'mode3_mock'
                ? 'bg-emerald-500 text-zinc-950 font-bold'
                : 'text-zinc-400'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{t.modes.mode3_mock.title}</span>
          </button>

          <button
            onClick={() => {
              onSelectMode('mode4_guide');
              onOpenGuideModal();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentMode === 'mode4_guide'
                ? 'bg-emerald-500 text-zinc-950 font-bold'
                : 'text-zinc-400'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.modes.mode4_guide.title}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
