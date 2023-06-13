import { ILoginParams } from './loginParams.interface';
import { IUserData } from './userData.interface';

export interface IAuthContextData {
  user: IUserData | null;
  isAuthenticated: boolean;
  login: (data: ILoginParams) => Promise<void>;
  logout: () => Promise<void>;
}
