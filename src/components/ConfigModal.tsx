import { useState } from "react";
import { PracticeConfig } from "../types";

interface ConfigModalProps {
  config: PracticeConfig;
  onStart: (config: PracticeConfig) => void;
  isOpen: boolean;
}

export function ConfigModal({ config, onStart, isOpen }: ConfigModalProps) {
  const [localConfig, setLocalConfig] = useState<PracticeConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(localConfig);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-slide-up max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6 text-center">
          Configurar Práctica
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Practice Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Configuración de Práctica
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tiempo entre números
              </label>
              <select
                value={localConfig.timeBetweenNumbers}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  timeBetweenNumbers: parseInt(e.target.value)
                })}
                className="input-field"
              >
                <option value={1}>1 segundo</option>
                <option value={2}>2 segundos</option>
                <option value={3}>3 segundos</option>
                <option value={4}>4 segundos</option>
                <option value={5}>5 segundos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cantidad de números
              </label>
              <select
                value={localConfig.numberOfNumbers}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  numberOfNumbers: parseInt(e.target.value)
                })}
                className="input-field"
              >
                <option value={5}>5 números</option>
                <option value={10}>10 números</option>
                <option value={15}>15 números</option>
                <option value={20}>20 números</option>
                <option value={25}>25 números</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Número mínimo
                </label>
                <input
                  type="number"
                  value={localConfig.minNumber}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    minNumber: parseInt(e.target.value)
                  })}
                  min="1"
                  max="999"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Número máximo
                </label>
                <input
                  type="number"
                  value={localConfig.maxNumber}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    maxNumber: parseInt(e.target.value)
                  })}
                  min="1"
                  max="999"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Características
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lectura por voz
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Lee los números en voz alta
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLocalConfig({
                  ...localConfig,
                  voiceEnabled: !localConfig.voiceEnabled
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  localConfig.voiceEnabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localConfig.voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Suma en tiempo real
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Muestra la suma acumulada
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLocalConfig({
                  ...localConfig,
                  showRealTimeSum: !localConfig.showRealTimeSum
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  localConfig.showRealTimeSum ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localConfig.showRealTimeSum ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Accessibility */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Accesibilidad
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tamaño de fuente
              </label>
              <select
                value={localConfig.fontSize}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  fontSize: e.target.value as 'normal' | 'large'
                })}
                className="input-field"
              >
                <option value="normal">Normal</option>
                <option value="large">Grande</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fuente
              </label>
              <select
                value={localConfig.fontFamily}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  fontFamily: e.target.value as 'sf-pro' | 'inter' | 'atkinson'
                })}
                className="input-field"
              >
                <option value="sf-pro">SF Pro (Apple)</option>
                <option value="inter">Inter (Moderno)</option>
                <option value="atkinson">Atkinson Hyperlegible (Accesible)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Alto contraste
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mejora la legibilidad
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLocalConfig({
                  ...localConfig,
                  highContrast: !localConfig.highContrast
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  localConfig.highContrast ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localConfig.highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Visual Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Estilo Visual
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tema
              </label>
              <select
                value={localConfig.visualStyle}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  visualStyle: e.target.value as any
                })}
                className="input-field"
              >
                <option value="apple">Apple (Clásico)</option>
                <option value="professional">Profesional</option>
                <option value="dojo">Dojo Japonés</option>
                <option value="neumorphism">Neumorfismo</option>
                <option value="minimal-dark">Mínimo Oscuro</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Comenzar Práctica
          </button>
        </form>
      </div>
    </div>
  );
} 