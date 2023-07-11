import { IUserData } from '@contexts/AuthContext/interfaces/userData.interface';
import { IServiceResponse } from './serviceResponse.interface';

export interface IScheduleResponse {
  id: string;
  start_datetime: string;
  end_datetime: string;
  Service: IServiceResponse;
  user: IUserData;
}
