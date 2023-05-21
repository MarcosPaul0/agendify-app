import { AxiosError } from 'axios';
import { IErrorResponse } from './errorResponse.interface';

export interface IErrorHandleParams {
  error: Error | AxiosError | unknown;
  catchAxiosError: (error: IErrorResponse) => void;
}
