import { IScheduleResponse } from 'src/interfaces/scheduleResponse.interface';

export interface IMyScheduleCardProps {
  schedule: IScheduleResponse;
  onDelete: (scheduleId: string) => null | Promise<void>;
}
