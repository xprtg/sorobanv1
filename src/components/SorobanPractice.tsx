import { useState, useEffect } from "react";
import { PracticeConfig, PracticeState } from "../types";

interface SorobanPracticeProps {
  config: PracticeConfig;
  onComplete: () => void;
}

export function SorobanPractice({ config, onComplete }: SorobanPracticeProps) {
  const [state, setState] = useState<PracticeState>({
    currentNumber: 0,
    numbersShown: [],
    isShowing: false,
    isComplete: false,
    total: 0,
  });

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (config.maxNumber - config.minNumber + 1)) + config.minNumber;
  };

  const startPractice = () => {
    const firstNumber = generateRandomNumber();
    setState({
      currentNumber: firstNumber,
      numbersShown: [firstNumber],
      isShowing: true,
      isComplete: false,
      total: 0,
    });
  };

  const showNextNumber = () => {
    if (state.numbersShown.length >= config.numberOfNumbers) {
      // Practice complete
      const total = state.numbersShown.reduce((sum, num) => sum + num, 0);
      setState(prev => ({
        ...prev,
        isShowing: false,
        isComplete: true,
        total,
      }));
      return;
    }

    const nextNumber = generateRandomNumber();
    setState(prev => ({
      ...prev,
      currentNumber: nextNumber,
      numbersShown: [...prev.numbersShown, nextNumber],
      isShowing: true,
    }));
  };

  useEffect(() => {
    startPractice();
  }, []);

  useEffect(() => {
    if (state.isShowing && !state.isComplete) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, isShowing: false }));
        
        const nextTimer = setTimeout(() => {
          showNextNumber();
        }, 500); // Half second gap between numbers

        return () => clearTimeout(nextTimer);
      }, config.timeBetweenNumbers * 1000);

      return () => clearTimeout(timer);
    }
  }, [state.isShowing, state.isComplete, state.numbersShown.length]);

  if (state.isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Práctica Completada
          </h2>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">Números mostrados:</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {state.numbersShown.map((num, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-blue-900 text-lg mb-2">Total de la suma:</p>
              <p className="text-4xl font-light text-blue-900">
                {state.total}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onComplete}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all"
            >
              Nueva Práctica
            </button>
            <button
              onClick={startPractice}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all"
            >
              Repetir Práctica
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="mb-8">
          <p className="text-gray-600 text-lg mb-2">
            Número {state.numbersShown.length} de {config.numberOfNumbers}
          </p>
          <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${(state.numbersShown.length / config.numberOfNumbers) * 100}%`
              }}
            />
          </div>
        </div>

        <div
          className={`text-8xl font-light text-gray-900 transition-all duration-500 ${
            state.isShowing ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {state.currentNumber}
        </div>

        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            Usa tu soroban para sumar este número
          </p>
        </div>
      </div>
    </div>
  );
} 