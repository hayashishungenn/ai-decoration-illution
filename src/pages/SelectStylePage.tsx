import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { ProgressBar } from '../components/ProgressBar';
import { BottomActionBar } from '../components/BottomActionBar';
import { StyleCard } from '../components/StyleCard';
import { styles } from '../data/mockData';
import { useDecorStore } from '../store/useDecorStore';

export function SelectStylePage() {
  const navigate = useNavigate();
  const { formState, setStyle } = useDecorStore();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(formState.style);

  const handleGenerate = () => {
    if (selectedStyle) {
      setStyle(selectedStyle as 'european' | 'chinese' | 'modern' | 'cream');
      navigate('/generating');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <PageHeader
        step={3}
        totalSteps={4}
        title="哪种设计美学更吸引您？"
        subtitle="点击预览大图，AI 将依此生成专属效果"
      />

      <main className="px-5 pt-2">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <StyleCard
                image={style.image}
                title={style.name}
                subtitle={style.subtitle}
                selected={selectedStyle === style.id}
                onClick={() => setSelectedStyle(style.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 底部操作栏 */}
      <BottomActionBar>
        <ProgressBar progress={75} className="mb-4" />
        <button
          onClick={handleGenerate}
          disabled={!selectedStyle}
          className={`
            w-full py-4 rounded-xl font-semibold text-base
            transition-all duration-300
            ${selectedStyle
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          生成方案
        </button>
      </BottomActionBar>
    </div>
  );
}
