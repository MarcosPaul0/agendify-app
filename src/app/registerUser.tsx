import { ControlledInput } from '@components/Input';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/Button';
import { Logo } from '@assets/icons/Logo';
import { LinkButton } from '@components/LinkButton';
import { useRouter } from 'expo-router';
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
      .email('Email inválido')
      .refine(
        (password) => !(password.length > 255),
        'Número máximo de caracteres é 255'
      ),
    password: z
      .string({ required_error: 'Campo obrigatório' })
      .refine(
        (password) => !(password.length < 10),
        'A senha deve ter no mínimo 10 caracteres'
      )
      .refine(
        (password) => !(password.length > 255),
        'Número máximo de caracteres é 255'
      )
      .refine(
        (password) => !password.includes(' '),
        'A senha não pode ter espaço'
      )
      .refine(
        (password) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.!?$%_-])[A-Za-z\d.!?$%_-]{10,}$/.test(
            password
          ),
        'A senha precisa ter pelo menos: um caractere especial, uma letra maiúscula, uma letra minúscula e um número'
      ),
    confirmPassword: z.string({ required_error: 'Campo obrigatório' }),
  })
  .superRefine((schema, ctx) => {
    if (schema.password !== schema.confirmPassword) {
      ctx.addIssue({
        message: 'As senhas não conferem',
        path: ['confirmPassword'],
        code: 'custom',
      });
    }
  });

type TRegisterUserFormData = z.infer<typeof registerUserFormValidationSchema>;

export default function RegisterUser() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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
            errorMessage={errors.confirmPassword?.message}
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
            isLoading={isSubmitting}
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

RegisterUser.displayName = 'RegisterUser';
