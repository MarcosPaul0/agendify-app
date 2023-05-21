import { isAxiosError } from 'axios';
import { IErrorHandleParams } from './interfaces/errorHandlerParams.interface';
import { IErrorResponse } from './interfaces/errorResponse.interface';

export function errorHandler({ error, catchAxiosError }: IErrorHandleParams) {
  if (isAxiosError<IErrorResponse>(error)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    catchAxiosError(error.response!.data);
  }
}
