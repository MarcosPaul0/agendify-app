import { ReactNode } from 'react';

export interface IScreenContainerProps {
  children: ReactNode;
  bgColor?: 'blue' | 'gray';
  hasMarginTop?: boolean;
}
