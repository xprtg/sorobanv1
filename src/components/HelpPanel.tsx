import React from 'react';
import { t } from '../utils/i18n';
import { ModalBase } from './ModalBase';

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('help.title')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-80px)]">
        {/* Getting Started */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">🚀</span>
            {t('help.getting_started')}
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-lg font-bold text-blue-500">1.</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    Selecciona un modo de práctica
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Comienza con "Fácil" para familiarizarte con la app. Los números aparecerán uno por uno y tendrás tiempo para sumarlos mentalmente.
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-lg font-bold text-blue-500">2.</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    Practica con el ábaco mental
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Visualiza el ábaco japonés en tu mente. Cada número que aparece debe ser sumado al total acumulado.
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-lg font-bold text-blue-500">3.</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    Ingresa tu resultado
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Al final de la secuencia, ingresa la suma total que calculaste. La app te mostrará si estuviste correcto.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Modes */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">🎯</span>
            {t('help.practice_modes')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🌱</span>
                <h4 className="font-semibold text-gray-900 dark:text-white">Fácil</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                5 números, 3 segundos entre cada uno. Perfecto para principiantes.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">⚡</span>
                <h4 className="font-semibold text-gray-900 dark:text-white">Intermedio</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                10 números, 2 segundos entre cada uno. Para practicantes regulares.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🔥</span>
                <h4 className="font-semibold text-gray-900 dark:text-white">Difícil</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                15 números, 1.5 segundos entre cada uno. Para usuarios avanzados.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">👑</span>
                <h4 className="font-semibold text-gray-900 dark:text-white">Pro</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                20 números, 1 segundo entre cada uno. El máximo desafío.
              </p>
            </div>
          </div>
        </section>

        {/* Achievement System */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">🏆</span>
            {t('help.achievements')}
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Sistema de Niveles</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• Ganas XP por cada número mostrado</div>
                  <div>• Bonus de XP por aciertos exactos</div>
                  <div>• Subes de nivel al alcanzar umbrales</div>
                  <div>• Cada nivel desbloquea recompensas</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Logros por Categorías</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• <span className="font-medium">Progreso:</span> sesiones, rachas diarias</div>
                  <div>• <span className="font-medium">Rendimiento:</span> precisión, velocidad</div>
                  <div>• <span className="font-medium">Desafíos:</span> modos especiales</div>
                  <div>• <span className="font-medium">Estilo:</span> personalización</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips and Tricks */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            {t('help.tips')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Técnica del Ábaco Mental</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div>• Visualiza las cuentas del ábaco</div>
                <div>• Mueve las cuentas mentalmente</div>
                <div>• Practica la posición de las manos</div>
                <div>• Mantén el foco en el total</div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Mejora tu Rendimiento</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div>• Practica regularmente</div>
                <div>• Comienza con números pequeños</div>
                <div>• Usa el modo libre para entrenar</div>
                <div>• Revisa tus errores</div>
              </div>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">⌨️</span>
            {t('help.keyboard_shortcuts')}
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Controles de Práctica</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Espacio</span>
                    <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Iniciar/Pausar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Enter</span>
                    <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Enviar resultado</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Escape</span>
                    <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Salir</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Selección Rápida</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">1-4</span>
                    <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Presets 1-4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">5</span>
                    <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Modo Libre</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">C</span>
                    <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Configuración</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">♿</span>
            Accesibilidad
          </h3>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Características Incluidas</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• Lectura por voz de números</div>
                  <div>• Modo alto contraste</div>
                  <div>• Fuentes accesibles</div>
                  <div>• Tamaños de texto ajustables</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Navegación por Teclado</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• Tab para navegar</div>
                  <div>• Enter para activar</div>
                  <div>• Escape para cerrar</div>
                  <div>• Flechas para seleccionar</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Support */}
        <section className="text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ¿Necesitas ayuda adicional?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Esta app está diseñada para ser intuitiva y fácil de usar. Si tienes preguntas específicas, 
              revisa la sección de configuración o experimenta con los diferentes modos de práctica.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </section>
      </div>
    </ModalBase>
  );
} 