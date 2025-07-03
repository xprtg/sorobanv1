import { useState } from "react";
import { SorobanPractice } from "./components/SorobanPractice";
import { ConfigModal } from "./components/ConfigModal";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { DifficultySelector } from "./components/DifficultySelector";
import { SessionHistory } from "./components/SessionHistory";
import { PracticeConfig, DifficultyPreset, PracticeSession } from "./types";
import { usePreferences } from "./hooks/usePreferences";
import { useSessionHistory } from "./hooks/useSessionHistory";

type AppView = 'menu' | 'config' | 'practice' | 'history';

function App() {
  const { preferences, updatePreferences, isLoaded } = usePreferences();
  const { sessions, addSession, deleteSession, clearHistory, getSessionById } = useSessionHistory();
  
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
  });

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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <DarkModeToggle isDark={preferences.darkMode} onToggle={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center animate-slide-down">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2">
            Soroban Practice
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Practica sumas mentales con el ábaco japonés
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center mb-8">
          <div className="flex bg-white/90 backdrop-blur-sm rounded-2xl p-1 shadow-lg dark:bg-gray-800/90">
            {[
              { id: 'menu', label: 'Inicio', icon: '🏠' },
              { id: 'history', label: 'Historial', icon: '📊' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as AppView)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

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
      </div>
    </div>
  );
}

export default App;
