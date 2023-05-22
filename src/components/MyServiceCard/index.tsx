import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Tag } from '@components/Tag';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { BASE_URL } from '@constants/baseUrl.constant';
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
        py-2 px-4 items-center ml-2 h-40 ${isLastItem ? 'mr-5' : ''}
      `}
    >
      <Image
        source={`${BASE_URL}/${service.imageUrl}`}
        className="w-full h-20 border rounded-lg border-BLUE_500"
      />

      <View className="w-full">
        <View className="w-full border-b border-b-GRAY_500 my-2">
          <Text className="font-bold text-BLUE_900 text-md text-center">
            {service.name}
          </Text>
        </View>

        <View className="flex-row items-center">
          {service.price && (
            <Tag
              text={`R$ ${String(service.price.toFixed(2)).replace('.', ',')}`}
              marginLeftIsActive={false}
              size="sm"
            />
          )}
          <Tag text={`${service.duration} h`} size="sm" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
