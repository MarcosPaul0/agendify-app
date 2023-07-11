/* eslint-disable no-restricted-syntax */
import { Calendar } from '@components/Calendar';
import { Container } from '@components/Container';
import { ScheduleOption } from '@components/ScheduleOption';
import { useScheduleContext } from '@contexts/ScheduleContext';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { formatFullDate } from '@utils/formatFullDate';
import { useSearchParams } from 'expo-router/src/navigationStore';
import { useFocusEffect } from 'expo-router/src/useFocusEffect';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { IAvailability } from 'src/interfaces/availability.interface';
import { IAvailabilityResponse } from 'src/interfaces/availabilityResponse.interface';
import {
  differenceInMinutes,
  addMinutes,
  isEqual,
  isBefore,
  isAfter,
} from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/Button';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { useNotify } from '@hooks/useNotify';
import { AxiosResponse } from 'axios';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { useQuery } from 'react-query';
import { IScheduleResponse } from 'src/interfaces/scheduleResponse.interface';

const scheduleValidationSchema = z.object({
  startTime: z.date({
    required_error: 'É necessário definir uma data de início',
  }),
  endTime: z.date({ required_error: 'É necessário definir uma data de fim' }),
});

type TScheduleFormData = z.infer<typeof scheduleValidationSchema>;

export default function RegisterSchedule() {
  const { businessId } = useSearchParams();
  const { errorNotify, successNotify } = useNotify();
  const router = useRouter();

  const { schedule, totalTime, clearScheduledServices } = useScheduleContext();

  const [activeDay, setActiveDay] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<IAvailability | null>(null);

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<TScheduleFormData>({
    resolver: zodResolver(scheduleValidationSchema),
  });

  const { data: schedulesAlreadyBooked } = useQuery<IScheduleResponse[]>(
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

  function handleCheckScheduleOption(startTime: Date, endTime: Date) {
    setValue('startTime', startTime, {
      shouldDirty: true,
    });
    setValue('endTime', endTime, {
      shouldDirty: true,
    });
  }

  function catchRegisterScheduleError({ statusCode }: IErrorResponse) {
    switch (statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Ocorreu um erro ao realizar o agendamento');
        break;
    }
  }

  async function registerSchedule({ startTime }: TScheduleFormData) {
    try {
      let schedulesToRegister: Promise<AxiosResponse>[] = [];

      schedule.forEach((service) => {
        schedulesToRegister = schedulesToRegister.concat(
          Array.from({ length: service.count }, (_, index) =>
            agendifyApiClient.post(AGENDIFY_API_ROUTES.SCHEDULE, {
              service_id: service.serviceId,
              start_datetime: addMinutes(
                startTime,
                index * service.timeInMinutes
              ),
              end_datetime: addMinutes(
                startTime,
                (index + 1) * service.timeInMinutes
              ),
            })
          )
        );
      });

      await Promise.all(schedulesToRegister);

      clearScheduledServices();
      successNotify('Agendamento realizado com sucesso');
      router.push(APP_ROUTES.MY_APPOINTMENTS);
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchRegisterScheduleError });
    }
  }

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

  const startTimeWatched = watch('startTime');
  const endTimeWatched = watch('endTime');

  useEffect(() => {
    setAvailability((availabilityState) => {
      if (availabilityState) {
        const newStartTime = new Date(activeDay);
        const newEndTime = new Date(activeDay);

        newStartTime.setHours(
          availabilityState.startTime.getHours(),
          availabilityState.startTime.getMinutes()
        );
        newEndTime.setHours(
          availabilityState.endTime.getHours(),
          availabilityState.endTime.getMinutes()
        );

        return {
          ...availabilityState,
          startTime: newStartTime,
          endTime: newEndTime,
        };
      }
      return availabilityState;
    });
  }, [activeDay]);

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
        <View className="w-full items-center p-4 drop-shadow-2xl shadow-GRAY_900">
          <Text className="font-bold text-base text-BLUE_800">
            {formattedDate}
          </Text>
        </View>

        <ScrollView className="w-full flex-1 bg-GRAY_50 rounded-t-3xl">
          {availability &&
            scheduleOptions.map((scheduleOption) => {
              const [startTime, endTime] = scheduleOption as [Date, Date];
              const isChecked =
                isEqual(startTime, startTimeWatched) &&
                isEqual(endTime, endTimeWatched);

              const isDisabled = schedulesAlreadyBooked?.find(
                (scheduleBooked) =>
                  (isAfter(
                    new Date(
                      scheduleBooked.start_datetime.replace('.000Z', '')
                    ),
                    startTime
                  ) &&
                    isBefore(
                      new Date(
                        scheduleBooked.start_datetime.replace('.000Z', '')
                      ),
                      endTime
                    )) ||
                  isEqual(
                    startTime,
                    new Date(scheduleBooked.start_datetime.replace('.000Z', ''))
                  )
              );

              if (isDisabled) {
                return null;
              }

              return (
                <ScheduleOption
                  key={startTime.toISOString()}
                  isChecked={isChecked}
                  handleCheck={handleCheckScheduleOption}
                  endTime={endTime}
                  startTime={startTime}
                  items={formattedItems}
                />
              );
            })}
        </ScrollView>

        {isDirty && (
          <View className=" px-5 w-full bottom-0 border-t border-GRAY_200 bg-GRAY_100">
            <Button
              title="Finalizar agendamento"
              text="Finalizar agendamento"
              onPress={handleSubmit(registerSchedule)}
              isLoading={isSubmitting}
            />
          </View>
        )}
      </View>
    </Container>
  );
}
