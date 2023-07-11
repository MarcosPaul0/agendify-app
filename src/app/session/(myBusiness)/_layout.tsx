import { HeaderMenu } from '@components/HeaderMenu';
import { COLORS } from '@constants/colors.constant';
import { useSearchParams } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { Calendar, House } from 'phosphor-react-native';

export default function TabsLayout() {
  const params = useSearchParams();

  const businessId = params?.businessId as string;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.BLUE_100,
        },
      }}
    >
      <Tabs.Screen
        options={{
          headerTitle: () => null,
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          headerRight: () => <HeaderMenu businessId={businessId} />,
          tabBarLabel: 'Meu negócio',
          tabBarLabelStyle: {
            color: COLORS.BLUE_800,
          },
          tabBarIcon: ({ focused }) => (
            <House
              size={32}
              color={focused ? COLORS.BLUE_600 : COLORS.BLUE_800}
            />
          ),
        }}
        name="myBusiness/[businessId]"
      />

      <Tabs.Screen
        initialParams={{
          businessId,
        }}
        options={{
          header: () => null,
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          tabBarLabel: 'Agenda',
          tabBarLabelStyle: {
            color: COLORS.BLUE_800,
          },
          tabBarIcon: ({ focused }) => (
            <Calendar
              size={32}
              color={focused ? COLORS.BLUE_600 : COLORS.BLUE_800}
            />
          ),
        }}
        name="mySchedule/[businessId]"
      />

      <Tabs.Screen
        options={{
          headerTitle: 'Minha Disponibilidade',
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          tabBarButton: () => null,
        }}
        name="myAvailability/[businessId]"
      />
    </Tabs>
  );
}
