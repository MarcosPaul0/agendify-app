import { THttpStatus } from 'src/types/httpStatus.type';

export interface IErrorResponse {
  statusCode: THttpStatus;
  message: string;
}
