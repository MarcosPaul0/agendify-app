import { COLORS } from '@constants/colors.constant';
import { Check } from 'phosphor-react-native';
import { View } from 'react-native';
import { ICheckboxProps } from './interfaces/checkboxProps.interface';

export function Checkbox({ isChecked, isRounded = false }: ICheckboxProps) {
  const checkedBackground = isChecked ? 'bg-BLUE_500' : 'bg-GRAY_100';
  const round = isRounded ? 'rounded-full' : 'rounded-md';

  return (
    <View
      className={`
      border-2 border-BLUE_500
      ${round}
      ${checkedBackground} h-6 w-6
    `}
    >
      {isChecked && <Check size={20} color={COLORS.GRAY_50} />}
    </View>
  );
}
