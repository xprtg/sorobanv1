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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">
          Configurar Práctica
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo entre números (segundos)
            </label>
            <select
              value={localConfig.timeBetweenNumbers}
              onChange={(e) => setLocalConfig({
                ...localConfig,
                timeBetweenNumbers: parseInt(e.target.value)
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value={1}>1 segundo</option>
              <option value={2}>2 segundos</option>
              <option value={3}>3 segundos</option>
              <option value={4}>4 segundos</option>
              <option value={5}>5 segundos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de números
            </label>
            <select
              value={localConfig.numberOfNumbers}
              onChange={(e) => setLocalConfig({
                ...localConfig,
                numberOfNumbers: parseInt(e.target.value)
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105"
          >
            Comenzar Práctica
          </button>
        </form>
      </div>
    </div>
  );
} 