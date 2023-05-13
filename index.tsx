import 'expo-router/entry';
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { AuthContextProvider } from '@contexts/AuthContext';
import { ToastProvider } from 'react-native-toast-notifications';

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./src/app');
  return (
    <ToastProvider>
      <AuthContextProvider>
        <ExpoRoot context={ctx} />
      </AuthContextProvider>
    </ToastProvider>
  );
}

registerRootComponent(App);
