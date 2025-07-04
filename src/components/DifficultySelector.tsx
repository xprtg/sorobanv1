import { DifficultyPreset } from '../types';
import { DIFFICULTY_PRESETS } from '../constants/presets';

interface DifficultySelectorProps {
  onSelectPreset: (preset: DifficultyPreset) => void;
  onCustomMode: () => void;
  onTutorial?: () => void;
}

export function DifficultySelector({ onSelectPreset, onCustomMode, onTutorial }: DifficultySelectorProps) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">
          Selecciona tu nivel
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Elige un preset de dificultad o configura tus propios parámetros
        </p>
      </div>

      {/* Botón especial para el tutorial */}
      <div className="mb-8 flex justify-center">
        <button
          onClick={onTutorial}
          className="group relative bg-cyan-50 dark:bg-cyan-900/80 border-2 border-cyan-400 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500 text-white text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">
              🎓
            </div>
            <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-2">Tutorial</h3>
            <p className="text-base text-cyan-800 dark:text-cyan-100 mb-2">Aprende a usar el Soroban paso a paso</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {DIFFICULTY_PRESETS.filter(preset => preset.id !== 'tutorial').map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg 
                     hover:shadow-xl transition-all duration-300 transform hover:scale-105
                     dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${preset.color} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {preset.icon}
              </div>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {preset.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {preset.description}
              </p>
              
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                <div className="flex justify-between">
                  <span>Tiempo:</span>
                  <span>{preset.timeBetweenNumbers}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Números:</span>
                  <span>{preset.numberOfNumbers === -1 ? '∞' : preset.numberOfNumbers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rango:</span>
                  <span>{preset.minNumber}-{preset.maxNumber}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onCustomMode}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 
                   text-gray-700 dark:text-gray-300 rounded-2xl font-medium
                   hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Modo Personalizado
        </button>
      </div>
    </div>
  );
} 