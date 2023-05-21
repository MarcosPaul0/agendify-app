import { ControlledInput } from '@components/Input';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/Button';
import { Logo } from '@assets/icons/Logo';
import { LinkButton } from '@components/LinkButton';
import { SplashScreen, Stack } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { Container } from '@components/Container';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useAuthContext } from '@contexts/AuthContext';
import packageInfo from '../../package.json';

const loginFormValidationSchema = z.object({
  login: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Email inválido'),
  password: z.string({ required_error: 'Campo obrigatório' }),
});

type TLoginFormData = z.infer<typeof loginFormValidationSchema>;

export default function Login() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
  });

  const { login } = useAuthContext();

  if (!fontsLoaded) {
    return <SplashScreen />;
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
          errorMessage={errors.login?.message}
          controllerProps={{
            control,
            name: 'login',
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

        <Button
          title="Entrar"
          text="Entrar"
          onPress={handleSubmit(login)}
          isLoading={isSubmitting}
        />
        <LinkButton
          text="Registrar-se"
          variant="outlined"
          href={APP_ROUTES.REGISTER_USER}
        />

        <Text className="text-GRAY_500 self-center mt-10">
          ALPHA - {packageInfo.version}
        </Text>
      </View>
    </Container>
  );
}
