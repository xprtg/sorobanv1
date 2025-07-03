import { useState, useEffect } from "react";
import { PracticeConfig, PracticeState } from "../types";
import { CountdownCircle } from "./CountdownCircle";
import { useSpeech } from "../hooks/useSpeech";
import { ResultComparison } from "./ResultComparison";

interface SorobanPracticeProps {
  config: PracticeConfig;
  onComplete: (sessionData: any) => void;
  onStop?: () => void;
}

export function SorobanPractice({ config, onComplete, onStop }: SorobanPracticeProps) {
  const [state, setState] = useState<PracticeState>({
    currentNumber: 0,
    numbersShown: [],
    isShowing: false,
    isComplete: false,
    total: 0,
    countdown: 0,
    showNumbersList: false,
    isFreeMode: config.numberOfNumbers === -1,
    realTimeSum: 0,
  });

  const [startTime, setStartTime] = useState<number>(0);
  const [showResultComparison, setShowResultComparison] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);

  const { speak, stop } = useSpeech();

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (config.maxNumber - config.minNumber + 1)) + config.minNumber;
  };

  const startPractice = () => {
    const firstNumber = generateRandomNumber();
    const now = Date.now();
    setStartTime(now);
    
    setState({
      currentNumber: firstNumber,
      numbersShown: [firstNumber],
      isShowing: true,
      isComplete: false,
      total: 0,
      countdown: config.timeBetweenNumbers,
      showNumbersList: false,
      isFreeMode: config.numberOfNumbers === -1,
      realTimeSum: firstNumber,
    });

    if (config.voiceEnabled) {
      speak(firstNumber.toString());
    }
  };

  const showNextNumber = () => {
    const isLastNumber = !state.isFreeMode && state.numbersShown.length >= config.numberOfNumbers;
    
    if (isLastNumber) {
      // Practice complete
      const total = state.numbersShown.reduce((sum, num) => sum + num, 0);
      const duration = Math.floor((Date.now() - startTime) / 1000);
      
      const sessionData = {
        config,
        numbers: state.numbersShown,
        total,
        duration,
      };
      
      setSessionData(sessionData);
      setState(prev => ({
        ...prev,
        isShowing: false,
        isComplete: true,
        total,
      }));
      
      setShowResultComparison(true);
      return;
    }

    const nextNumber = generateRandomNumber();
    const newRealTimeSum = state.realTimeSum + nextNumber;
    
    setState(prev => ({
      ...prev,
      currentNumber: nextNumber,
      numbersShown: [...prev.numbersShown, nextNumber],
      isShowing: true,
      countdown: config.timeBetweenNumbers,
      realTimeSum: newRealTimeSum,
    }));

    if (config.voiceEnabled) {
      speak(nextNumber.toString());
    }
  };

  const handleResultSubmit = (userResult: number, isCorrect: boolean, difference: number) => {
    const finalSessionData = {
      ...sessionData,
      userResult,
      isCorrect,
      difference,
    };
    
    onComplete(finalSessionData);
  };

  const handleSkipResult = () => {
    onComplete(sessionData);
  };

  const stopPractice = () => {
    if (onStop) {
      onStop();
    }
  };

  const copyResults = async () => {
    const results = `Práctica de Soroban\n\nNúmeros: ${state.numbersShown.join(', ')}\nTotal: ${state.total}`;
    try {
      await navigator.clipboard.writeText(results);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  useEffect(() => {
    startPractice();
    return () => stop();
  }, []);

  useEffect(() => {
    if (state.isShowing && !state.isComplete) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, isShowing: false }));
        
        const nextTimer = setTimeout(() => {
          showNextNumber();
        }, 500);

        return () => clearTimeout(nextTimer);
      }, config.timeBetweenNumbers * 1000);

      return () => clearTimeout(timer);
    }
  }, [state.isShowing, state.isComplete, state.numbersShown.length]);

  // Countdown effect
  useEffect(() => {
    if (state.isShowing && state.countdown > 0 && !state.isComplete) {
      const countdownTimer = setTimeout(() => {
        setState(prev => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);

      return () => clearTimeout(countdownTimer);
    }
  }, [state.countdown, state.isShowing, state.isComplete]);

  if (showResultComparison) {
    return (
      <ResultComparison
        correctTotal={state.total}
        onResultSubmit={handleResultSubmit}
        onSkip={handleSkipResult}
      />
    );
  }

  if (state.isComplete) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center dark:bg-gray-800/90">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
            Práctica Completada
          </h2>
          
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <p className="text-gray-600 dark:text-gray-400">Números mostrados:</p>
              <button
                onClick={() => setState(prev => ({ ...prev, showNumbersList: !prev.showNumbersList }))}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                {state.showNumbersList ? 'Ocultar' : 'Ver lista'}
              </button>
            </div>
            
            {state.showNumbersList && (
              <div className="flex flex-wrap justify-center gap-2 mb-6 animate-slide-up">
                {state.numbersShown.map((num, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-xl text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <p className="text-blue-900 dark:text-blue-100 text-lg mb-2">Total de la suma:</p>
              <p className="text-4xl font-light text-blue-900 dark:text-blue-100">
                {state.total}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => onComplete(sessionData)}
              className="btn-secondary"
            >
              Nueva Práctica
            </button>
            <button
              onClick={startPractice}
              className="btn-primary"
            >
              Repetir Práctica
            </button>
            <button
              onClick={copyResults}
              className="btn-secondary"
            >
              Copiar Resultados
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-[60vh]">
      <CountdownCircle
        duration={config.timeBetweenNumbers}
        isActive={state.isShowing}
        onComplete={() => {}}
      />
      
      <div className="text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {state.isFreeMode ? (
                <>Número {state.numbersShown.length}</>
              ) : (
                <>Número {state.numbersShown.length} de {config.numberOfNumbers}</>
              )}
            </p>
            {state.isFreeMode && onStop && (
              <button
                onClick={stopPractice}
                className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
              >
                Detener
              </button>
            )}
          </div>
          
          {!state.isFreeMode && (
            <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(state.numbersShown.length / config.numberOfNumbers) * 100}%`
                }}
              />
            </div>
          )}
        </div>

        <div
          className={`text-8xl font-light text-gray-900 dark:text-white transition-all duration-500 ${
            state.isShowing ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {state.currentNumber}
        </div>

        {config.showRealTimeSum && state.numbersShown.length > 1 && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Suma actual:</p>
            <p className="text-2xl font-light text-gray-900 dark:text-white">
              {state.realTimeSum}
            </p>
          </div>
        )}

        <div className="mt-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Usa tu soroban para sumar este número
          </p>
          {config.voiceEnabled && (
            <p className="text-blue-500 text-xs mt-2">
              🔊 Lectura por voz activada
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 