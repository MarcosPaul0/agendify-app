export interface IScheduleOptionProps {
  startTime: Date;
  endTime: Date;
  items: string;
  isChecked: boolean;
  handleCheck: (startTime: Date, endTime: Date) => void;
}
