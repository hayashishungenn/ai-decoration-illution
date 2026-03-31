import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDecorStore } from '../store/useDecorStore';

export function GeneratingPage() {
  const navigate = useNavigate();
  const { setIsGenerating, setGeneratedAt } = useDecorStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsGenerating(true);
    setGeneratedAt(new Date().toISOString());

    // 模拟进度增长
    const startTime = Date.now();
    const duration = 2500; // 2.5 秒

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 99, 99);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          setIsGenerating(false);
          navigate('/result');
        }, 300);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [navigate, setIsGenerating, setGeneratedAt]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-xs"
      >
        {/* 加载动画 - 绿色圆环 */}
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
        </div>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-white mb-3"
        >
          AI 正在为您智绘方案...
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-sm leading-relaxed mb-8"
        >
          基于 2026 年最新装修模型，正在优化光影效果、材质纹理及软装布局
        </motion.p>

        {/* 底部进度条 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>拓扑生成</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
