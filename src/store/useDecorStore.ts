import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BizType = 'home' | 'office';
export type BudgetLevel = 'luxury' | 'standard' | 'basic';
export type StyleType = 'european' | 'chinese' | 'modern' | 'cream';

export interface FormState {
  bizType: BizType;
  area: string;
  budget: BudgetLevel | null;
  style: StyleType | null;
  generatedAt: string;
}

interface DecorStore {
  formState: FormState;
  currentStep: number;
  isGenerating: boolean;
  
  // Actions
  setBizType: (bizType: BizType) => void;
  setArea: (area: string) => void;
  setBudget: (budget: BudgetLevel) => void;
  setStyle: (style: StyleType) => void;
  setCurrentStep: (step: number) => void;
  setIsGenerating: (generating: boolean) => void;
  setGeneratedAt: (date: string) => void;
  resetForm: () => void;
  resetToHome: () => void;
}

const initialState: FormState = {
  bizType: 'home',
  area: '',
  budget: null,
  style: null,
  generatedAt: '',
};

export const useDecorStore = create<DecorStore>()(
  persist(
    (set) => ({
      formState: initialState,
      currentStep: 1,
      isGenerating: false,

      setBizType: (bizType) =>
        set((state) => ({
          formState: { ...state.formState, bizType },
        })),

      setArea: (area) =>
        set((state) => ({
          formState: { ...state.formState, area },
        })),

      setBudget: (budget) =>
        set((state) => ({
          formState: { ...state.formState, budget },
        })),

      setStyle: (style) =>
        set((state) => ({
          formState: { ...state.formState, style },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      setIsGenerating: (generating) => set({ isGenerating: generating }),

      setGeneratedAt: (date) =>
        set((state) => ({
          formState: { ...state.formState, generatedAt: date },
        })),

      resetForm: () =>
        set({
          formState: initialState,
          currentStep: 1,
          isGenerating: false,
        }),

      resetToHome: () =>
        set({
          formState: { ...initialState, bizType: 'home' },
          currentStep: 1,
          isGenerating: false,
        }),
    }),
    {
      name: 'decor-storage',
      partialize: (state) => ({ formState: state.formState }),
    }
  )
);
