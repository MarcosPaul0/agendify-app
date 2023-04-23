import { ButtonProps } from 'react-native';
import { TButtonVariants } from '../types/buttonVariants.type';

export interface IButtonProps extends ButtonProps {
  text: string;
  isLoading?: boolean;
  variant?: TButtonVariants;
}
