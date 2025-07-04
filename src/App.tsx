import React, { useState, useEffect } from 'react';
import { SorobanPractice } from './components/SorobanPractice';
import { StatsPanel } from './components/StatsPanel';
import { AchievementsPanel } from './components/AchievementsPanel';
import UserProfile from './components/UserProfile';
import HelpPanel from './components/HelpPanel';
import { ConfigModal } from './components/ConfigModal';
import { DarkModeToggle } from './components/DarkModeToggle';
import { DifficultySelector } from './components/DifficultySelector';
import { useLevels } from './hooks/useLevels';
import { useAchievements } from './hooks/useAchievements';
import { useSessionHistory } from './hooks/useSessionHistory';
import { usePreferences } from './hooks/usePreferences';
import { useNotifications } from './hooks/useNotifications';
import { useSpeech } from './hooks/useSpeech';
import { useStats } from './hooks/useStats';
import { useWeeklyChallenges } from './hooks/useWeeklyChallenges';
import { initLanguage, t, getCurrentLanguage, setLanguage, getAvailableLanguages } from './utils/i18n';
import { formatNumber, formatDate } from './utils/i18n';
import { PracticeSession, DifficultyPreset, UserStats } from './types';
import { DIFFICULTY_PRESETS } from './constants/presets';
import { TutorialWizard } from './components/TutorialWizard';

