import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { SplashScreen } from 'expo-router';
import { IScreenContainerProps } from './interfaces/screenContainerProps.interface';
import { CONTAINER_BG_COLOR } from './constants/containerBgColor.constant';

SplashScreen.preventAutoHideAsync();

export function Container({
  children,
  bgColor = 'gray',
  hasMarginTop = true,
}: IScreenContainerProps) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  const marginTop = hasMarginTop && 'pt-6';

  return (
    <>
      <StatusBar style="dark" />

      <SafeAreaView
        className={`
          flex-1 items-center bg-midnight ${marginTop} ${CONTAINER_BG_COLOR[bgColor]}
        `}
      >
        {children}
      </SafeAreaView>
    </>
  );
}
