import { Minus, Plus } from 'phosphor-react-native';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '@constants/colors.constant';
import { ICountInputProps } from './interfaces/countInputProps.interface';

export function CountInput({ count, increment, decrement }: ICountInputProps) {
  return (
    <View className="flex-row items-center ">
      <TouchableOpacity
        className={`
          bg-BLUE_500 px-3
          rounded-l-lg h-11
          justify-center
        `}
        onPress={decrement}
      >
        <Minus size={18} color={COLORS.GRAY_50} />
      </TouchableOpacity>
      <View
        className={`
          border-t border-b border-gray-200
          px-3 h-11 justify-center
          bg-GRAY_200
        `}
      >
        <Text className="text-lg">{count}</Text>
      </View>
      <TouchableOpacity
        className={`
          bg-BLUE_500 px-3
          rounded-r-lg h-11
          justify-center
        `}
        onPress={increment}
      >
        <Plus size={18} color={COLORS.GRAY_50} />
      </TouchableOpacity>
    </View>
  );
}
