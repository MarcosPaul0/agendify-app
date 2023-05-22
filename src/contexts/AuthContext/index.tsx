import { useEffect, useState, useContext, createContext } from 'react';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_ITEMS } from '@constants/storageItems.constant';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { useNotify } from '@hooks/useNotify';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { errorHandler } from '@utils/errorHandler';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { IAuthContextProviderProps } from './interfaces/authContextProviderProps.interface';
import { IAuthContextData } from './interfaces/authContextData.interface';
import { IUserData } from './interfaces/userData.interface';
import { ILoginParams } from './interfaces/loginParams.interface';

const AuthContext = createContext({} as IAuthContextData);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<IUserData | null>(null);
  const isAuthenticated = !!user;

  const router = useRouter();

  const { errorNotify } = useNotify();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(STORAGE_ITEMS.TOKEN);

      if (token) {
        agendifyApiClient.defaults.headers.Authorization = `Bearer ${token}`;

        try {
          const { data } = await agendifyApiClient.get<IUserData>(
            AGENDIFY_API_ROUTES.ME
          );
          setUser(data);

          router.push(APP_ROUTES.SEARCH_BUSINESS);
        } catch {
          await AsyncStorage.removeItem(STORAGE_ITEMS.TOKEN);

          router.push(APP_ROUTES.LOGIN);
        }
      } else {
        router.push(APP_ROUTES.LOGIN);
      }
    })();
  }, []);

  function catchLoginError(error: IErrorResponse) {
    const { statusCode } = error;

    switch (statusCode) {
      case HTTP_STATUS.UNAUTHORIZED:
        errorNotify('Email ou senha inválido');
        break;
      case HTTP_STATUS.FORBIDDEN:
        errorNotify('Confirme seu email primeiro');
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Ocorreu algum erro tente novamente mais tarde');
        break;
    }
  }

  async function login(loginData: ILoginParams) {
    try {
      const response = await agendifyApiClient.post(
        AGENDIFY_API_ROUTES.LOGIN,
        loginData
      );

      const { token } = response.data;

      agendifyApiClient.defaults.headers.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem(STORAGE_ITEMS.TOKEN, token);

      const { data } = await agendifyApiClient.get<IUserData>(
        AGENDIFY_API_ROUTES.ME
      );

      setUser(data);

      router.push(APP_ROUTES.SEARCH_BUSINESS);
    } catch (error) {
      errorHandler({
        error,
        catchAxiosError: catchLoginError,
      });
    }
  }

  async function logout() {
    setUser(null);

    await AsyncStorage.removeItem(STORAGE_ITEMS.TOKEN);

    router.push(APP_ROUTES.LOGIN);
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
