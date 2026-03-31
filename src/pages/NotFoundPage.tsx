import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3 秒后自动返回首页
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 图标 */}
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* 标题 */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-2">页面未找到</p>
        <p className="text-sm text-gray-400 mb-8">
          抱歉，您访问的页面不存在或已被移除
        </p>

        {/* 返回首页按钮 */}
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg"
        >
          返回首页
        </button>

        {/* 倒计时提示 */}
        <p className="text-xs text-gray-400 mt-4">
          将在 3 秒后自动返回首页...
        </p>
      </motion.div>
    </div>
  );
}
