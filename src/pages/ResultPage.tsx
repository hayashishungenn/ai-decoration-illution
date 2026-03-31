import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RouteGuard } from '../components/RouteGuard';
import { BottomActionBar } from '../components/BottomActionBar';
import { SuggestionList } from '../components/SuggestionList';
import { useDecorStore } from '../store/useDecorStore';
import { generateSuggestions } from '../utils/suggestion';
import {
  formatDate,
  getBudgetPrice,
  getBudgetName,
  getStyleName,
  getAreaName,
} from '../utils/format';
import { canEnterResult } from '../utils/flow';

function ResultPageContent() {
  const navigate = useNavigate();
  const { formState, resetToHome } = useDecorStore();
  const [showToast, setShowToast] = useState(false);

  // 前置校验：如果状态不完整，重定向到相应页面
  useEffect(() => {
    if (!canEnterResult(formState)) {
      if (!formState.bizType) {
        navigate('/', { replace: true });
      } else if (!formState.area) {
        navigate('/area', { replace: true });
      } else if (!formState.budget) {
        navigate('/budget', { replace: true });
      } else if (!formState.style) {
        navigate('/style', { replace: true });
      }
    }
  }, [formState, navigate]);

  // 安全地获取数据，提供默认值
  const budget = formState.budget || 'standard';
  const style = formState.style || 'cream';
  const area = formState.area || 'living-room';

  const suggestions = generateSuggestions(area, budget, style);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRestart = () => {
    resetToHome();
    navigate('/');
  };

  // 如果数据不完整，显示加载状态
  if (!canEnterResult(formState)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">正在加载方案...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero 区域 - 深蓝色背景 */}
      <div className="relative h-64 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 overflow-hidden">
        {/* 3D 户型图装饰 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <path
              d="M50 200 L100 150 L300 150 L350 200 L350 250 L300 200 L100 200 L50 250 Z"
              fill="#94a3b8"
              opacity="0.5"
            />
            <rect x="120" y="160" width="60" height="30" fill="#64748b" opacity="0.6" />
            <rect x="220" y="160" width="60" height="30" fill="#64748b" opacity="0.6" />
          </svg>
        </div>

        {/* 返回首页按钮 */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        {/* 标题区域 */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pb-5">
          <h1 className="text-2xl font-bold text-white mb-1.5">您的专属装修方案</h1>
          <p className="text-white/60 text-sm font-medium">
            生成时间：{formatDate(formState.generatedAt)}
          </p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <motion.main
        className="px-5 -mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 设计参数卡片 */}
        <div className="bg-white rounded-2xl shadow-card p-5 mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">设计参数</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {/* 选择空间 */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium">选择空间</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {getAreaName(area)}
              </p>
            </div>

            {/* 装修档次 */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium">装修档次</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {getBudgetName(budget)}
              </p>
            </div>

            {/* 风格流派 */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium">风格流派</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {getStyleName(style)}
              </p>
            </div>

            {/* 预估单价 */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.312-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.312.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium">预估单价</span>
              </div>
              <p className="text-base font-bold text-gray-900">
                {getBudgetPrice(budget)}
              </p>
            </div>
          </div>
        </div>

        {/* AI 专家建议 */}
        <div className="bg-white rounded-2xl shadow-card p-5 mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">AI 专家建议</h2>
          <SuggestionList suggestions={suggestions} />
        </div>
      </motion.main>

      {/* 底部操作栏 */}
      <BottomActionBar>
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex-1 py-4 rounded-xl font-semibold text-base border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            重新选择
          </button>
          <button
            onClick={handleSave}
            className="flex-[2] py-4 rounded-xl font-semibold text-base bg-green-500 text-white hover:bg-green-600 shadow-lg transition-colors"
          >
            保存高清方案
          </button>
        </div>
      </BottomActionBar>

      {/* Toast 提示 */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 text-white text-sm rounded-full shadow-lg"
        >
          已为您保存高清方案
        </motion.div>
      )}
    </div>
  );
}

// 导出带路由守卫的页面组件
export function ResultPage() {
  return (
    <RouteGuard requiredStep={5}>
      <ResultPageContent />
    </RouteGuard>
  );
}
