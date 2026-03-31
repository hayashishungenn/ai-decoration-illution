interface LoadingRingProps {
  progress: number;
}

export function LoadingRing({ progress }: LoadingRingProps) {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* 外环 */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-800" />
      
      {/* 旋转的绿色圆环 */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-500 border-r-green-500 animate-spin" style={{ animationDuration: '1.5s' }} />
      
      {/* 内环光晕 */}
      <div className="absolute inset-4 rounded-full border-2 border-green-500/30 animate-pulse" />
      
      {/* 中心图标 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* 进度百分比 */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm text-green-500 font-medium">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
