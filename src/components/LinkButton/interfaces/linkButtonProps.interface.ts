import { TButtonVariants } from '@components/Button/types/buttonVariants.type';
import { LinkProps } from 'expo-router/build/link/Link';

export interface ILinkButtonProps extends LinkProps {
  text: string;
  variant?: TButtonVariants;
}
