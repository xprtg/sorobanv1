import { useState } from 'react';

interface ResultComparisonProps {
  correctTotal: number;
  onResultSubmit: (userResult: number, isCorrect: boolean, difference: number) => void;
  onSkip: () => void;
}

export function ResultComparison({ correctTotal, onResultSubmit, onSkip }: ResultComparisonProps) {
  const [userResult, setUserResult] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = parseInt(userResult);
    
    if (isNaN(result)) {
      setError('Por favor ingresa un número válido');
      return;
    }

    const difference = Math.abs(result - correctTotal);
    const isCorrect = result === correctTotal;
    
    setIsSubmitted(true);
    onResultSubmit(result, isCorrect, difference);
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
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Verificar Resultado
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="btn-secondary"
            >
              Saltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 