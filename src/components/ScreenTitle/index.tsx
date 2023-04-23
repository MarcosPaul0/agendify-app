import { View, Text } from 'react-native';
import { IScreenTitleProps } from './interface/screenTitleProps.interface';

export function ScreenTitle({ text }: IScreenTitleProps) {
  return (
    <View className="w-full border-b py-1 mb-10 border-BLUE_800">
      <Text className="text-BLUE_800 text-2xl font-bold">{text}</Text>
    </View>
  );
}
