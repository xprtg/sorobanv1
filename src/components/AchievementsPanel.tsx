import { Achievement } from '../types';

interface AchievementsPanelProps {
  achievements: Achievement[];
}

export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  const categories = ['beginner', 'intermediate', 'advanced', 'expert'];
  const categoryNames = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    expert: 'Experto',
  };

  const categoryColors = {
    beginner: 'from-green-400 to-emerald-500',
    intermediate: 'from-blue-400 to-cyan-500',
    advanced: 'from-purple-400 to-pink-500',
    expert: 'from-yellow-400 to-orange-500',
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
          Logros y Medallas
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Desbloquea logros completando desafíos y mejorando tus habilidades
        </p>
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg dark:bg-gray-800/90">
          <span className="text-2xl">🏆</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {unlockedCount} de {totalCount} logros desbloqueados
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map(category => {
          const categoryAchievements = achievements.filter(a => a.category === category);
          const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length;
          
          return (
            <div key={category} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg dark:bg-gray-800/90">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {unlockedInCategory}/{categoryAchievements.length}
                  </span>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-2 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-full transition-all duration-500`}
                      style={{
                        width: `${(unlockedInCategory / categoryAchievements.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? 'border-transparent bg-gradient-to-br from-white to-gray-50 shadow-lg dark:from-gray-700 dark:to-gray-800'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                          achievement.unlocked
                            ? `${achievement.color} text-white shadow-lg`
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm mb-1 transition-colors ${
                          achievement.unlocked
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-xs mb-2 transition-colors ${
                          achievement.unlocked
                            ? 'text-gray-600 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-500 ${
                                achievement.unlocked
                                  ? achievement.color
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              style={{
                                width: `${(achievement.progress / achievement.maxProgress) * 100}%`
                              }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            achievement.unlocked
                              ? 'text-gray-600 dark:text-gray-300'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                      </div>
                    </div>

                    {achievement.unlocked && achievement.unlockedDate && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 