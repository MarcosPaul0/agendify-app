import { APP_ROUTES } from '@constants/appRoutes.constant';
import { COLORS } from '@constants/colors.constant';
import { useAuthContext } from '@contexts/AuthContext';
import { Link } from 'expo-router';
import {
  Clock,
  Briefcase,
  User,
  List,
  SignOut,
  Calendar,
} from 'phosphor-react-native';
import { useState } from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Menu } from 'react-native-paper';
import { IHeaderMenuProps } from './interfaces/headerMenuProps.interface';

export function HeaderMenu({ businessId }: IHeaderMenuProps) {
  const { user, isAuthenticated, logout } = useAuthContext();

  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  function openMenu() {
    setMenuIsVisible(true);
  }

  function closeMenu() {
    setMenuIsVisible(false);
  }

  function handleMenuPress(event: GestureResponderEvent) {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    openMenu();
  }

  return (
    <View className="px-2 flex-row mx-2">
      <TouchableOpacity onPress={handleMenuPress}>
        <List size={24} />
      </TouchableOpacity>

      <Menu
        anchor={menuAnchor}
        visible={menuIsVisible}
        onDismiss={closeMenu}
        style={{ width: 160 }}
      >
        <View className="gap-2">
          <Link href={`${APP_ROUTES.MANAGER_USER}/${user?.id}`}>
            <View className="flex-row items-center gap-2">
              <User size={24} color={COLORS.BLUE_900} />
              <Text>Meu perfil</Text>
            </View>
          </Link>

          {businessId && (
            <Link
              className="flex-row items-center"
              href={`${APP_ROUTES.MANAGE_MY_BUSINESS}/${businessId}`}
            >
              <View className="flex-row items-center gap-2 ml-2">
                <Briefcase size={24} color={COLORS.BLUE_900} />
                <Text>Dados do negócio</Text>
              </View>
            </Link>
          )}

          {businessId && (
            <Link
              className="flex-row items-center"
              href={`${APP_ROUTES.MY_AVAILABILITY}/${businessId}`}
            >
              <View className="flex-row items-center gap-2 ml-2">
                <Clock size={24} color={COLORS.BLUE_900} />
                <Text>Disponibilidade</Text>
              </View>
            </Link>
          )}

          <Link
            className="flex-row items-center"
            href={APP_ROUTES.MY_APPOINTMENTS}
          >
            <View className="flex-row items-center gap-2 ml-2">
              <Calendar size={24} color={COLORS.BLUE_900} />
              <Text>Agendamentos</Text>
            </View>
          </Link>

          {isAuthenticated && (
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={logout}
            >
              <SignOut size={24} color={COLORS.BLUE_900} />
              <Text>Sair</Text>
            </TouchableOpacity>
          )}
        </View>
      </Menu>
    </View>
  );
}
