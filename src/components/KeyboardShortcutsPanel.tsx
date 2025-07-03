import { KeyboardShortcut } from '../types';
import { KEYBOARD_SHORTCUTS } from '../constants/shortcuts';

export function KeyboardShortcutsPanel() {
  const categories = [
    {
      title: 'Navegación',
      shortcuts: KEYBOARD_SHORTCUTS.filter(s => 
        ['Escape', 'H', 'A', 'S', 'C'].includes(s.key)
      ),
    },
    {
      title: 'Práctica',
      shortcuts: KEYBOARD_SHORTCUTS.filter(s => 
        ['Space', 'Enter', '1', '2', '3', '4', '5'].includes(s.key)
      ),
    },
    {
      title: 'Configuración',
      shortcuts: KEYBOARD_SHORTCUTS.filter(s => 
        ['D', 'V'].includes(s.key)
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
          Atajos de Teclado
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Acelera tu práctica con estos atajos útiles
        </p>
      </div>

      <div className="space-y-6">
        {categories.map(category => (
          <div key={category.title} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg dark:bg-gray-800/90">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {category.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.shortcuts.map(shortcut => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {shortcut.action}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {shortcut.description}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500">
                      {shortcut.key}
                    </kbd>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          💡 Consejos de uso
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>• Los atajos funcionan en cualquier pantalla de la aplicación</p>
          <p>• Usa <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">Space</kbd> para controlar rápidamente la práctica</p>
          <p>• Presiona <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">1-5</kbd> para seleccionar presets rápidamente</p>
          <p>• Usa <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">Escape</kbd> para volver al menú principal</p>
        </div>
      </div>
    </div>
  );
} 