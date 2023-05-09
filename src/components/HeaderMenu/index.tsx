import { APP_ROUTES } from '@constants/appRoutes.constant';
import { COLORS } from '@constants/colors.constant';
import { Link } from 'expo-router';
import { Clock, Gear } from 'phosphor-react-native';
import { View } from 'react-native';

export function HeaderMenu() {
  return (
    <View className="px-2 flex-row gap-3">
      <Link href={APP_ROUTES.MANAGE_BUSINESS}>
        <Gear size={24} color={COLORS.BLUE_900} />
      </Link>
      <Link href={APP_ROUTES.MY_AVAILABILITY}>
        <Clock size={24} color={COLORS.BLUE_900} />
      </Link>
    </View>
  );
}
