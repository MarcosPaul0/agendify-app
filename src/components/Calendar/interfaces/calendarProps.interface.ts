export interface ICalendarProps {
  activeDay: Date;
  minDate?: Date;
  maxDate?: Date;
  validWeekDays?: number[];
  onChangeDay: (date: Date) => void;
}
