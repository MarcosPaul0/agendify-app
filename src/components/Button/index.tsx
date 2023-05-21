import { Text, TouchableOpacity, View } from 'react-native';
import { Spinner } from '@components/Spinner';
import { IButtonProps } from './interfaces/buttonProps.interface';
import { BUTTON_VARIANTS } from './types/buttonVariants.type';

export function Button({
  text,
  isLoading = false,
  variant = 'filled',
  icon,
  isDanger = false,
  ...rest
}: IButtonProps) {
  const primaryButtonColor = rest.disabled ? 'BLUE_100' : 'BLUE_500';

  const buttonColor = isDanger ? 'ERROR' : primaryButtonColor;

  const BUTTON_VARIANT = {
    [BUTTON_VARIANTS.filled]: `h-11 bg-${buttonColor}`,
    [BUTTON_VARIANTS.outlined]: 'h-10 border-2 bg-transparent',
  };

  const TEXT_VARIANT = {
    [BUTTON_VARIANTS.filled]: 'text-GRAY_50',
    [BUTTON_VARIANTS.outlined]: `text-${buttonColor}`,
  };

  return (
    <TouchableOpacity
      className={`
        w-full justify-center my-3 items-center flex-row
        border-${buttonColor} rounded-xl ${BUTTON_VARIANT[variant]}
      `}
      {...rest}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text
            className={`
            font-bold text-center text-base ${TEXT_VARIANT[variant]}
          `}
          >
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
