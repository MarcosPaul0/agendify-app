import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@constants/colors.constant';
import { Check } from 'phosphor-react-native';
import { ICheckboxDayProps } from './interfaces/checkboxDayProps.interface';

export function CheckboxDay({ day, isChecked, onCheck }: ICheckboxDayProps) {
  const dayBackground = isChecked ? 'bg-BLUE_100' : 'bg-GRAY_100';
  const checkedBackground = isChecked ? 'bg-BLUE_500' : 'bg-GRAY_100';

  return (
    <TouchableOpacity
      className={`
        px-8 py-3.5 flex-row items-center
        justify-between ${dayBackground}
      `}
      onPress={onCheck}
    >
      <Text className="font-bold text-base text-BLUE_800">{day}</Text>
      <View
        className={`
          border-2 border-BLUE_500 rounded-md
          ${checkedBackground} h-6 w-6
        `}
      >
        {isChecked && <Check size={20} color={COLORS.GRAY_50} />}
      </View>
    </TouchableOpacity>
  );
}
