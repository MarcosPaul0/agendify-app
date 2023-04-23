import { View } from 'react-native';
import { Star } from 'phosphor-react-native';
import { COLORS } from '@constants/colors.constant';
import { IRatingProps } from './interfaces/ratingProps.interface';

export function Rating({ name, rating }: IRatingProps) {
  return (
    <View className="flex-row py-1">
      {Array.from({
        length: 5,
      }).map((_, index) => {
        const starIsFilled = index < rating ? 'fill' : 'regular';
        const key = `${name}-${index}`;

        return (
          <Star
            key={key}
            size={16}
            weight={starIsFilled}
            color={COLORS.WARNING}
          />
        );
      })}
    </View>
  );
}
