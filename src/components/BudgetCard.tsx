import type { Budget } from '../data/mockData';

interface BudgetCardProps {
  budget: Budget;
  selected: boolean;
  onClick: () => void;
}

export function BudgetCard({ budget, selected, onClick }: BudgetCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative p-5 rounded-2xl cursor-pointer
        transition-all duration-300
        ${selected
          ? 'bg-green-50 border-2 border-green-500 shadow-lg'
          : 'bg-white border-2 border-gray-100 shadow-card hover:shadow-soft'
        }
      `}
    >
      {/* 推荐标签 */}
      {budget.recommended && (
        <div className={`
          absolute -top-3 right-4 px-3 py-1 text-xs font-semibold rounded-full
          transition-colors duration-300
          ${selected
            ? 'bg-green-500 text-white'
            : 'bg-green-500 text-white'
          }
        `}>
          推荐
        </div>
      )}

      {/* 头部区域 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* 图标 */}
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center
            transition-all duration-300
            ${selected ? 'bg-green-500' : 'bg-gray-50'}
          `}>
            {budget.id === 'luxury' && (
              <svg className={`w-7 h-7 ${selected ? 'text-white' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
            {budget.id === 'standard' && (
              <svg className={`w-7 h-7 ${selected ? 'text-white' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M12 6a1 1 0 10-2 0v3.586L7.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 9.586V6z" />
                <path d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z" />
              </svg>
            )}
            {budget.id === 'basic' && (
              <svg className={`w-7 h-7 ${selected ? 'text-white' : 'text-blue-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {/* 标题和标签 */}
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1.5 ${selected ? 'text-green-700' : 'text-gray-900'}`}>
              {budget.name}
            </h3>
            <span className={`
              inline-block px-3 py-1 text-xs font-semibold rounded-full
              ${budget.tagColor || 'bg-gray-100 text-gray-600'}
            `}>
              {budget.tag}
            </span>
          </div>
        </div>
      </div>

      {/* 描述 */}
      <p className={`text-sm mb-5 leading-relaxed ${selected ? 'text-green-700' : 'text-gray-600'}`}>
        {budget.description}
      </p>

      {/* 价格和工期 */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.312-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.312.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
          <span className={`text-sm font-semibold ${selected ? 'text-green-600' : 'text-gray-700'}`}>
            {budget.priceText}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <span className={`text-sm ${selected ? 'text-green-600' : 'text-gray-500'}`}>
            {budget.durationText}
          </span>
        </div>
      </div>
    </div>
  );
}
