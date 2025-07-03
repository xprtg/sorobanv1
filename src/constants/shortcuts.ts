import { KeyboardShortcut } from '../types';

export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  {
    key: 'Space',
    action: 'Iniciar/Pausar práctica',
    description: 'Controla el flujo de la práctica',
  },
  {
    key: 'Escape',
    action: 'Salir',
    description: 'Regresa al menú principal',
  },
  {
    key: 'Enter',
    action: 'Confirmar',
    description: 'Confirma acciones en formularios',
  },
  {
    key: '1-5',
    action: 'Seleccionar preset',
    description: 'Selecciona rápidamente un nivel de dificultad',
  },
  {
    key: 'H',
    action: 'Ir a Historial',
    description: 'Navega al historial de sesiones',
  },
  {
    key: 'A',
    action: 'Ir a Logros',
    description: 'Navega a la sección de logros',
  },
  {
    key: 'S',
    action: 'Ir a Estadísticas',
    description: 'Navega a las estadísticas',
  },
  {
    key: 'C',
    action: 'Ir a Desafíos',
    description: 'Navega a los desafíos semanales',
  },
  {
    key: 'D',
    action: 'Alternar modo oscuro',
    description: 'Cambia entre tema claro y oscuro',
  },
  {
    key: 'V',
    action: 'Alternar voz',
    description: 'Activa/desactiva la lectura por voz',
  },
]; 