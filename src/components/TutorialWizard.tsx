import React from 'react';
import { useTutorial } from '../hooks/useTutorial';
import { t } from '../utils/i18n';

const steps = [
  {
    key: 'intro',
    title: t('tutorial.intro.title'),
    content: t('tutorial.intro.content'),
    illustration: (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
        <rect x="10" y="20" width="100" height="40" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
        <text x="60" y="45" textAnchor="middle" fontSize="18" fill="#6366f1">Soroban</text>
      </svg>
    ),
  },
  {
    key: 'structure',
    title: t('tutorial.structure.title'),
    content: t('tutorial.structure.content'),
    illustration: (
      <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
        {/* Columnas */}
        {[...Array(5)].map((_, i) => (
          <g key={i}>
            {/* Cuentas superiores */}
            <circle cx={30 + i * 30} cy={30} r={8} fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            {/* Cuentas inferiores */}
            <circle cx={30 + i * 30} cy={60} r={8} fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" />
            <circle cx={30 + i * 30} cy={75} r={8} fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" />
          </g>
        ))}
        {/* Marco */}
        <rect x="15" y="15" width="150" height="65" rx="10" fill="none" stroke="#6b7280" strokeWidth="2" />
      </svg>
    ),
  },
  // ...más pasos después
];

export function TutorialWizard({ onExit }: { onExit: () => void }) {
  const {
    status,
    nextStep,
    prevStep,
    goToStep,
    completeTutorial,
    skipTutorial,
  } = useTutorial();

  const step = steps[status.currentStep];
  const isFirst = status.currentStep === 0;
  const isLast = status.currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        {/* Barra de progreso */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((status.currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">
            {t('tutorial.step')} {status.currentStep + 1} {t('tutorial.of')} {steps.length}
          </span>
        </div>
        {/* Ilustración */}
        <div className="flex justify-center mb-4">{step.illustration}</div>
        {/* Título y contenido */}
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{step.content}</p>
        {/* Navegación */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onExit}
            className="text-sm text-gray-500 hover:text-red-500 px-3 py-1 rounded transition-colors"
          >
            {t('tutorial.exit')}
          </button>
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              disabled={isFirst}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            >
              {t('tutorial.back')}
            </button>
            <button
              onClick={isLast ? completeTutorial : nextStep}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              {isLast ? t('tutorial.finish') : t('tutorial.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 