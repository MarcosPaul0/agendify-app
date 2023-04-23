import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { SplashScreen } from 'expo-router';
import { IScreenContainerProps } from './interfaces/screenContainerProps.interface';

SplashScreen.preventAutoHideAsync();

export function Container({ children, isScrollable }: IScreenContainerProps) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="dark" />

      {isScrollable ? (
        <SafeAreaView className="flex-1 items-center bg-midnight px-6 pt-6 bg-GRAY_50">
          <ScrollView className="bg-GRAY_50">{children}</ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView className="flex-1 items-center bg-midnight px-6 pt-6 bg-GRAY_50">
          {children}
        </SafeAreaView>
      )}
    </>
  );
}
