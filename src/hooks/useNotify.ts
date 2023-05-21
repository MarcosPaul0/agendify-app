import { COLORS } from '@constants/colors.constant';
import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';

const DEFAULT_NOTIFY_CONFIG = {
  type: 'custom',
  placement: 'top',
  duration: 4000,
  animationType: 'slide-in',
} as const;

const DEFAULT_NOTIFY_STYLE = {
  marginTop: 30,
} as const;

export function useNotify() {
  const toast = useToast();

  const successNotify = useCallback((message: string) => {
    toast.show(message, {
      ...DEFAULT_NOTIFY_CONFIG,
      style: {
        backgroundColor: COLORS.SUCCESS,
        ...DEFAULT_NOTIFY_STYLE,
      },
    });
  }, []);

  const errorNotify = useCallback((message: string) => {
    toast.show(message, {
      ...DEFAULT_NOTIFY_CONFIG,
      style: {
        backgroundColor: COLORS.ERROR,
        ...DEFAULT_NOTIFY_STYLE,
      },
    });
  }, []);

  const warningNotify = useCallback((message: string) => {
    toast.show(message, {
      ...DEFAULT_NOTIFY_CONFIG,
      style: {
        backgroundColor: COLORS.WARNING,
        ...DEFAULT_NOTIFY_STYLE,
      },
    });
  }, []);

  return { successNotify, errorNotify, warningNotify };
}
