import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDecorStore } from '../store/useDecorStore';
import {
  canEnterBudgetSelection,
  canEnterStyleSelection,
  canEnterGenerating,
  canEnterResult,
} from '../utils/flow';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredStep: number;
}

export function RouteGuard({ children, requiredStep }: RouteGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const formState = useDecorStore((state) => state.formState);

  useEffect(() => {
    const checkAccess = () => {
      let canAccess = false;

      switch (requiredStep) {
        case 2: // 预算选择页
          canAccess = canEnterBudgetSelection(formState);
          break;
        case 3: // 风格选择页
          canAccess = canEnterStyleSelection(formState);
          break;
        case 4: // 生成页
          canAccess = canEnterGenerating(formState);
          break;
        case 5: // 结果页
          canAccess = canEnterResult(formState);
          break;
        default:
          canAccess = true;
      }

      if (!canAccess) {
        // 根据已完成的最早步骤重定向
        if (!formState.bizType) {
          navigate('/', { replace: true });
        } else if (!formState.area) {
          navigate('/area', { replace: true });
        } else if (!formState.budget) {
          navigate('/budget', { replace: true });
        } else if (!formState.style) {
          navigate('/style', { replace: true });
        } else if (!formState.generatedAt) {
          navigate('/generating', { replace: true });
        }
      }
    };

    checkAccess();
  }, [formState, navigate, requiredStep, location.pathname]);

  return <>{children}</>;
}
