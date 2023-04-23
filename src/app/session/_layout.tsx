import { APP_ROUTES } from '@constants/appRoutes.constant';
import { COLORS } from '@constants/colors.constant';
import { useRouter, usePathname } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { Briefcase, ListDashes, Plus } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export default function TabsLayout() {
  const router = useRouter();

  const path = usePathname();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.BLUE_100,
        },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <ListDashes
              size={32}
              color={focused ? COLORS.BLUE_600 : COLORS.BLUE_800}
            />
          ),
        }}
        name="searchServices"
      />

      <Tabs.Screen
        options={{
          tabBarShowLabel: false,
          tabBarButton: ({ to }) => {
            if (path === APP_ROUTES.MY_BUSINESS) {
              return (
                <TouchableOpacity
                  className={`
                    p-3 rounded-full bg-BLUE_500
                    absolute bottom-4 left-40
                  `}
                  onPress={() => router.push(to as string)}
                >
                  <Plus size={40} color={COLORS.GRAY_50} />
                </TouchableOpacity>
              );
            }

            return null;
          },
        }}
        name="registerBusiness"
      />

      <Tabs.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Briefcase
              size={32}
              color={focused ? COLORS.BLUE_600 : COLORS.BLUE_800}
            />
          ),
        }}
        name="myServices"
      />
    </Tabs>
  );
}
