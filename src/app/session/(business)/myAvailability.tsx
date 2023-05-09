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
import { useState } from 'react';
import { ClockClockwise } from 'phosphor-react-native';
import { formatTime } from '@utils/formatTime';

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
  const [showBeginTime, setShowBeginTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const { setValue, getValues, watch, handleSubmit } =
    useForm<TSetBusinessAvailabilityFormData>({
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

  function handleChangeBeginTime(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    if (selectedDate) {
      setValue('beginTime', selectedDate);
    }

    setShowBeginTime(false);
  }

  function handleShowEndTimePicker() {
    setShowEndTime(true);
  }

  function handleChangeEndTime(
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    if (selectedDate) {
      setValue('endTime', selectedDate);
    }

    setShowEndTime(false);
  }

  async function setAvailability() {
    // TODO adicionar integração com a API
  }

  const sundayIsChecked = watch('days.sunday');
  const mondayIsChecked = watch('days.monday');
  const tuesdayIsChecked = watch('days.tuesday');
  const wednesdayIsChecked = watch('days.wednesday');
  const thursdayIsChecked = watch('days.thursday');
  const fridayIsChecked = watch('days.friday');
  const saturdayIsChecked = watch('days.saturday');
  const beginTime = watch('beginTime');
  const endTime = watch('endTime');

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
            value={beginTime}
            mode="time"
            display="default"
            is24Hour
            onChange={handleChangeBeginTime}
          />
        )}

        {showEndTime && (
          <DateTimePicker
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
        />
      </ScrollView>
    </Container>
  );
}
