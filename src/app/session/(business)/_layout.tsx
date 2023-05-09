import { HeaderMenu } from '@components/HeaderMenu';
import { COLORS } from '@constants/colors.constant';
import { Tabs } from 'expo-router/tabs';
import { Calendar, House } from 'phosphor-react-native';

export default function TabsLayout() {
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
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          headerRight: () => <HeaderMenu />,
          tabBarIcon: ({ focused }) => (
            <House
              size={32}
              color={focused ? COLORS.BLUE_600 : COLORS.BLUE_800}
            />
          ),
        }}
        name="home"
      />

      <Tabs.Screen
        options={{
          header: () => null,
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          tabBarIcon: ({ focused }) => (
            <Calendar
              size={32}
              color={focused ? COLORS.BLUE_600 : COLORS.BLUE_800}
            />
          ),
        }}
        name="mySchedule"
      />

      <Tabs.Screen
        options={{
          headerTitle: 'Dados do meu negócio',
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          tabBarButton: () => null,
        }}
        name="manageBusiness"
      />

      <Tabs.Screen
        options={{
          headerTitle: 'Disponibilidade',
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: COLORS.BLUE_100,
          },
          tabBarButton: () => null,
        }}
        name="myAvailability"
      />
    </Tabs>
  );
}
