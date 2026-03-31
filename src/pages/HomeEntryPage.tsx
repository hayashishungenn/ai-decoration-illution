import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BizCard } from '../components/BizCard';
import { bizOptions } from '../data/mockData';
import { useDecorStore } from '../store/useDecorStore';

export function HomeEntryPage() {
  const navigate = useNavigate();
  const setBizType = useDecorStore((state) => state.setBizType);

  const handleBizSelect = (bizType: 'home' | 'office') => {
    setBizType(bizType);
    navigate('/area');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 状态栏 */}
      <div className="h-11 bg-white" />
      
      {/* 主要内容 */}
      <main className="px-5 pb-8">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-[32px] font-bold leading-tight mb-2">
            <span className="text-gray-900">开启您的</span>
            <br />
            <span className="text-primary-500">灵感装修之旅</span>
          </h1>
          
          <p className="text-gray-400 text-sm mt-3 font-medium">
            2026 AI 驱动的全案定制系统
          </p>
        </motion.div>

        {/* 业务卡片列表 */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {bizOptions.map((biz, index) => (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <BizCard
                image={biz.image}
                title={biz.name}
                subtitle={biz.subtitle}
                onClick={() => handleBizSelect(biz.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 更多场景入口 */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="text-primary-500 text-sm font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <span>更多场景</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
