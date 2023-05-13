import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';

export function useNotify() {
  const toast = useToast();

  const successNotify = useCallback((message: string) => {
    toast.show(message, {
      type: 'custom',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  }, []);

  const errorNotify = useCallback((message: string) => {
    toast.show(message, {
      type: 'custom',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  }, []);

  const warningNotify = useCallback((message: string) => {
    toast.show(message, {
      type: 'custom',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  }, []);

  return { successNotify, errorNotify, warningNotify };
}
