import { PracticeSession } from '../types';

interface SessionHistoryProps {
  sessions: PracticeSession[];
  onRepeatSession: (session: PracticeSession) => void;
  onDeleteSession: (id: string) => void;
  onClearHistory: () => void;
}

export function SessionHistory({ sessions, onRepeatSession, onDeleteSession, onClearHistory }: SessionHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-600 text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No hay sesiones registradas
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Completa tu primera práctica para ver el historial aquí
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">
          Historial de Prácticas
        </h2>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Limpiar historial
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg 
                     dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700
                     hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {session.isCorrect ? '✅' : session.userResult ? '❌' : '📝'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {session.config.numberOfNumbers === -1 ? 'Entrenamiento Libre' : `${session.config.numberOfNumbers} números`}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(session.date)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {session.total}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDuration(session.duration)}
                </div>
              </div>
            </div>

            {session.userResult !== undefined && (
              <div className="mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tu resultado:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{session.userResult}</span>
                </div>
                {session.difference !== undefined && (
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Diferencia:</span>
                    <span className={`font-medium ${session.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {session.isCorrect ? 'Correcto' : `±${Math.abs(session.difference)}`}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => onRepeatSession(session)}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-xl font-medium 
                         hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Repetir Sesión
              </button>
              <button
                onClick={() => onDeleteSession(session.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
                aria-label="Eliminar sesión"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 