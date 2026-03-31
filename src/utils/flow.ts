import type { FormState } from '../store/useDecorStore';

/**
 * 检查是否可以进入区域选择页
 */
export function canEnterAreaSelection(formState: FormState): boolean {
  return !!formState.bizType;
}

/**
 * 检查是否可以进入预算选择页
 */
export function canEnterBudgetSelection(formState: FormState): boolean {
  return !!formState.bizType && !!formState.area;
}

/**
 * 检查是否可以进入风格选择页
 */
export function canEnterStyleSelection(formState: FormState): boolean {
  return (
    !!formState.bizType &&
    !!formState.area &&
    !!formState.budget
  );
}

/**
 * 检查是否可以进入生成页面
 */
export function canEnterGenerating(formState: FormState): boolean {
  return (
    !!formState.bizType &&
    !!formState.area &&
    !!formState.budget &&
    !!formState.style
  );
}

/**
 * 检查是否可以进入结果页
 */
export function canEnterResult(formState: FormState): boolean {
  return canEnterGenerating(formState) && !!formState.generatedAt;
}

/**
 * 获取上一步路径
 */
export function getPreviousPath(currentPath: string): string {
  const pathMap: Record<string, string> = {
    '/area': '/',
    '/budget': '/area',
    '/style': '/budget',
    '/generating': '/style',
    '/result': '/generating',
  };
  return pathMap[currentPath] || '/';
}

/**
 * 获取下一步路径
 */
export function getNextPath(currentPath: string): string {
  const pathMap: Record<string, string> = {
    '/': '/area',
    '/area': '/budget',
    '/budget': '/style',
    '/style': '/generating',
    '/generating': '/result',
  };
  return pathMap[currentPath] || '/';
}

/**
 * 验证表单完整性
 */
export function validateForm(formState: FormState): {
  isValid: boolean;
  missingFields: string[];
} {
  const missingFields: string[] = [];

  if (!formState.bizType) missingFields.push('bizType');
  if (!formState.area) missingFields.push('area');
  if (!formState.budget) missingFields.push('budget');
  if (!formState.style) missingFields.push('style');

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * 获取当前步骤对应的路径
 */
export function getPathByStep(step: number): string {
  const stepMap: Record<number, string> = {
    1: '/area',
    2: '/budget',
    3: '/style',
    4: '/generating',
    5: '/result',
  };
  return stepMap[step] || '/';
}

/**
 * 获取当前路径对应的步骤
 */
export function getStepByPath(path: string): number {
  const pathMap: Record<string, number> = {
    '/area': 1,
    '/budget': 2,
    '/style': 3,
    '/generating': 4,
    '/result': 5,
  };
  return pathMap[path] || 0;
}

/**
 * 根据表单状态获取回退路径
 */
export function getFallbackPath(formState: FormState, requiredStep: number): string {
  // 根据已完成的最早步骤返回合适的路径
  if (!formState.bizType) {
    return '/';
  }
  if (!formState.area) {
    return '/area';
  }
  if (!formState.budget) {
    return '/budget';
  }
  if (!formState.style) {
    return '/style';
  }
  if (!formState.generatedAt) {
    return '/generating';
  }
  
  // 默认返回上一步
  const previousStep = requiredStep - 1;
  return getPathByStep(previousStep) || '/';
}
