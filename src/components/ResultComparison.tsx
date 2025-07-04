import { useState } from 'react';

interface ResultComparisonProps {
  correctTotal: number;
  onResultSubmit: (userResult: number, isCorrect: boolean, difference: number) => void;
  onSkip: () => void;
  beginnerMode?: boolean;
}

export function ResultComparison({ correctTotal, onResultSubmit, onSkip, beginnerMode }: ResultComparisonProps) {
  const [userResult, setUserResult] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<null | { correct: boolean; value: number }>(null);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputDisabled) return;
    const result = parseInt(userResult);
    if (isNaN(result)) {
      setError('Por favor ingresa un número válido');
      return;
    }
    const difference = Math.abs(result - correctTotal);
    const isCorrect = result === correctTotal;
    setIsSubmitted(true);
    setInputDisabled(true);
    setFeedback({ correct: isCorrect, value: result });
    setTimeout(() => {
      onResultSubmit(result, isCorrect, difference);
    }, 1500);
  };

  const handleSkip = () => {
    setInputDisabled(true);
    setTimeout(() => {
      onSkip();
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center dark:bg-gray-800/90">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6">
          ¿Cuál fue tu resultado?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tu suma total:
            </label>
            <input
              type="number"
              value={userResult}
              onChange={(e) => {
                setUserResult(e.target.value);
                setError('');
              }}
              className="input-field text-center text-2xl font-light"
              placeholder="0"
              autoFocus
              disabled={inputDisabled}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 btn-primary"
              disabled={inputDisabled}
            >
              Verificar Resultado
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="btn-secondary"
              disabled={inputDisabled}
            >
              Saltar
            </button>
          </div>
        </form>
        {feedback && (
          <div
            className={`mt-6 p-4 rounded-xl text-lg font-semibold flex flex-col items-center justify-center transition-all duration-500
              ${feedback.correct ? 'bg-green-100 text-green-700 scale-105 opacity-100' : 'bg-red-100 text-red-700 scale-105 opacity-100'}`}
          >
            {feedback.correct ? (
              <>
                <span className="text-3xl mb-1 animate-bounce">✅</span>
                ¡Correcto!
              </>
            ) : (
              <>
                <span className="text-3xl mb-1 animate-shake">❌</span>
                Ups, era <b>{correctTotal}</b>{' '}
                {beginnerMode && (
                  <span>— tú pusiste <b>{feedback.value}</b></span>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Animación shake para feedback incorrecto
// Agrega esto a tu CSS global o tailwind.config.js:
// @keyframes shake { 0% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-8px); } 80% { transform: translateX(8px); } 100% { transform: translateX(0); } }
// .animate-shake { animation: shake 0.5s; } 