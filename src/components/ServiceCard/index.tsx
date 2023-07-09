import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { getImageUrl } from '@utils/getImageUrl';
import { IServiceCardProps } from './interfaces/serviceCardProps.interface';

export function ServiceCard({
  service,
  isLastItem,
  count = 0,
  showNumber = false,
  onPress,
}: IServiceCardProps) {
  return (
    <TouchableOpacity
      className={`
        rounded-xl bg-GRAY_100 drop-shadow-md border
        border-GRAY_500  flex-1 flex-row
        ${isLastItem ? 'ml-5' : ''} mb-4
      `}
      onPress={onPress}
    >
      {showNumber && (
        <View
          className={`
            P-4 flex-row items-center justify-center
            w-6 h-6 text-sm rounded-full bg-BLUE_500
            absolute z-10 -top-2.5 right-6
          `}
        >
          <Text className="font-bold  text-GRAY_50">{count}</Text>
        </View>
      )}
      <Image
        source={getImageUrl(service.imageUrl)}
        className="w-20 h-20 m-2 rounded-lg"
      />

      <View className="flex-1 pr-2 py-1">
        <View className="w-full mb-2">
          <Text className="font-bold text-BLUE_600 text-base text-center">
            {service.name}
          </Text>
        </View>

        <View className="w-full mb-2 px-3">
          <Text className="text-GRAY_600 text-xs" numberOfLines={5}>
            {service.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
