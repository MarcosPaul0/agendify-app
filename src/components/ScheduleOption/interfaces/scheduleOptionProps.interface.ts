export interface IScheduleOptionProps {
  startTime: Date;
  endTime: Date;
  items: string;
  isChecked: boolean;
  handleCheck: () => void;
}
