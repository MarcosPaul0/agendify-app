import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-green-500">
      <Text className="text-white">TESTE</Text>
      <StatusBar style="auto" />
    </View>
  );
}
