import { useState } from "react";
import { PracticeConfig } from "../types";
import { ModalBase } from './ModalBase';

interface ConfigModalProps {
  config: PracticeConfig;
  onStart: (config: PracticeConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ConfigModal({ config, onStart, isOpen, onClose }: ConfigModalProps) {
  const [localConfig, setLocalConfig] = useState<PracticeConfig>(config);

  const handleSave = () => {
    onStart(localConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
        aria-label="Cerrar"
      >
        ×
      </button>
      <div className="p-8">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6 text-center">
          Configuración Global
        </h2>
        
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

          {/* Modo Secuencia Soroban */}
          <div className="flex items-center justify-between p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl border border-cyan-200 dark:border-cyan-700">
            <div>
              <label className="text-sm font-medium text-cyan-800 dark:text-cyan-200">
                Modo Secuencia Soroban
              </label>
              <p className="text-xs text-cyan-700 dark:text-cyan-100">
                Muestra visualmente cómo representar cada número en el soroban, paso a paso. Ideal para principiantes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLocalConfig({
                ...localConfig,
                sequenceMode: !localConfig.sequenceMode
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                localConfig.sequenceMode ? 'bg-cyan-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localConfig.sequenceMode ? 'translate-x-6' : 'translate-x-1'
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

        <div className="flex justify-end mt-8">
          <button
            type="button"
            className="btn-primary px-8"
            onClick={handleSave}
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </ModalBase>
  );
} 