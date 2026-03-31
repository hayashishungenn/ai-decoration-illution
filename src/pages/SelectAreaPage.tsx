import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { ProgressBar } from '../components/ProgressBar';
import { BottomActionBar } from '../components/BottomActionBar';
import { areas } from '../data/mockData';
import { useDecorStore } from '../store/useDecorStore';

export function SelectAreaPage() {
  const navigate = useNavigate();
  const { formState, setArea } = useDecorStore();
  const [selectedArea, setSelectedArea] = useState(formState.area || '');

  const handleNext = () => {
    if (selectedArea) {
      setArea(selectedArea);
      navigate('/budget');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <PageHeader
        step={1}
        totalSteps={4}
        title="您想装修哪个区域？"
        subtitle="我们将根据空间特性匹配最佳设计参数"
      />

      <main className="px-5">
        {/* 专业建议 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-5 bg-gray-50 rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-green-400 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">专业建议</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                如果是整体装修，请先选择最重要的核心空间。AI 将以此空间作为全屋的主色调基准。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 区域列表 */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {areas.map((areaItem, index) => (
            <motion.div
              key={areaItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => setSelectedArea(areaItem.id)}
              className={`
                flex items-center gap-4 p-3 rounded-2xl cursor-pointer
                transition-all duration-300
                ${selectedArea === areaItem.id
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                }
              `}
            >
              {/* 圆形图片 */}
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden">
                <img
                  src={areaItem.image}
                  alt={areaItem.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* 区域名称 */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {areaItem.name}
                </h3>
                {areaItem.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {areaItem.description}
                  </p>
                )}
              </div>

              {/* 添加按钮 */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                transition-all duration-300
                ${selectedArea === areaItem.id
                  ? 'bg-green-500'
                  : 'bg-gray-100'
                }
              `}>
                {selectedArea === areaItem.id ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 底部操作栏 */}
      <BottomActionBar>
        <ProgressBar progress={25} className="mb-4" />
        <button
          onClick={handleNext}
          disabled={!selectedArea}
          className={`
            w-full py-4 rounded-xl font-semibold text-base
            transition-all duration-300
            ${selectedArea
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          下一步
        </button>
      </BottomActionBar>
    </div>
  );
}
