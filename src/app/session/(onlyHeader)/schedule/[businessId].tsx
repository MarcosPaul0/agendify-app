import { Calendar } from '@components/Calendar';
import { Container } from '@components/Container';
import { ScheduleOption } from '@components/ScheduleOption';
import { useScheduleContext } from '@contexts/ScheduleContext';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { formatFullDate } from '@utils/formatFullDate';
import { useSearchParams } from 'expo-router/src/navigationStore';
import { useFocusEffect } from 'expo-router/src/useFocusEffect';
import { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { IAvailability } from 'src/interfaces/availability.interface';
import { IAvailabilityResponse } from 'src/interfaces/availabilityResponse.interface';
import { differenceInMinutes, addMinutes } from 'date-fns';

export default function MySchedule() {
  const { businessId } = useSearchParams();

  const { schedule, totalTime } = useScheduleContext();

  const [activeDay, setActiveDay] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<IAvailability | null>(null);

  const formattedDate = formatFullDate(activeDay);

  const formattedItems = useMemo(
    () =>
      schedule.reduce((itemsAccumulator, service, index) => {
        if (index === 0) {
          return `${service.name} x${service.count}`;
        }
        return `${itemsAccumulator}, ${service.name} x${service.count}`;
      }, ''),
    []
  );

  const totalScheduleOption = availability
    ? differenceInMinutes(availability.endTime, availability.startTime) /
      totalTime
    : 0;

  const scheduleOptions = Array.from(
    {
      length: totalScheduleOption,
    },
    (_, index) => {
      if (!availability) {
        return null;
      }

      const { startTime } = availability;

      const scheduleOptionStartDate = addMinutes(startTime, totalTime * index);
      const scheduleOptionEndDate = addMinutes(
        scheduleOptionStartDate,
        totalTime
      );

      return [scheduleOptionStartDate, scheduleOptionEndDate];
    }
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const availabilityResponse = await agendifyApiClient.get<
            IAvailabilityResponse[]
          >(`${AGENDIFY_API_ROUTES.AVAILABILITY_BY_BUSINESS}/${businessId}`);

          const availabilityData = availabilityResponse.data;

          if (availabilityData.length > 0) {
            const weekDays = availabilityData.map(
              (availability) => Number(availability.weekdays_id) - 1
            );

            const startTime = new Date();
            const endTime = new Date();

            const availabilityStartTime =
              availabilityData[0].start_time.split(':');
            const availabilityEndTime = availabilityData[0].end_time.split(':');

            startTime.setHours(
              Number(availabilityStartTime[0]),
              Number(availabilityStartTime[1]),
              Number(availabilityStartTime[2])
            );
            endTime.setHours(
              Number(availabilityEndTime[0]),
              Number(availabilityEndTime[1]),
              Number(availabilityEndTime[2])
            );

            setAvailability({
              weekDays,
              endTime,
              startTime,
            });
          }
        } catch (error) {
          setAvailability(null);
        }
      })();
    }, [])
  );

  return (
    <Container bgColor="blue">
      <View
        className={`
          w-full py-2
        `}
      >
        <Calendar
          activeDay={activeDay}
          onChangeDay={setActiveDay}
          minDate={new Date()}
          validWeekDays={availability?.weekDays}
        />
      </View>

      <View className="w-full flex-1 bg-GRAY_50 rounded-t-3xl relative">
        <View className="w-full items-center p-4 drop-shadow-2xl shadow-GRAY_900">
          <Text className="font-bold text-base text-BLUE_800">
            {formattedDate}
          </Text>
        </View>

        <ScrollView className="w-full flex-1 bg-GRAY_50 rounded-t-3xl">
          {availability &&
            scheduleOptions.map((scheduleOption) => {
              const [startTime, endTime] = scheduleOption as [Date, Date];

              return (
                <ScheduleOption
                  key={startTime.toISOString()}
                  isChecked
                  handleCheck={() => {}}
                  endTime={endTime}
                  startTime={startTime}
                  items={formattedItems}
                />
              );
            })}
        </ScrollView>
      </View>
    </Container>
  );
}
