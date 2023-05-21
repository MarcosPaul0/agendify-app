import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Tag } from '@components/Tag';
import { BASE_URL } from '@constants/baseUrl.constant';
import { IServiceCardProps } from './interfaces/serviceCardProps.interface';

export function ServiceCard({ service }: IServiceCardProps) {
  return (
    <TouchableOpacity
      className={`
        rounded-xl bg-GRAY_100 drop-shadow-md border
        p-3 flex-row mb-3 border-GRAY_500
      `}
    >
      <Image
        source={`${BASE_URL}/${service.id}`}
        className="w-16 h-16 border-2 rounded-lg border-BLUE_500"
      />

      <View className="flex-1 px-2">
        <View className="w-full border-b border-b-GRAY_500 ml-2 mb-2">
          <Text className="font-bold text-BLUE_900 text-base">
            {service.name}
          </Text>
        </View>

        <View className="flex-row items-center">
          {service?.price && <Tag text={`R$ ${service.price}`} />}
          <Tag text={`${service.duration} min`} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
