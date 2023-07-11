import { COLORS } from '@constants/colors.constant';
import { compareDays } from '@utils/compareDays';
import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ICalendarProps } from './interfaces/calendarProps.interface';

type TCalendarDays = Date[][];

export function Calendar({
  minDate,
  maxDate,
  activeDay,
  validWeekDays = [0, 1, 2, 3, 4, 5, 6],
  onChangeDay,
}: ICalendarProps) {
  const [calendarDays, setCalendarDays] = useState<TCalendarDays>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  function handleNextMonth() {
    setMonth((currentMonth) => {
      if (currentMonth === 11) {
        setYear((currentYear) => currentYear + 1);

        return 0;
      }

      return currentMonth + 1;
    });
  }

  function handlePreviousMonth() {
    setMonth((currentMonth) => {
      if (currentMonth === 0) {
        setYear((currentYear) => currentYear - 1);

        return 11;
      }

      return currentMonth - 1;
    });
  }

  function handleActiveDay(day: Date) {
    setMonth(day.getMonth());
    onChangeDay(day);
  }

  function dayIsEnable(date: Date) {
    if (!validWeekDays.includes(date.getDay())) {
      return false;
    }

    if (!minDate && !maxDate) {
      return true;
    }

    date.setHours(0, 0, 0, 0);

    const formattedMinDate = minDate;
    if (formattedMinDate) {
      formattedMinDate.setHours(0, 0, 0, 0);

      if (date < minDate) {
        return false;
      }
    }

    const formattedMaxDate = maxDate;
    if (formattedMaxDate) {
      formattedMaxDate.setHours(0, 0, 0, 0);

      if (date > maxDate) {
        return false;
      }
    }

    return true;
  }

  function getPreviousMonthButtonIsEnabled() {
    if (!minDate) {
      return true;
    }

    const minDateYear = minDate.getFullYear();

    if (year === minDateYear) {
      if (month === 0 && year - 1 < minDateYear) {
        return false;
      }

      if (month - 1 < minDate.getMonth()) {
        return false;
      }
    }

    return true;
  }

  function getNextMonthButtonIsEnabled() {
    if (!maxDate) {
      return true;
    }

    const maxDateYear = maxDate.getFullYear();

    if (year === maxDateYear) {
      if (month === 11 && year + 1 > maxDateYear) {
        return false;
      }

      if (month + 1 > maxDate.getMonth()) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    const now = new Date();

    const currentYear = now.getFullYear();

    const firstDay = new Date(currentYear, month, 1);

    const firstWeekDay = firstDay.getDay();

    setCalendarDays((calendarDays) =>
      calendarDays.map((_, test) =>
        Array.from(
          { length: 7 },
          (_, index) =>
            new Date(currentYear, month, index + test * 7 - firstWeekDay + 1)
        )
      )
    );
  }, [month]);

  const monthText = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
  }).format(new Date(year, month));

  const previousMonthButtonIsDisabled = !getPreviousMonthButtonIsEnabled();
  const nextMonthButtonIsDisabled = !getNextMonthButtonIsEnabled();

  return (
    <View className="justify-start w-full py-1 px-2">
      <View className="flex-row justify-between items-center px-2">
        <TouchableOpacity
          className={`p-1 border-2 rounded-md ${
            previousMonthButtonIsDisabled
              ? 'border-BLUE_200'
              : 'border-BLUE_500'
          }`}
          onPress={handlePreviousMonth}
          disabled={previousMonthButtonIsDisabled}
        >
          <CaretLeft
            size={24}
            color={
              previousMonthButtonIsDisabled ? COLORS.BLUE_200 : COLORS.BLUE_500
            }
          />
        </TouchableOpacity>

        <Text
          className={`
            flex-1 capitalize py-1 px-4 bg-BLUE_400 
            rounded-full text-GRAY_50 text-center mx-4
            font-bold
          `}
        >
          {monthText}
        </Text>

        <TouchableOpacity
          className={`p-1 border-2 rounded-md ${
            nextMonthButtonIsDisabled ? 'border-BLUE_200' : 'border-BLUE_500'
          }`}
          onPress={handleNextMonth}
        >
          <CaretRight
            size={24}
            color={
              nextMonthButtonIsDisabled ? COLORS.BLUE_200 : COLORS.BLUE_500
            }
          />
        </TouchableOpacity>
      </View>

      <View className="grid w-full grid-rows-7 gap-0.5">
        <View className="flex-row justify-center gap-x-3">
          <Text className="w-8 text-center font-bold text-BLUE_700">dom</Text>
          <Text className="w-8 text-center font-bold text-BLUE_700">seg</Text>
          <Text className="w-8 text-center font-bold text-BLUE_700">ter</Text>
          <Text className="w-8 text-center font-bold text-BLUE_700">qua</Text>
          <Text className="w-8 text-center font-bold text-BLUE_700">qui</Text>
          <Text className="w-8 text-center font-bold text-BLUE_700">sex</Text>
          <Text className="w-8 text-center font-bold text-BLUE_700">sab</Text>
        </View>
        {calendarDays.map((week, weekIndex) => {
          const weekKey = `${weekIndex}-${JSON.stringify(week)}`;

          return (
            <View
              key={weekKey}
              className="flex-row gap-x-3 gap-y-1 justify-center"
            >
              {week.map((day, dayIndex) => {
                const dayKey = `${weekIndex}${dayIndex}-${day.toISOString()}`;

                const dateIsDisabled = !dayIsEnable(day);
                const isActiveDay = compareDays(day, activeDay);
                const isDisabledTextColor = dateIsDisabled
                  ? 'text-GRAY_500'
                  : 'text-BLUE_900';
                const isActiveTextColor = isActiveDay
                  ? 'text-GRAY_50 font-bold'
                  : isDisabledTextColor;

                return (
                  <TouchableOpacity
                    key={dayKey}
                    className={`
                        items-center justify-center rounded-md
                        bg-BLUE_100 w-8 h-8 ${isActiveDay && 'bg-BLUE_500'}
                      `}
                    onPress={() => handleActiveDay(day)}
                    disabled={dateIsDisabled}
                  >
                    <Text className={isActiveTextColor}>{day.getDate()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}
