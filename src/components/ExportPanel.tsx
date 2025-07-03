import { PracticeSession } from '../types';

interface ExportPanelProps {
  sessions: PracticeSession[];
}

export function ExportPanel({ sessions }: ExportPanelProps) {
  const exportToCSV = () => {
    if (sessions.length === 0) {
      alert('No hay sesiones para exportar');
      return;
    }

    const headers = [
      'Fecha',
      'Hora',
      'Números Mostrados',
      'Total Correcto',
      'Resultado Usuario',
      'Es Correcto',
      'Diferencia',
      'Duración (segundos)',
      'Tiempo Entre Números',
      'Cantidad de Números',
      'Rango Mínimo',
      'Rango Máximo',
      'Voz Activada',
      'Modo Oscuro',
      'Suma en Tiempo Real',
      'Estilo Visual',
    ];

    const csvContent = [
      headers.join(','),
      ...sessions.map(session => {
        const date = new Date(session.date);
        return [
          date.toLocaleDateString('es-ES'),
          date.toLocaleTimeString('es-ES'),
          session.numbers.join(';'),
          session.total,
          session.userResult || '',
          session.isCorrect ? 'Sí' : 'No',
          session.difference || '',
          session.duration,
          session.config.timeBetweenNumbers,
          session.config.numberOfNumbers,
          session.config.minNumber,
          session.config.maxNumber,
          session.config.voiceEnabled ? 'Sí' : 'No',
          session.config.darkMode ? 'Sí' : 'No',
          session.config.showRealTimeSum ? 'Sí' : 'No',
          session.config.visualStyle,
        ].join(',');
      }),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `soroban-sessions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyAsTable = async () => {
    if (sessions.length === 0) {
      alert('No hay sesiones para copiar');
      return;
    }

    const headers = [
      'Fecha',
      'Números',
      'Total',
      'Usuario',
      'Correcto',
      'Duración',
    ];

    const tableRows = [
      headers.join('\t'),
      ...sessions.slice(0, 20).map(session => {
        const date = new Date(session.date);
        return [
          date.toLocaleDateString('es-ES'),
          session.numbers.join(', '),
          session.total,
          session.userResult || '-',
          session.isCorrect ? '✅' : '❌',
          `${session.duration}s`,
        ].join('\t');
      }),
    ];

    const tableText = tableRows.join('\n');

    try {
      await navigator.clipboard.writeText(tableText);
      alert('Tabla copiada al portapapeles');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Error al copiar al portapapeles');
    }
  };

  const getSummaryStats = () => {
    if (sessions.length === 0) return null;

    const totalSessions = sessions.length;
    const exactMatches = sessions.filter(s => s.isCorrect).length;
    const totalPracticeTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalNumbers = sessions.reduce((sum, s) => sum + s.numbers.length, 0);
    const averageAccuracy = exactMatches / totalSessions;

    return {
      totalSessions,
      exactMatches,
      totalPracticeTime,
      totalNumbers,
      averageAccuracy,
    };
  };

  const stats = getSummaryStats();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
          Exportar Progreso
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Descarga tu historial de sesiones para análisis o respaldo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg dark:bg-gray-800/90">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Exportar CSV
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Descarga todas las sesiones en formato CSV para análisis detallado
            </p>
          </div>
          
          <button
            onClick={exportToCSV}
            className="w-full btn-primary"
            disabled={sessions.length === 0}
          >
            Descargar CSV ({sessions.length} sesiones)
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg dark:bg-gray-800/90">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Copiar Tabla
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Copia las últimas 20 sesiones como tabla para pegar en Excel
            </p>
          </div>
          
          <button
            onClick={copyAsTable}
            className="w-full btn-secondary"
            disabled={sessions.length === 0}
          >
            Copiar Tabla
          </button>
        </div>
      </div>

      {stats && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Resumen de Datos a Exportar
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 dark:text-white">
                {stats.totalSessions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sesiones
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 dark:text-white">
                {stats.exactMatches}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Aciertos
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 dark:text-white">
                {Math.floor(stats.totalPracticeTime / 60)}m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tiempo Total
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 dark:text-white">
                {(stats.averageAccuracy * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Precisión
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-yellow-600 dark:text-yellow-400 text-lg">💡</span>
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Consejos para el análisis
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Usa Excel o Google Sheets para analizar los datos</li>
              <li>• Crea gráficos de progreso y tendencias</li>
              <li>• Identifica patrones en tu rendimiento</li>
              <li>• Comparte con profesores o mentores</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 