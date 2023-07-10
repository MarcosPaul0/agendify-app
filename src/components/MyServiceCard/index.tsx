import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { getImageUrl } from '@utils/getImageUrl';
import { IMyServiceCardProps } from './interfaces/myServiceCardProps.interface';

export function MyServiceCard({ service, isLastItem }: IMyServiceCardProps) {
  const router = useRouter();

  function navigateToManageService() {
    router.push(`${APP_ROUTES.MANAGE_SERVICE}/${service.id}`);
  }

  return (
    <TouchableOpacity
      onPress={navigateToManageService}
      className={`
        rounded-lg bg-GRAY_100 border border-GRAY_500 w-40
        items-center ml-2 h-40 ${isLastItem ? 'mr-5' : ''}
        overflow-hidden
      `}
    >
      <Image source={getImageUrl(service.imageUrl)} className="w-full h-20" />

      <View className="w-full px-2">
        <View className="w-full border-b border-b-GRAY_500 mt-1 mb-2">
          <Text className="font-bold text-BLUE_900 text-md text-center">
            {service.name}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text
            numberOfLines={2}
            className={`
              text-xs text-GRAY_600
            `}
          >
            {service.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
