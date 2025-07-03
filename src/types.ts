export interface PracticeConfig {
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
}

export interface PracticeState {
  currentNumber: number;
  numbersShown: number[];
  isShowing: boolean;
  isComplete: boolean;
  total: number;
} 