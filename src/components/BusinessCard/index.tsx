import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Rating } from '@components/Rating';
import { Heart } from 'phosphor-react-native';
import { COLORS } from '@constants/colors.constant';
import { useRouter } from 'expo-router';
import { IBusinessCardProps } from './interfaces/businessCardProps.interface';

export function BusinessCard({
  imageUrl,
  title,
  description,
  favoriteIsActive,
  isFavorite,
  redirectTo,
}: IBusinessCardProps) {
  const router = useRouter();

  const favoriteIconStyle = isFavorite ? 'fill' : 'regular';
  const titleStyle = favoriteIsActive ? 'mr-4' : 'mr-0';

  function redirectToScreen() {
    router.push(redirectTo);
  }

  return (
    <TouchableOpacity
      onPress={redirectToScreen}
      className={`
      w-full p-4 flex-row mb-4 items-center
      bg-GRAY_100 border border-GRAY_400 rounded-xl
    `}
    >
      <Image
        source={imageUrl}
        className="w-20 h-20 border-2 rounded-lg border-BLUE_500"
      />

      {favoriteIsActive && (
        <View className="ml-1 absolute right-2 top-2">
          <Heart weight={favoriteIconStyle} color={COLORS.ERROR} />
        </View>
      )}

      <View className="px-4 w-60">
        <Text
          className={`
            ${titleStyle} text-md font-bold text-BLUE_800
            border-b border-GRAY_500 flex-1
          `}
        >
          {title}
        </Text>

        <Rating name={title} rating={3} />

        <Text className="text-xs text-GRAY_600" numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
