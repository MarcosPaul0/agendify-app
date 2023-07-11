import { Text, TouchableOpacity } from 'react-native';
import { Checkbox } from '@components/Checkbox';
import { ICheckboxDayProps } from './interfaces/checkboxDayProps.interface';

export function CheckboxDay({ day, isChecked, onCheck }: ICheckboxDayProps) {
  const dayBackground = isChecked ? 'bg-BLUE_100' : 'bg-GRAY_100';

  return (
    <TouchableOpacity
      testID={day}
      className={`
        px-8 py-3.5 flex-row items-center
        justify-between ${dayBackground}
      `}
      onPress={onCheck}
    >
      <Text className="font-bold text-base text-BLUE_800">{day}</Text>
      <Checkbox isChecked={isChecked} />
    </TouchableOpacity>
  );
}
