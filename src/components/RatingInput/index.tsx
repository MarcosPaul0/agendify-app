import { View, TouchableOpacity } from 'react-native';
import { Star } from 'phosphor-react-native';
import { COLORS } from '@constants/colors.constant';
import { IRatingInputProps } from './interfaces/ratingInputProps.interface';

export function RatingInput({ onChange, value }: IRatingInputProps) {
  return (
    <View className="flex-row py-1 ">
      {Array.from({
        length: 5,
      }).map((_, index) => {
        const starIsFilled = index < value ? 'fill' : 'regular';
        const key = `rating${index}`;

        return (
          <TouchableOpacity
            key={key}
            testID={key}
            onPress={() => onChange(index + 1)}
          >
            <Star size={24} weight={starIsFilled} color={COLORS.WARNING} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
