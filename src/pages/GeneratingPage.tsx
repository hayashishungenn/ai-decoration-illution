import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RouteGuard } from '../components/RouteGuard';
import { useDecorStore } from '../store/useDecorStore';
import { canEnterGenerating } from '../utils/flow';

function GeneratingPageContent() {
  const navigate = useNavigate();
  const { formState, setIsGenerating, setGeneratedAt } = useDecorStore();
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);

  // 清理函数
  const cleanup = useCallback(() => {
    setIsGenerating(false);
  }, [setIsGenerating]);

  // Effect 1: 只负责启动生成（一次性）
  useEffect(() => {
    // 只依赖必要的前置条件，不依赖整个 formState
    const hasPrerequisites = 
      formState.bizType && 
      formState.area && 
      formState.budget && 
      formState.style;

    if (!hasPrerequisites || startedRef.current) {
      return;
    }

    startedRef.current = true;
    setIsGenerating(true);
    setGeneratedAt(new Date().toISOString());
  }, [
    formState.bizType,
    formState.area,
    formState.budget,
    formState.style,
    setIsGenerating,
    setGeneratedAt,
  ]);

  // Effect 2: 只负责进度动画
  useEffect(() => {
    if (!startedRef.current) {
      return;
    }

    const startTime = Date.now();
    const duration = 2500; // 2.5 秒
    let animationFrameId: number | null = null;
    let completionTimer: ReturnType<typeof setTimeout> | null = null;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 99, 99);
      setProgress(newProgress);

      if (elapsed >= duration) {
        // 生成完成，延迟后跳转
        completionTimer = setTimeout(() => {
          cleanup();
          navigate('/result');
        }, 300);
      } else {
        // 继续使用 requestAnimationFrame 更新
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    // 启动进度更新
    animationFrameId = requestAnimationFrame(updateProgress);

    // 清理函数
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (completionTimer) {
        clearTimeout(completionTimer);
      }
    };
  }, [navigate, cleanup]);

  // 如果状态不完整，显示加载状态
  if (!canEnterGenerating(formState)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">正在准备生成...</p>
        </div>
      </div>
    );
  }

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

// 导出带路由守卫的页面组件
export function GeneratingPage() {
  return (
    <RouteGuard requiredStep={4}>
      <GeneratingPageContent />
    </RouteGuard>
  );
}
