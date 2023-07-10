import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Rating } from '@components/Rating';
import { useRouter } from 'expo-router';
import { getImageUrl } from '@utils/getImageUrl';
import { IBusinessCardProps } from './interfaces/businessCardProps.interface';

export function BusinessCard({
  imageUrl,
  title,
  description,
  favoriteIsActive,
  redirectTo,
  rating,
  totalRatings,
}: IBusinessCardProps) {
  const router = useRouter();

  // const favoriteIconStyle = isFavorite ? 'fill' : 'regular';
  const titleStyle = favoriteIsActive ? 'mr-4' : 'mr-0';

  function redirectToScreen() {
    router.push(redirectTo);
  }

  return (
    <TouchableOpacity
      onPress={redirectToScreen}
      className={`
      w-full p-3 flex-row mb-4 items-center
      bg-GRAY_100 border border-GRAY_400 rounded-xl
    `}
    >
      <Image source={getImageUrl(imageUrl)} className="w-20 h-20 rounded-lg" />

      {favoriteIsActive && (
        <View className="ml-1 absolute right-2 top-2">
          {/* <Heart weight={favoriteIconStyle} color={COLORS.ERROR} /> */}
        </View>
      )}

      <View className="pl-4 flex-1 items-start">
        <View className="border-b border-GRAY_400 pb-1 w-full">
          <Text
            className={`
              ${titleStyle} text-md font-bold text-BLUE_800
            `}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <Rating
          name={title}
          rating={rating}
          numberOfRatings={totalRatings}
          showTotalRatings
        />

        <View>
          <Text className="text-xs text-GRAY_600" numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
