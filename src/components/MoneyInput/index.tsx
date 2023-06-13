import { MaskedTextInput } from 'react-native-mask-text';
import { View, Text } from 'react-native';
import { COLORS } from '@constants/colors.constant';
import { IMoneyInputProps } from './interfaces/moneyInputProps.interface';

export function MoneyInput({
  label,
  errorMessage,
  containerStyle = 'w-full',
  ...rest
}: IMoneyInputProps) {
  const inputBorderStyle = errorMessage ? 'border-ERROR' : 'border-GRAY_500';

  return (
    <View className={containerStyle}>
      <Text className="text-base text-GRAY_800 font-bold">{label}</Text>

      <MaskedTextInput
        {...rest}
        type="currency"
        options={{
          prefix: 'R$ ',
          decimalSeparator: ',',
          groupSeparator: '.',
          precision: 2,
        }}
        className={`
              text-base text-GRAY_800 w-full py-1.5 pl-2.5
              bg-GRAY_100 border ${inputBorderStyle} rounded-lg
              max-h-20
            `}
        selectionColor={COLORS.GRAY_800}
      />
      <Text className="text-ERROR pl-1 h-6">{errorMessage}</Text>
    </View>
  );
}
