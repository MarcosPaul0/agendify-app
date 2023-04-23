import { Link } from 'expo-router';
import { BUTTON_VARIANTS } from '@components/Button/types/buttonVariants.type';
import { ILinkButtonProps } from './interfaces/linkButtonProps.interface';

const BUTTON_VARIANT = {
  [BUTTON_VARIANTS.filled]: 'bg-BLUE_500',
  [BUTTON_VARIANTS.outlined]: 'bg-transparent',
};

const TEXT_VARIANT = {
  [BUTTON_VARIANTS.filled]: 'text-GRAY_50',
  [BUTTON_VARIANTS.outlined]: 'text-BLUE_500',
};

export function LinkButton({
  text,
  variant = 'filled',
  ...rest
}: ILinkButtonProps) {
  return (
    <Link
      className={`
        w-full h-12 justify-center mt-3 border-2 pt-2.5
        border-BLUE_500 rounded-xl ${BUTTON_VARIANT[variant]}
        font-bold text-center text-base ${TEXT_VARIANT[variant]}
      `}
      {...rest}
    >
      {text}
    </Link>
  );
}
