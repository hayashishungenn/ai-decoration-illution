import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export function PageHeader({
  step,
  totalSteps,
  title,
  subtitle,
  showBack = true,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="px-5 pt-6 pb-2 bg-white">
      <div className="flex items-center gap-3 mb-6">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <div className="flex-1 text-center">
          <span className="text-base text-gray-300 font-semibold">
            第 {step} / {totalSteps} 步
          </span>
        </div>
        <div className="w-10" />
      </div>

      <h1 className="text-[26px] font-bold text-gray-900 mb-2 leading-snug">{title}</h1>
      
      {subtitle && (
        <p className="text-sm text-gray-400 font-medium">{subtitle}</p>
      )}
    </header>
  );
}
