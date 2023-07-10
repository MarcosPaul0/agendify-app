import { ButtonProps } from 'react-native';
import { ReactNode } from 'react';
import { TButtonVariants } from '../types/buttonVariants.type';

export interface IButtonProps extends ButtonProps {
  text: string;
  isLoading?: boolean;
  variant?: TButtonVariants;
  icon?: ReactNode;
  isDanger?: boolean;
  width?: string;
}
