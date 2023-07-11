import { COLORS } from '@constants/colors.constant';
import {
  Briefcase,
  CaretRight,
  CurrencyDollar,
  Timer,
} from 'phosphor-react-native';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatTimeDisplay } from '@utils/formatTimeDisplay';
import { formatPrice } from '@utils/formatPrice';
import { IScheduleCardProps } from './interfaces/scheduleCardProps.interface';

export function ScheduleCard({ schedule }: IScheduleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleSchedule() {
    setIsOpen((currentState) => !currentState);
  }

  return (
    <TouchableOpacity
      className={`
        bg-GRAY_100 overflow-hidden border rounded-2xl 
        animate-bounce border-BLUE_500 mx-5 my-2
      `}
      onPress={handleToggleSchedule}
    >
      <View className="h-11 flex-row">
        <View
          className={`
            px-3 bg-BLUE_500 h-11 flex-row items-center
            ${isOpen ? 'rounded-br-2xl' : ''}
          `}
        >
          <Text
            className={`
              text-base text-GRAY_50 font-bold
            `}
          >
            {formatTimeDisplay(new Date(schedule.start_datetime))}
          </Text>
        </View>

        <View
          className={`
            h-11 px-3 flex-1
            
          `}
        >
          <Text
            className={`
             text-base font-bold text-BLUE_900
             flex-1
          `}
          >
            {schedule.user.name}
          </Text>
          <Text
            className={`
             text-sm text-GRAY_600
             flex-1
          `}
          >
            {schedule.user.email}
          </Text>
        </View>

        <View
          className={`
            h-11 flex-row items-center px-5
            transition-all ease-in duration-300
            ${isOpen ? 'rotate-90' : ''}
          `}
        >
          <CaretRight size={24} color={COLORS.BLUE_900} />
        </View>
      </View>

      <View
        className={`
          px-3 gap-1 justify-between overflow-hidden
          pt-2 pb-4 ${isOpen ? 'h-auto' : 'h-0 hidden'}
        `}
      >
        <View className="flex-row items-center gap-2">
          <Briefcase size={24} />
          <Text className="text-base">{schedule.Service.name}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Timer size={24} />
          <Text className="text-base">{schedule.Service.duration} h</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <CurrencyDollar size={24} />
          <Text className="text-base">
            {formatPrice(schedule.Service.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
