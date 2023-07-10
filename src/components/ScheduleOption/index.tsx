import { Checkbox } from '@components/Checkbox';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatTime } from '@utils/formatTime';
import { IScheduleOptionProps } from './interfaces/scheduleOptionProps.interface';

export function ScheduleOption({
  startTime,
  endTime,
  items,
  isChecked,
  handleCheck,
}: IScheduleOptionProps) {
  return (
    <View className="flex-row items-center px-5 h-16 my-2.5">
      <View className="items-center">
        <Text className="font-bold">{formatTime(startTime)}</Text>
        <Text className="font-bold">-</Text>
        <Text className="font-bold">{formatTime(endTime)}</Text>
      </View>
      <TouchableOpacity
        className={`
          flex-row items-center
          bg-GRAY_200 pr-5 ml-5
          flex-1 rounded-lg overflow-hidden
        `}
        onPress={handleCheck}
      >
        <View
          className={`
            h-16 w-4 bg-BLUE_500
          `}
        />

        <Text
          className={`
            flex-row items-center
            text-base ml-5 flex-1
          `}
          numberOfLines={1}
        >
          {items}
        </Text>

        <Checkbox isChecked={isChecked} isRounded />
      </TouchableOpacity>
    </View>
  );
}
