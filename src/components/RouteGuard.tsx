import { Navigate } from 'react-router-dom';
import { useDecorStore } from '../store/useDecorStore';
import { getFallbackPath } from '../utils/flow';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredStep: number;
}

export function RouteGuard({ children, requiredStep }: RouteGuardProps) {
  const formState = useDecorStore((state) => state.formState);

  // 同步计算是否可以访问
  const canAccess = (() => {
    switch (requiredStep) {
      case 2: // 预算选择页
        return !!(formState.bizType && formState.area);
      case 3: // 风格选择页
        return !!(formState.bizType && formState.area && formState.budget);
      case 4: // 生成页
        return !!(formState.bizType && formState.area && formState.budget && formState.style);
      case 5: // 结果页
        return !!(formState.bizType && formState.area && formState.budget && formState.style && formState.generatedAt);
      default:
        return true;
    }
  })();

  // 如果不能访问，计算回退路径
  const fallbackPath = getFallbackPath(formState, requiredStep);

  if (!canAccess) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
