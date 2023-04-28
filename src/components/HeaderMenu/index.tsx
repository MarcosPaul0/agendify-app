import { APP_ROUTES } from '@constants/appRoutes.constant';
import { COLORS } from '@constants/colors.constant';
import { Link } from 'expo-router';
import { Gear } from 'phosphor-react-native';
import { View } from 'react-native';

export function HeaderMenu() {
  return (
    <View className="px-2">
      <Link href={APP_ROUTES.MANAGE_BUSINESS}>
        <Gear size={32} color={COLORS.BLUE_900} />
      </Link>
    </View>
  );
}
