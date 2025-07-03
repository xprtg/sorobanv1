import { WeeklyChallenge } from '../types';

interface WeeklyChallengePanelProps {
  challenge: WeeklyChallenge | null;
}

export function WeeklyChallengePanel({ challenge }: WeeklyChallengePanelProps) {
  if (!challenge) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg dark:bg-gray-800/90">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">
            No hay desafío activo
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            El próximo desafío semanal aparecerá pronto
          </p>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-orange-500',
    hard: 'bg-red-500',
  };

  const difficultyNames = {
    easy: 'Fácil',
    medium: 'Intermedio',
    hard: 'Difícil',
  };

  const progressPercentage = (challenge.progress / challenge.goal) * 100;
  const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
          Desafío Semanal
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Completa el desafío para desbloquear recompensas especiales
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg dark:bg-gray-800/90">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${difficultyColors[challenge.difficulty]}`}>
                {difficultyNames[challenge.difficulty]}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {daysLeft} días restantes
              </div>
            </div>
            
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
              {challenge.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {challenge.description}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-2">{challenge.reward}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Recompensa</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progreso
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {challenge.progress} / {challenge.goal}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                challenge.completed 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-blue-400 to-cyan-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {challenge.timeLimit && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">⏱️</span>
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Límite de tiempo: {challenge.timeLimit} segundos
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {challenge.completed ? (
              <span className="text-green-600 dark:text-green-400 font-medium">
                ✅ Desafío completado
              </span>
            ) : (
              <span>
                {Math.ceil(challenge.goal - challenge.progress)} objetivo{Math.ceil(challenge.goal - challenge.progress) !== 1 ? 's' : ''} restante{Math.ceil(challenge.goal - challenge.progress) !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {challenge.completed && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-lg">🎉</span>
              <span className="text-sm font-medium">¡Desafío completado!</span>
            </div>
          )}
        </div>
      </div>

      {/* Challenge tips */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          💡 Consejos para completar el desafío
        </h4>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {challenge.id.includes('speed') && (
            <p>• Practica con números más pequeños para aumentar la velocidad</p>
          )}
          {challenge.id.includes('accuracy') && (
            <p>• Tómate tu tiempo para verificar cada resultado</p>
          )}
          {challenge.id.includes('consistency') && (
            <p>• Establece una rutina diaria de práctica</p>
          )}
          {challenge.id.includes('pro') && (
            <p>• Asegúrate de estar preparado para el nivel Pro</p>
          )}
          {challenge.id.includes('marathon') && (
            <p>• Usa el modo libre para practicar sin límites</p>
          )}
          {challenge.id.includes('perfect') && (
            <p>• Enfócate en la precisión más que en la velocidad</p>
          )}
        </div>
      </div>
    </div>
  );
} 