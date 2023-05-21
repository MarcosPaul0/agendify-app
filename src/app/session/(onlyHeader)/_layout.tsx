import { Stack } from 'expo-router/stack';
import { COLORS } from '@constants/colors.constant';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.BLUE_100,
        },
      }}
    >
      <Stack.Screen
        options={{ title: 'Dados de usuário' }}
        name="manageUser/[userId]"
      />

      <Stack.Screen
        options={{ title: 'Novo serviço' }}
        name="service/register/[businessId]"
      />

      <Stack.Screen
        options={{ title: 'Dados do serviço' }}
        name="service/manage/[serviceId]"
      />

      <Stack.Screen
        options={{ title: 'Dados do negócio' }}
        name="manageMyBusiness/[businessId]"
      />

      <Stack.Screen
        options={{ title: 'Serviços oferecidos' }}
        name="viewBusiness/[businessId]"
      />
    </Stack>
  );
}