function App() {
  // Initialize language
  useEffect(() => {
    initLanguage();
  }, []);

  // State management
  const [currentView, setCurrentView] = useState<'practice' | 'stats' | 'achievements' | 'profile' | 'help'>('practice');
  const [showConfig, setShowConfig] = useState(false);
  const [showDifficultySelector, setShowDifficultySelector] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyPreset>(DIFFICULTY_PRESETS[0]);
  const [isPracticeActive, setIsPracticeActive] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Hooks
  const { stats, currentLevel, nextLevel, xpProgress, levelUpNotification, closeLevelUpNotification, updateStatsFromSession } = useLevels();
  const { achievements, checkAchievements } = useAchievements();
  const { sessions, addSession } = useSessionHistory();
  const { preferences, updatePreferences } = usePreferences();
  const { settings } = useNotifications();
  const { speak } = useSpeech();
  const { calculateStats } = useStats();
  const { currentChallenge, updateChallengeProgress } = useWeeklyChallenges();

  // Mock data for achievements (temporary fix)
  const unlockedAchievements: string[] = [];
  const achievementProgress: Record<string, number> = {};

  // Handle practice session completion
  const handleSessionComplete = (session: PracticeSession) => {
    addSession(session);
    updateStatsFromSession(session);
    checkAchievements(sessions, stats);
    updateChallengeProgress(sessions);
    
    if (session.isCorrect) {
      // Show success notification
      console.log('¡Excelente trabajo!');
    }
  };

  // Handle level up notification
  useEffect(() => {
    if (levelUpNotification.show) {
      console.log(`¡Subiste al nivel ${levelUpNotification.newLevel}!`);
    }
  }, [levelUpNotification.show]);

  // Navigation functions
  const navigateTo = (view: typeof currentView) => {
    setCurrentView(view);
    setIsPracticeActive(false);
  };

  const startPractice = () => {
    setIsPracticeActive(true);
    setCurrentView('practice');
  };

  // Language handling
  const handleLanguageChange = (lang: 'es' | 'en') => {
    setLanguage(lang);
  };

  const currentLanguage = getCurrentLanguage();
  const availableLanguages = getAvailableLanguages();

  // Calculate formatted stats
  const formattedStats = {
    totalSessions: formatNumber(stats.totalSessions),
    totalPracticeTime: formatNumber(Math.round(stats.totalPracticeTime / 60)), // Convert to minutes
    averageAccuracy: formatNumber(Math.round(stats.averageAccuracy || 0)),
    currentStreak: formatNumber(stats.currentStreak),
    bestStreak: formatNumber(stats.bestStreak),
    totalNumbers: formatNumber(stats.totalNumbersPracticed),
    level: formatNumber(currentLevel.level),
    totalXP: formatNumber(stats.totalXP),
    xpToNext: formatNumber(nextLevel ? nextLevel.xpRequired - currentLevel.xpRequired : 0),
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      preferences.darkMode 
        ? 'bg-gray-900 text-white' 
        : preferences.visualStyle === 'zen'
        ? 'bg-green-50 text-gray-800'
        : preferences.visualStyle === 'retro'
        ? 'bg-yellow-50 text-gray-800'
        : preferences.visualStyle === 'matrix'
        ? 'bg-black text-green-400'
        : preferences.visualStyle === 'dojo'
        ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white'
        : preferences.visualStyle === 'minimal-dark'
        ? 'bg-white text-black'
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🧮</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('app.title')}
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t('app.subtitle')}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: 'practice', label: t('navigation.practice'), icon: '🎯' },
                { id: 'stats', label: t('navigation.stats'), icon: '📊' },
                { id: 'achievements', label: t('navigation.achievements'), icon: '🏆' },
                { id: 'profile', label: t('navigation.profile'), icon: '👤' },
                { id: 'help', label: t('navigation.help'), icon: '❓' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id as typeof currentView)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === item.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as 'es' | 'en')}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableLanguages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <DarkModeToggle
                isDark={preferences.darkMode}
                onToggle={() => updatePreferences({ darkMode: !preferences.darkMode })}
              />

              {/* Settings Button */}
              <button
                onClick={() => setShowConfig(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Configuración"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Progress Bar */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">⭐</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Nivel {currentLevel.level} - {currentLevel.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stats.totalXP} XP • {nextLevel ? `${nextLevel.xpRequired - currentLevel.xpRequired} XP para el siguiente nivel` : '¡Nivel máximo alcanzado!'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.totalXP}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">XP Total</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress.progress}%` }}
            />
          </div>
        </div>

        {/* Current View Content */}
        {currentView === 'practice' && (
          <div className="space-y-6">
            {/* Practice Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isPracticeActive ? 'Práctica en Curso' : 'Iniciar Práctica'}
                </h2>
                {!isPracticeActive && (
                  <button
                    onClick={() => setShowDifficultySelector(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Cambiar Dificultad
                  </button>
                )}
              </div>

              {!isPracticeActive ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🧮</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedDifficulty.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedDifficulty.description}
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>⏱️ {selectedDifficulty.timeBetweenNumbers}s</span>
                    <span>🔢 {selectedDifficulty.numberOfNumbers} números</span>
                    <span>📊 {selectedDifficulty.minNumber}-{selectedDifficulty.maxNumber}</span>
                  </div>
                  <button
                    onClick={startPractice}
                    className="px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-lg font-semibold"
                  >
                    🚀 Comenzar Práctica
                  </button>
                </div>
              ) : (
                <SorobanPractice
                  config={{
                    timeBetweenNumbers: selectedDifficulty.timeBetweenNumbers,
                    numberOfNumbers: selectedDifficulty.numberOfNumbers,
                    minNumber: selectedDifficulty.minNumber,
                    maxNumber: selectedDifficulty.maxNumber,
                    voiceEnabled: preferences.voiceEnabled,
                    darkMode: preferences.darkMode,
                    showRealTimeSum: preferences.showRealTimeSum,
                    visualStyle: preferences.visualStyle,
                    fontSize: preferences.fontSize,
                    fontFamily: preferences.fontFamily,
                    highContrast: preferences.highContrast,
                  }}
                  onComplete={handleSessionComplete}
                  onStop={() => setIsPracticeActive(false)}
                />
              )}
            </div>
          </div>
        )}

        {currentView === 'stats' && (
          <StatsPanel
            stats={stats}
            formatTime={(seconds: number) => `${Math.floor(seconds / 60)}m ${seconds % 60}s`}
            formatAccuracy={(accuracy: number) => `${Math.round(accuracy)}%`}
          />
        )}

        {currentView === 'achievements' && (
          <div className="text-center">
            <button
              onClick={() => setCurrentView('achievements')}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
            >
              Ver Logros ({unlockedAchievements.length}/{achievements.length})
            </button>
          </div>
        )}

        {currentView === 'profile' && (
          <UserProfile
            isOpen={true}
            onClose={() => setCurrentView('practice')}
          />
        )}

        {currentView === 'help' && (
          <HelpPanel
            isOpen={true}
            onClose={() => setCurrentView('practice')}
          />
        )}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around py-2">
          {[
            { id: 'practice', icon: '🎯', label: 'Practicar' },
            { id: 'stats', icon: '📊', label: 'Stats' },
            { id: 'achievements', icon: '🏆', label: 'Logros' },
            { id: 'profile', icon: '👤', label: 'Perfil' },
            { id: 'help', icon: '❓', label: 'Ayuda' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as typeof currentView)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Modals */}
      <ConfigModal
        config={preferences}
        onStart={updatePreferences}
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
      />

      {showDifficultySelector && !showTutorial && (
        <DifficultySelector
          onSelectPreset={(difficulty: DifficultyPreset) => {
            setSelectedDifficulty(difficulty);
            setShowDifficultySelector(false);
          }}
          onCustomMode={() => {
            setShowDifficultySelector(false);
            setShowTutorial(false);
            setShowConfig(true);
          }}
          onTutorial={() => {
            setShowTutorial(true);
          }}
        />
      )}

      {/* Modal del tutorial */}
      {showTutorial && (
        <TutorialWizard onExit={() => {
          setShowTutorial(false);
          setShowDifficultySelector(true);
        }} />
      )}

      {/* Achievements Panel */}
      <AchievementsPanel
        isOpen={currentView === 'achievements'}
        onClose={() => setCurrentView('practice')}
        unlockedAchievements={unlockedAchievements}
        achievementProgress={achievementProgress}
      />

      {/* Level Up Notification */}
      {levelUpNotification.show && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg z-50 max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎉</div>
            <div>
              <h3 className="font-bold">¡Subiste de nivel!</h3>
              <p className="text-sm opacity-90">
                Ahora eres nivel {levelUpNotification.newLevel}
              </p>
            </div>
            <button
              onClick={closeLevelUpNotification}
              className="ml-auto text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
