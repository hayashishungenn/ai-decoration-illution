import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { ProgressBar } from '../components/ProgressBar';
import { BottomActionBar } from '../components/BottomActionBar';
import { BudgetCard } from '../components/BudgetCard';
import { budgets } from '../data/mockData';
import { useDecorStore } from '../store/useDecorStore';

export function SelectBudgetPage() {
  const navigate = useNavigate();
  const { formState, setBudget } = useDecorStore();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(formState.budget);

  const handleNext = () => {
    if (selectedBudget) {
      setBudget(selectedBudget as 'luxury' | 'standard' | 'basic');
      navigate('/style');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <PageHeader
        step={2}
        totalSteps={4}
        title="选择装修预算档次"
        subtitle="我们将根据档次为您精选对应价位的建材"
      />

      <main className="px-5 pt-2">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {budgets.map((budget, index) => (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <BudgetCard
                budget={budget}
                selected={selectedBudget === budget.id}
                onClick={() => setSelectedBudget(budget.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 底部操作栏 */}
      <BottomActionBar>
        <ProgressBar progress={50} className="mb-4" />
        <button
          onClick={handleNext}
          disabled={!selectedBudget}
          className={`
            w-full py-4 rounded-xl font-semibold text-base
            transition-all duration-300
            ${selectedBudget
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
