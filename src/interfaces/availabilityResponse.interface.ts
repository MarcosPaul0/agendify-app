import { TWeekDay } from 'src/types/weekDay.type';

export interface IAvailabilityResponse {
  id: string;
  business_id: string;
  weekdays_id: TWeekDay;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}
