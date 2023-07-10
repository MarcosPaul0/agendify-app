import { ISchedule } from './schedule.interface';
import { IScheduleOperation } from './scheduleOperation.interface';

export interface IScheduleContextData {
  schedule: ISchedule[];
  totalTime: number;
  incrementScheduledService: (operationParams: IScheduleOperation) => void;
  decrementScheduledService: (serviceId: string) => void;
  clearScheduledServices: () => void;
}
