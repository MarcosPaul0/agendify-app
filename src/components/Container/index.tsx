import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import { IScreenContainerProps } from './interfaces/screenContainerProps.interface';
import { CONTAINER_BG_COLOR } from './constants/containerBgColor.constant';

export function Container({
  children,
  bgColor = 'gray',
}: IScreenContainerProps) {
  return (
    <>
      <StatusBar style="dark" />

      <SafeAreaView
        className={`
          flex-1 items-center bg-midnight ${CONTAINER_BG_COLOR[bgColor]}
        `}
      >
        {children}
      </SafeAreaView>
    </>
  );
}
