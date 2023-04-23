import { ControlledInput } from '@components/Input';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/Button';
import { Logo } from '@assets/icons/Logo';
import { LinkButton } from '@components/LinkButton';
import { Stack, useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { Container } from '@components/Container';
import packageInfo from '../../package.json';

const loginFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TLoginFormData = z.infer<typeof loginFormValidationSchema>;

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
  });

  async function login() {
    // TODO adicionar integração com a API
    router.push(APP_ROUTES.SEARCH_BUSINESS);
  }

  return (
    <Container>
      <Stack.Screen options={{ title: 'Overview' }} />
      <View className="py-20">
        <Logo />
      </View>

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

      <Button title="Entrar" text="Entrar" onPress={handleSubmit(login)} />
      <LinkButton
        text="Registrar-se"
        variant="outlined"
        href={APP_ROUTES.REGISTER_USER}
      />

      <Text className="text-GRAY_500 mx-0 mt-auto">
        ALPHA - {packageInfo.version}
      </Text>
    </Container>
  );
}
