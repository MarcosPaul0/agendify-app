import { Button } from '@components/Button';
import { CheckboxDay } from '@components/CheckboxDay';
import { Container } from '@components/Container';
import { SectionTitle } from '@components/SectionTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { z } from 'zod';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useCallback, useState } from 'react';
import { ClockClockwise } from 'phosphor-react-native';
import { formatTime } from '@utils/formatTime';
import { useFocusEffect, useSearchParams } from 'expo-router';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { useNotify } from '@hooks/useNotify';
import { IAvailabilityResponse } from 'src/interfaces/availabilityResponse.interface';
import { WEEK_DAY } from '@constants/weekDay.constant';
import { isEqual } from 'date-fns';

export type TDay =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

const setBusinessAvailabilityValidationSchema = z.object({
  days: z.object({
    sunday: z.boolean(),
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
  }),
  beginTime: z.date(),
  endTime: z.date(),
});

type TSetBusinessAvailabilityFormData = z.infer<
  typeof setBusinessAvailabilityValidationSchema
>;

export default function MyAvailability() {
  const { businessId } = useSearchParams();
  const { errorNotify, successNotify } = useNotify();

  const [hasAvailability, setHasAvailability] = useState(false);
  const [showBeginTime, setShowBeginTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const {
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSetBusinessAvailabilityFormData>({
    resolver: zodResolver(setBusinessAvailabilityValidationSchema),
    defaultValues: {
      days: {
        sunday: false,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
      },
      beginTime: new Date(),
      endTime: new Date(),
    },
  });

  function handleCheckDay(day: TDay) {
    const currentDayValue = getValues(`days.${day}`);

    setValue(`days.${day}`, !currentDayValue);
  }

  function handleShowBeginTimePicker() {
    setShowBeginTime(true);
  }

  const endTime = watch('endTime');

  function handleChangeBeginTime(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    if (selectedDate) {
      if (isEqual(selectedDate, endTime)) {
        errorNotify('O horário de início e fim não podem ser iguais');
      }

      setValue('beginTime', selectedDate);
    }

    setShowBeginTime(false);
  }

  function handleShowEndTimePicker() {
    setShowEndTime(true);
  }

  const beginTime = watch('beginTime');

  function handleChangeEndTime(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    if (selectedDate) {
      if (isEqual(selectedDate, beginTime)) {
        errorNotify('O horário de início e fim não podem ser iguais');
      }

      setValue('endTime', selectedDate);
    }

    setShowEndTime(false);
  }

  function catchSetAvailabilityError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Ocorreu um erro ao definir sua disponibilidade');
        break;
    }
  }

  async function setAvailability({
    days,
    beginTime,
    endTime,
  }: TSetBusinessAvailabilityFormData) {
    const weekDaysAvailable = Object.values(days);

    if (weekDaysAvailable.every((element) => element === false)) {
      errorNotify('É necessário selecionar pelo menos um dia da semana');
      return;
    }

    const formattedWeekDays = weekDaysAvailable.reduce<string[]>(
      (weekDaysAccumulator, isAvailable, day) => {
        if (isAvailable) {
          weekDaysAccumulator.push(String(day + 1));
        }

        return weekDaysAccumulator;
      },
      []
    );

    const formattedBeginTime = `${formatTime(beginTime)}:00`;
    const formattedEndTime = `${formatTime(endTime)}:00`;

    try {
      if (hasAvailability) {
        await agendifyApiClient.patch(
          `${AGENDIFY_API_ROUTES.AVAILABILITY_BY_BUSINESS}/${businessId}`,
          {
            start_time: formattedBeginTime,
            end_time: formattedEndTime,
            weekdays: formattedWeekDays,
          }
        );
      } else {
        await agendifyApiClient.post(AGENDIFY_API_ROUTES.AVAILABILITY, {
          business_id: businessId,
          start_time: formattedBeginTime,
          end_time: formattedEndTime,
          weekdays: formattedWeekDays,
        });
      }

      successNotify('Disponibilidade atualizada com sucesso');
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchSetAvailabilityError });
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const availabilityResponse = await agendifyApiClient.get<
            IAvailabilityResponse[]
          >(`${AGENDIFY_API_ROUTES.AVAILABILITY_BY_BUSINESS}/${businessId}`);

          const availabilityData = availabilityResponse.data;

          if (availabilityData.length > 0) {
            setHasAvailability(true);

            availabilityData.forEach((availability) => {
              const day = WEEK_DAY[availability.weekdays_id];

              setValue(`days.${day}`, true);
            });

            const start = new Date();
            const end = new Date();

            const availabilityStartTime =
              availabilityData[0].start_time.split(':');
            const availabilityEndTime = availabilityData[0].end_time.split(':');

            start.setHours(
              Number(availabilityStartTime[0]),
              Number(availabilityStartTime[1]),
              Number(availabilityStartTime[2])
            );
            end.setHours(
              Number(availabilityEndTime[0]),
              Number(availabilityEndTime[1]),
              Number(availabilityEndTime[2])
            );

            setValue('beginTime', start);
            setValue('endTime', end);
          }
        } catch (error) {
          setHasAvailability(false);
        }
      })();
    }, [])
  );

  const sundayIsChecked = watch('days.sunday');
  const mondayIsChecked = watch('days.monday');
  const tuesdayIsChecked = watch('days.tuesday');
  const wednesdayIsChecked = watch('days.wednesday');
  const thursdayIsChecked = watch('days.thursday');
  const fridayIsChecked = watch('days.friday');
  const saturdayIsChecked = watch('days.saturday');

  return (
    <Container>
      <ScrollView className="w-full px-5">
        <SectionTitle title="Disponibilidade na semana" margin="my-5" />

        <View className="flex-row">
          <View
            className={`
              h-full w-3 bg-BLUE_500
              rounded-md
            `}
          />

          <View className="flex-1 py-1">
            <CheckboxDay
              day="Domingo"
              isChecked={sundayIsChecked}
              onCheck={() => handleCheckDay('sunday')}
            />
            <CheckboxDay
              day="Segunda-feira"
              isChecked={mondayIsChecked}
              onCheck={() => handleCheckDay('monday')}
            />
            <CheckboxDay
              day="Terça-feira"
              isChecked={tuesdayIsChecked}
              onCheck={() => handleCheckDay('tuesday')}
            />
            <CheckboxDay
              day="Quarta-feira"
              isChecked={wednesdayIsChecked}
              onCheck={() => handleCheckDay('wednesday')}
            />
            <CheckboxDay
              day="Quinta-feira"
              isChecked={thursdayIsChecked}
              onCheck={() => handleCheckDay('thursday')}
            />
            <CheckboxDay
              day="Sexta-feira"
              isChecked={fridayIsChecked}
              onCheck={() => handleCheckDay('friday')}
            />
            <CheckboxDay
              day="Sábado"
              isChecked={saturdayIsChecked}
              onCheck={() => handleCheckDay('saturday')}
            />
          </View>
        </View>

        <SectionTitle title="Horário de atendimento" margin="my-5" />

        {showBeginTime && (
          <DateTimePicker
            testID="beginTimePicker"
            value={beginTime}
            mode="time"
            display="default"
            is24Hour
            onChange={handleChangeBeginTime}
          />
        )}

        {showEndTime && (
          <DateTimePicker
            testID="endTimePicker"
            value={endTime}
            mode="time"
            display="default"
            is24Hour
            onChange={handleChangeEndTime}
          />
        )}

        <View className="flex-row justify-between gap-4 mb-6">
          <View className="flex-1">
            <TouchableOpacity
              testID="beginTimePickerButton"
              className={`
              flex-row items-center justify-between
              bg-GRAY_200 rounded-lg px-4 py-2
              `}
              onPress={handleShowBeginTimePicker}
            >
              <View>
                <Text className="text-sm text-GRAY_800">Início</Text>
                <Text className="text-base text-GRAY_800 font-bold">
                  {formatTime(beginTime)}
                </Text>
              </View>
              <ClockClockwise size={40} />
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <TouchableOpacity
              testID="endTimePickerButton"
              className={`
              flex-row items-center justify-between
              bg-GRAY_200 rounded-lg px-4 py-2
              `}
              onPress={handleShowEndTimePicker}
            >
              <View>
                <Text className="text-sm text-GRAY_800">Fim</Text>
                <Text className="text-base text-GRAY_800 font-bold">
                  {formatTime(endTime)}
                </Text>
              </View>
              <ClockClockwise size={40} />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Confirmar disponibilidade"
          text="Confirmar disponibilidade"
          onPress={handleSubmit(setAvailability)}
          isLoading={isSubmitting}
        />
      </ScrollView>
    </Container>
  );
}
