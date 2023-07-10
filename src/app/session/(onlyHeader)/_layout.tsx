import { Stack } from 'expo-router/stack';
import { COLORS } from '@constants/colors.constant';
import { ScheduleContextProvider } from '@contexts/ScheduleContext';

export default function StackLayout() {
  return (
    <ScheduleContextProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          headerShadowVisible: false,
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
          options={{ title: '' }}
          name="viewBusiness/[businessId]"
        />

        <Stack.Screen
          options={{ title: 'Finalizar Agendamento' }}
          name="schedule/[businessId]"
        />
      </Stack>
    </ScheduleContextProvider>
  );
}
