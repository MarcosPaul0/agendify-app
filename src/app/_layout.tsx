import { AuthContextProvider } from '@contexts/AuthContext';
import { Stack } from 'expo-router/stack';
import { ToastProvider } from 'react-native-toast-notifications';
import { PaperProvider } from 'react-native-paper';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@services/queryClient';

export default function TabsLayout() {
  return (
    <PaperProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </AuthContextProvider>
        </QueryClientProvider>
      </ToastProvider>
    </PaperProvider>
  );
}
