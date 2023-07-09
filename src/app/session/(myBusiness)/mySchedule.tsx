import { Calendar } from '@components/Calendar';
import { Container } from '@components/Container';
import { ScheduleCard } from '@components/ScheduleCard';
import { formatFullDate } from '@utils/formatFullDate';
import { useState } from 'react';
import { View, StatusBar, ScrollView, Text } from 'react-native';

export default function MySchedule() {
  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const formattedDate = formatFullDate(activeDay);

  return (
    <Container bgColor="blue">
      <View
        style={{
          marginTop: StatusBar.currentHeight,
        }}
        className={`
          w-full py-2
        `}
      >
        <Calendar
          activeDay={activeDay}
          onChangeDay={setActiveDay}
          minDate={new Date()}
        />
      </View>

      <View className="w-full flex-1 bg-GRAY_50 rounded-t-3xl relative">
        <View
          className={`
            P-4 flex-row items-center justify-center
            w-7 h-7 text-sm rounded-full bg-BLUE_500
            absolute z-10 -top-4 right-6
          `}
        >
          <Text className="font-bold  text-GRAY_50">12</Text>
        </View>

        <View className="w-full items-center p-4 drop-shadow-2xl shadow-GRAY_900">
          <Text className="font-bold text-base text-BLUE_800">
            {formattedDate}
          </Text>
        </View>

        <ScrollView className="w-full flex-1 bg-GRAY_50 rounded-t-3xl">
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
        </ScrollView>
      </View>
    </Container>
  );
}
