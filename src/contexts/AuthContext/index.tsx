import { useEffect, useState, useContext, createContext } from 'react';
import { isAxiosError } from 'axios';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient copy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ITEMS } from '@constants/storageItems.constant';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { IErrorResponse } from '@app/interfaces/errorResponse.interface';
import { IAuthContextProviderProps } from './interfaces/authContextProviderProps.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

interface LoginParams {
  login: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(STORAGE_ITEMS.TOKEN);
      if (token) {
        agendifyApiClient.defaults.headers.Authorization = `Bearer ${token}`;

        try {
          const { data } = await agendifyApiClient.get<User>(
            AGENDIFY_API_ROUTES.ME
          );
          setUser(data);

          router.push(APP_ROUTES.HOME);
        } catch {
          await AsyncStorage.removeItem(STORAGE_ITEMS.TOKEN);

          router.push(APP_ROUTES.LOGIN);
        }
      } else {
        router.push(APP_ROUTES.LOGIN);
      }
    })();
  }, []);

  async function login({ login, password }: LoginParams) {
    try {
      const response = await agendifyApiClient.post(AGENDIFY_API_ROUTES.LOGIN, {
        login,
        password,
      });

      const { token } = response.data;

      agendifyApiClient.defaults.headers.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem(STORAGE_ITEMS.TOKEN, token);

      const { data } = await agendifyApiClient.get<User>(
        AGENDIFY_API_ROUTES.ME
      );

      setUser(data);

      router.push(APP_ROUTES.HOME);
    } catch (error) {
      if (isAxiosError(error)) {
        const { statusCode } = error.response?.data as IErrorResponse;

        console.log(statusCode);

        // switch (statusCode) {
        //   case 401:
        //     errorNotify({
        //       title: 'Error ao logar',
        //       message: 'Email ou senha inválido',
        //     });
        //     break;
        //   case 403:
        //     errorNotify({
        //       title: 'Error ao logar',
        //       message: 'Confirme seu email primeiro',
        //     });
        //     break;
        //   default:
        //     errorNotify({
        //       title: 'Error ao logar',
        //       message: 'Ocorreu algum erro tente novamente mais tarde',
        //     });
        //     break;
        // }
      }
    }
  }

  async function logout() {
    setUser(null);

    await AsyncStorage.removeItem(STORAGE_ITEMS.TOKEN);

    router.push(AGENDIFY_API_ROUTES.LOGIN);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
