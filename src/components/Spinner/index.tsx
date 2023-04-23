import { SafeAreaView, ActivityIndicator } from 'react-native';

export function Spinner() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}
