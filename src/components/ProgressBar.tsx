interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center font-medium">
        进度：已完成 {progress}%
      </p>
    </div>
  );
}
