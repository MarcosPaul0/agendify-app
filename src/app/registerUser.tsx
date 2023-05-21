import { ControlledInput } from '@components/Input';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/Button';
import { Logo } from '@assets/icons/Logo';
import { LinkButton } from '@components/LinkButton';
import { Stack, useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { Container } from '@components/Container';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { useNotify } from '@hooks/useNotify';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import packageInfo from '../../package.json';

const registerUserFormValidationSchema = z
  .object({
    name: z.string({ required_error: 'Campo obrigatório' }),
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('Email inválido'),
    password: z.string({ required_error: 'Campo obrigatório' }),
    confirmPassword: z.string({ required_error: 'Campo obrigatório' }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

type TRegisterUserFormData = z.infer<typeof registerUserFormValidationSchema>;

export default function RegisterUser() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterUserFormData>({
    resolver: zodResolver(registerUserFormValidationSchema),
  });

  const { successNotify, errorNotify } = useNotify();

  const router = useRouter();

  function catchRegisterUserError(error: IErrorResponse) {
    const { statusCode } = error;

    switch (statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao registrar o usuário');
        break;
    }
  }

  async function registerUser(registerUserData: TRegisterUserFormData) {
    try {
      await agendifyApiClient.post(AGENDIFY_API_ROUTES.USER, registerUserData);

      successNotify('Usuário registrado com sucesso');

      router.push(APP_ROUTES.LOGIN);
    } catch (error) {
      errorHandler({
        error,
        catchAxiosError: catchRegisterUserError,
      });
    }
  }

  return (
    <ScrollView className="w-full">
      <Container>
        <Stack.Screen options={{ title: 'Overview' }} />

        <View className="py-20">
          <Logo />
        </View>

        <View className="w-full px-6">
          <ControlledInput
            label="Nome"
            errorMessage={errors.name?.message}
            controllerProps={{
              control,
              name: 'name',
            }}
          />

          <ControlledInput
            label="Email"
            errorMessage={errors.email?.message}
            controllerProps={{
              control,
              name: 'email',
            }}
            inputProps={{
              textContentType: 'emailAddress',
            }}
          />

          <ControlledInput
            label="Senha"
            errorMessage={errors.password?.message}
            controllerProps={{
              control,
              name: 'password',
            }}
            inputProps={{
              textContentType: 'password',
              secureTextEntry: true,
            }}
          />

          <ControlledInput
            label="Confirmar senha"
            errorMessage={errors.password?.message}
            controllerProps={{
              control,
              name: 'confirmPassword',
            }}
            inputProps={{
              textContentType: 'password',
              secureTextEntry: true,
            }}
          />

          <Button
            title="Registrar"
            text="Registrar"
            onPress={handleSubmit(registerUser)}
          />
          <LinkButton
            text="Entrar"
            variant="outlined"
            href={APP_ROUTES.LOGIN}
          />
        </View>

        <Text className="text-GRAY_500 self-center my-10">
          ALPHA - {packageInfo.version}
        </Text>
      </Container>
    </ScrollView>
  );
}
