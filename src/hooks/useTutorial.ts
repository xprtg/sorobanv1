import { useState, useEffect } from 'react';

const TUTORIAL_KEY = 'soroban-tutorial-status';

export interface TutorialStatus {
  completed: boolean;
  currentStep: number;
  skipped: boolean;
}

const defaultStatus: TutorialStatus = {
  completed: false,
  currentStep: 0,
  skipped: false,
};

export function useTutorial() {
  const [status, setStatus] = useState<TutorialStatus>(() => {
    const saved = localStorage.getItem(TUTORIAL_KEY);
    return saved ? JSON.parse(saved) : defaultStatus;
  });

  useEffect(() => {
    localStorage.setItem(TUTORIAL_KEY, JSON.stringify(status));
  }, [status]);

  const goToStep = (step: number) => setStatus(s => ({ ...s, currentStep: step }));
  const nextStep = () => setStatus(s => ({ ...s, currentStep: s.currentStep + 1 }));
  const prevStep = () => setStatus(s => ({ ...s, currentStep: Math.max(0, s.currentStep - 1) }));
  const completeTutorial = () => setStatus(s => ({ ...s, completed: true }));
  const skipTutorial = () => setStatus(s => ({ ...s, skipped: true }));
  const resetTutorial = () => setStatus(defaultStatus);

  return {
    status,
    goToStep,
    nextStep,
    prevStep,
    completeTutorial,
    skipTutorial,
    resetTutorial,
  };
} 