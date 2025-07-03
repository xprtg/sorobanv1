import { UserStats } from '../types';

interface StatsPanelProps {
  stats: UserStats;
  formatTime: (seconds: number) => string;
  formatAccuracy: (accuracy: number) => string;
}

export function StatsPanel({ stats, formatTime, formatAccuracy }: StatsPanelProps) {
  const statCards = [
    {
      title: 'Sesiones Totales',
      value: stats.totalSessions.toString(),
      icon: '📊',
      color: 'bg-blue-500',
      description: 'Prácticas completadas',
    },
    {
      title: 'Tiempo Total',
      value: formatTime(stats.totalPracticeTime),
      icon: '⏱️',
      color: 'bg-green-500',
      description: 'Tiempo de práctica acumulado',
    },
    {
      title: 'Aciertos Exactos',
      value: stats.exactMatches.toString(),
      icon: '🎯',
      color: 'bg-yellow-500',
      description: 'Resultados perfectos',
    },
    {
      title: 'Racha Actual',
      value: stats.currentStreak.toString(),
      icon: '🔥',
      color: 'bg-orange-500',
      description: 'Días consecutivos',
    },
    {
      title: 'Mejor Racha',
      value: stats.bestStreak.toString(),
      icon: '🏆',
      color: 'bg-purple-500',
      description: 'Racha más larga',
    },
    {
      title: 'Precisión Promedio',
      value: formatAccuracy(stats.averageAccuracy),
      icon: '📈',
      color: 'bg-indigo-500',
      description: 'Porcentaje de aciertos',
    },
    {
      title: 'Números Practicados',
      value: stats.totalNumbersPracticed.toString(),
      icon: '🔢',
      color: 'bg-pink-500',
      description: 'Total de números sumados',
    },
    {
      title: 'Última Práctica',
      value: stats.lastPracticeDate ? new Date(stats.lastPracticeDate).toLocaleDateString('es-ES') : 'Nunca',
      icon: '📅',
      color: 'bg-teal-500',
      description: 'Fecha de última sesión',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
          Estadísticas de Práctica
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tu progreso y rendimiento en el tiempo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800/90"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
                {card.icon}
              </div>
            </div>
            
            <div className="mb-2">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white">
                {card.value}
              </h3>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {card.title}
              </p>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Resumen de Rendimiento
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Promedio por sesión:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.totalSessions > 0 ? formatTime(stats.totalPracticeTime / stats.totalSessions) : '0s'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Números por sesión:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.totalSessions > 0 ? Math.round(stats.totalNumbersPracticed / stats.totalSessions) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tasa de éxito:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatAccuracy(stats.averageAccuracy)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Logros Destacados
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Racha actual de {stats.currentStreak} días
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.exactMatches} aciertos exactos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(stats.totalPracticeTime)} de práctica total
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 