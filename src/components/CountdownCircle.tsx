interface CountdownCircleProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
}

export function CountdownCircle({ duration, isActive, onComplete }: CountdownCircleProps) {
  if (!isActive) return null;

  return (
    <div className="absolute top-4 left-4 w-12 h-12">
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-blue-500 animate-countdown"
          style={{
            strokeDasharray: 113,
            strokeDashoffset: 113,
            animationDuration: `${duration}s`,
          }}
          onAnimationEnd={onComplete}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {duration}s
        </span>
      </div>
    </div>
  );
} 