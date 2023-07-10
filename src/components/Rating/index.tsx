import { View, Text } from 'react-native';
import { Star } from 'phosphor-react-native';
import { COLORS } from '@constants/colors.constant';
import { IRatingProps } from './interfaces/ratingProps.interface';
import { STARS_RATING_SIZE } from './constants/starRatingSize.constant';
import { TOTAL_RATING_SIZE } from './constants/totalRatingSize.constant';

export function Rating({
  name,
  rating,
  numberOfRatings,
  size = 'sm',
  showTotalRatings = false,
}: IRatingProps) {
  return (
    <View className={`flex-row items-center py-1 `}>
      {Array.from({
        length: 5,
      }).map((_, index) => {
        const starIsFilled = index < rating ? 'fill' : 'regular';
        const key = `${name}-${index}`;

        return (
          <Star
            key={key}
            size={STARS_RATING_SIZE[size]}
            weight={starIsFilled}
            color={COLORS.WARNING}
          />
        );
      })}

      {showTotalRatings && (
        <Text className={`ml-2 text-BLUE_800 ${TOTAL_RATING_SIZE[size]} `}>
          {numberOfRatings}
        </Text>
      )}
    </View>
  );
}
