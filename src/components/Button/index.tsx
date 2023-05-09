import { Text, TouchableOpacity } from 'react-native';
import { Spinner } from '@components/Spinner';
import { IButtonProps } from './interfaces/buttonProps.interface';
import { BUTTON_VARIANTS } from './types/buttonVariants.type';

const BUTTON_VARIANT = {
  [BUTTON_VARIANTS.filled]: 'h-12 bg-BLUE_500',
  [BUTTON_VARIANTS.outlined]: 'h-11 border-2 bg-transparent',
};

const TEXT_VARIANT = {
  [BUTTON_VARIANTS.filled]: 'text-GRAY_50',
  [BUTTON_VARIANTS.outlined]: 'text-BLUE_500',
};

export function Button({
  text,
  isLoading = false,
  variant = 'filled',
  ...rest
}: IButtonProps) {
  return (
    <TouchableOpacity
      className={`
        w-full justify-center my-3 
        border-BLUE_500 rounded-xl ${BUTTON_VARIANT[variant]}
      `}
      {...rest}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Text
          className={`
            font-bold text-center text-base ${TEXT_VARIANT[variant]}
          `}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
