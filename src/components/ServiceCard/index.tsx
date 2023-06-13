import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { BASE_URL } from '@constants/baseUrl.constant';
import { IServiceCardProps } from './interfaces/serviceCardProps.interface';

export function ServiceCard({ service, isLastItem }: IServiceCardProps) {
  return (
    <TouchableOpacity
      className={`
        rounded-md bg-GRAY_100 drop-shadow-md border
        border-GRAY_500 overflow-hidden flex-1 flex-row
        ${isLastItem ? 'ml-5' : ''} mb-4
      `}
    >
      <Image source={`${BASE_URL}/${service.imageUrl}`} className="w-28 h-28" />

      <View className="flex-1 px-2 py-1">
        <View className="w-full mb-2">
          <Text className="font-bold text-BLUE_600 text-base text-center">
            {service.name}
          </Text>
        </View>

        <View className="w-full mb-2">
          <Text className="text-GRAY_600 text-xs" numberOfLines={5}>
            {service.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
