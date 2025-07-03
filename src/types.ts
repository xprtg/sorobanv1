export interface PracticeConfig {
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
  voiceEnabled: boolean;
  darkMode: boolean;
  showRealTimeSum: boolean;
  visualStyle: 'apple' | 'professional' | 'dojo';
}

export interface PracticeState {
  currentNumber: number;
  numbersShown: number[];
  isShowing: boolean;
  isComplete: boolean;
  total: number;
  countdown: number;
  showNumbersList: boolean;
  userResult?: number;
  isCorrect?: boolean;
  difference?: number;
  isFreeMode: boolean;
  realTimeSum: number;
}

export interface UserPreferences {
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
  voiceEnabled: boolean;
  darkMode: boolean;
  showRealTimeSum: boolean;
  visualStyle: 'apple' | 'professional' | 'dojo';
}

export interface DifficultyPreset {
  id: string;
  name: string;
  description: string;
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
  color: string;
  icon: string;
}

export interface PracticeSession {
  id: string;
  date: string;
  config: PracticeConfig;
  numbers: number[];
  total: number;
  userResult?: number;
  isCorrect?: boolean;
  difference?: number;
  duration: number;
} 