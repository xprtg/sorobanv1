import { useState, useEffect } from "react";
import { SorobanPractice } from "./components/SorobanPractice";
import { ConfigModal } from "./components/ConfigModal";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { DifficultySelector } from "./components/DifficultySelector";
import { SessionHistory } from "./components/SessionHistory";
import { AchievementsPanel } from "./components/AchievementsPanel";
import { StatsPanel } from "./components/StatsPanel";
import { WeeklyChallengePanel } from "./components/WeeklyChallengePanel";
import { ExportPanel } from "./components/ExportPanel";
import { KeyboardShortcutsPanel } from "./components/KeyboardShortcutsPanel";
import { PracticeConfig, DifficultyPreset, PracticeSession } from "./types";
import { usePreferences } from "./hooks/usePreferences";
import { useSessionHistory } from "./hooks/useSessionHistory";
import { useAchievements } from "./hooks/useAchievements";
import { useStats } from "./hooks/useStats";
import { useWeeklyChallenges } from "./hooks/useWeeklyChallenges";
import { useNotifications } from "./hooks/useNotifications";

type AppView = 'menu' | 'config' | 'practice' | 'history' | 'achievements' | 'stats' | 'challenges' | 'export' | 'shortcuts';

function App() {
  const { preferences, updatePreferences, isLoaded } = usePreferences();
  const { sessions, addSession, deleteSession, clearHistory, getSessionById } = useSessionHistory();
  const { achievements, checkAchievements, isLoaded: achievementsLoaded } = useAchievements();
  const { stats, calculateStats, formatTime, formatAccuracy, isLoaded: statsLoaded } = useStats();
  const { currentChallenge, updateChallengeProgress, isLoaded: challengesLoaded } = useWeeklyChallenges();
  const { settings, enableNotifications, shouldShowReminder, showReminder, markAsPracticed, isLoaded: notificationsLoaded } = useNotifications();
  
  const [currentView, setCurrentView] = useState<AppView>('menu');
  const [config, setConfig] = useState<PracticeConfig>({
    timeBetweenNumbers: preferences.timeBetweenNumbers,
    numberOfNumbers: preferences.numberOfNumbers,
    minNumber: preferences.minNumber,
    maxNumber: preferences.maxNumber,
    voiceEnabled: preferences.voiceEnabled,
    darkMode: preferences.darkMode,
    showRealTimeSum: preferences.showRealTimeSum,
    visualStyle: preferences.visualStyle,
    fontSize: preferences.fontSize,
    fontFamily: preferences.fontFamily,
    highContrast: preferences.highContrast,
  });

  // Update stats and achievements when sessions change
  useEffect(() => {
    if (statsLoaded && sessions.length > 0) {
      calculateStats(sessions);
    }
  }, [sessions, statsLoaded]);

  useEffect(() => {
    if (achievementsLoaded && statsLoaded && sessions.length > 0) {
      const newUnlocked = checkAchievements(sessions, stats);
      if (newUnlocked.length > 0) {
        // Show achievement notification
        console.log('New achievements unlocked:', newUnlocked.map(a => a.name));
      }
    }
  }, [sessions, stats, achievementsLoaded, statsLoaded]);

  useEffect(() => {
    if (challengesLoaded && sessions.length > 0) {
      updateChallengeProgress(sessions);
    }
  }, [sessions, challengesLoaded]);

  // Check for practice reminders
  useEffect(() => {
    if (notificationsLoaded && shouldShowReminder()) {
      showReminder();
    }
  }, [notificationsLoaded]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'escape':
          if (currentView !== 'menu') {
            setCurrentView('menu');
          }
          break;
        case 'h':
          setCurrentView('history');
          break;
        case 'a':
          setCurrentView('achievements');
          break;
        case 's':
          setCurrentView('stats');
          break;
        case 'c':
          setCurrentView('challenges');
          break;
        case 'd':
          toggleDarkMode();
          break;
        case 'v':
          toggleVoice();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          // Handle preset selection (would need to be implemented)
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentView]);

  const handleSelectPreset = (preset: DifficultyPreset) => {
    const newConfig: PracticeConfig = {
      ...config,
      timeBetweenNumbers: preset.timeBetweenNumbers,
      numberOfNumbers: preset.numberOfNumbers,
      minNumber: preset.minNumber,
      maxNumber: preset.maxNumber,
    };
    
    setConfig(newConfig);
    updatePreferences(newConfig);
    setCurrentView('practice');
  };

  const handleCustomMode = () => {
    setCurrentView('config');
  };

  const handleStartPractice = (newConfig: PracticeConfig) => {
    setConfig(newConfig);
    updatePreferences(newConfig);
    setCurrentView('practice');
  };

  const handlePracticeComplete = (sessionData: any) => {
    addSession(sessionData);
    markAsPracticed(); // Reset reminder timer
    setCurrentView('menu');
  };

  const handleStopPractice = () => {
    setCurrentView('menu');
  };

  const handleRepeatSession = (session: PracticeSession) => {
    setConfig(session.config);
    setCurrentView('practice');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !preferences.darkMode;
    updatePreferences({ darkMode: newDarkMode });
    setConfig((prev: PracticeConfig) => ({ ...prev, darkMode: newDarkMode }));
  };

  const toggleVoice = () => {
    const newVoiceEnabled = !preferences.voiceEnabled;
    updatePreferences({ voiceEnabled: newVoiceEnabled });
    setConfig((prev: PracticeConfig) => ({ ...prev, voiceEnabled: newVoiceEnabled }));
  };

  const handleEnableNotifications = async () => {
    await enableNotifications();
  };

  if (!isLoaded || !achievementsLoaded || !statsLoaded || !challengesLoaded || !notificationsLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  // Apply visual style classes
  const getVisualStyleClasses = () => {
    switch (config.visualStyle) {
      case 'neumorphism':
        return 'neumorphism';
      case 'minimal-dark':
        return 'minimal-dark';
      default:
        return '';
    }
  };

  const getFontClasses = () => {
    const fontClass = `font-${config.fontFamily}`;
    const sizeClass = config.fontSize === 'large' ? 'text-large' : '';
    return `${fontClass} ${sizeClass}`.trim();
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300 ${getVisualStyleClasses()} ${getFontClasses()} ${config.highContrast ? 'high-contrast' : ''}`}>
      <DarkModeToggle isDark={preferences.darkMode} onToggle={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center animate-slide-down">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2">
            Soroban Practice 2.0
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Practica sumas mentales con el ábaco japonés
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center mb-8">
          <div className="flex flex-wrap bg-white/90 backdrop-blur-sm rounded-2xl p-1 shadow-lg dark:bg-gray-800/90">
            {[
              { id: 'menu', label: 'Inicio', icon: '🏠' },
              { id: 'history', label: 'Historial', icon: '📊' },
              { id: 'achievements', label: 'Logros', icon: '🏆' },
              { id: 'stats', label: 'Estadísticas', icon: '📈' },
              { id: 'challenges', label: 'Desafíos', icon: '🎯' },
              { id: 'export', label: 'Exportar', icon: '📤' },
              { id: 'shortcuts', label: 'Atajos', icon: '⌨️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as AppView)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Notification reminder banner */}
        {settings.enabled && shouldShowReminder() && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-lg">🔔</span>
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    ¡Es hora de practicar!
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300">
                    Mantén tu racha diaria activa
                  </p>
                </div>
              </div>
              <button
                onClick={() => markAsPracticed()}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {currentView === 'menu' && (
          <DifficultySelector
            onSelectPreset={handleSelectPreset}
            onCustomMode={handleCustomMode}
          />
        )}

        {currentView === 'config' && (
          <ConfigModal
            config={config}
            onStart={handleStartPractice}
            isOpen={true}
          />
        )}

        {currentView === 'practice' && (
          <SorobanPractice
            config={config}
            onComplete={handlePracticeComplete}
            onStop={handleStopPractice}
          />
        )}

        {currentView === 'history' && (
          <SessionHistory
            sessions={sessions}
            onRepeatSession={handleRepeatSession}
            onDeleteSession={deleteSession}
            onClearHistory={clearHistory}
          />
        )}

        {currentView === 'achievements' && (
          <AchievementsPanel achievements={achievements} />
        )}

        {currentView === 'stats' && (
          <StatsPanel 
            stats={stats} 
            formatTime={formatTime} 
            formatAccuracy={formatAccuracy} 
          />
        )}

        {currentView === 'challenges' && (
          <WeeklyChallengePanel challenge={currentChallenge} />
        )}

        {currentView === 'export' && (
          <ExportPanel sessions={sessions} />
        )}

        {currentView === 'shortcuts' && (
          <KeyboardShortcutsPanel />
        )}
      </div>
    </div>
  );
}

export default App;
