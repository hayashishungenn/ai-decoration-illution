import type { ReactNode } from 'react';

interface BottomActionBarProps {
  children: ReactNode;
  className?: string;
}

export function BottomActionBar({ children, className = '' }: BottomActionBarProps) {
  return (
    <div className={`
      fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100
      safe-area-bottom z-50
      ${className}
    `}>
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}
