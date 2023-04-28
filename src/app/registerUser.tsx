import { ControlledInput } from '@components/Input';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/Button';
import { Logo } from '@assets/icons/Logo';
import { LinkButton } from '@components/LinkButton';
import { Stack } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { Container } from '@components/Container';

const registerUserFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
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

  async function registerUser() {
    // TODO adicionar integração com a API
  }

  return (
    <Container>
      <Stack.Screen options={{ title: 'Overview' }} />
      <View className="py-20">
        <Logo />
      </View>

      <View className="w-full px-6">
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
        <LinkButton text="Entrar" variant="outlined" href={APP_ROUTES.LOGIN} />
      </View>
    </Container>
  );
}
