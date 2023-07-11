import { Calendar } from '@components/Calendar';
import { Container } from '@components/Container';
import { ScheduleCard } from '@components/ScheduleCard';
import { Spinner } from '@components/Spinner';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { formatFullDate } from '@utils/formatFullDate';
import { useSearchParams } from 'expo-router/src/navigationStore';
import { useFocusEffect } from 'expo-router/src/useFocusEffect';
import { useCallback, useState } from 'react';
import { View, StatusBar, Text, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { IAvailability } from 'src/interfaces/availability.interface';
import { IAvailabilityResponse } from 'src/interfaces/availabilityResponse.interface';
import { IScheduleResponse } from 'src/interfaces/scheduleResponse.interface';

export default function MySchedule() {
  const { businessId } = useSearchParams();

  const [activeDay, setActiveDay] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<IAvailability | null>(null);

  const formattedDate = formatFullDate(activeDay);

  const { data: schedules, isLoading } = useQuery<IScheduleResponse[]>(
    ['schedulesByBusiness', activeDay],
    async () => {
      try {
        const searchFilter = activeDay && {
          day: activeDay.getDate(),
          month: activeDay.getMonth() + 1,
          year: activeDay.getFullYear(),
          business_id: businessId,
        };

        const response = await agendifyApiClient.get<IScheduleResponse[]>(
          `${AGENDIFY_API_ROUTES.SCHEDULE_BY_BUSINESS}`,
          {
            params: searchFilter,
          }
        );

        return response.data;
      } catch (error) {
        return [];
      }
    },
    {
      initialData: [],
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
        style={{
          marginTop: StatusBar.currentHeight,
        }}
        className={`
          w-full pb-2
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

        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            className="w-full flex-1 bg-GRAY_50 rounded-t-3xl"
            data={schedules}
            renderItem={({ item }) => <ScheduleCard schedule={item} />}
          />
        )}
      </View>
    </Container>
  );
}
