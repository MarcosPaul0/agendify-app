import { Controller } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';
import { View, Text } from 'react-native';
import { COLORS } from '@constants/colors.constant';
import { IControlledMaskInputProps } from './interfaces/controlledMaskInputProps.interface';

export function ControlledMaskInput({
  mask,
  controllerProps,
  label,
  errorMessage,
  inputProps,
  containerStyle = 'w-full',
}: IControlledMaskInputProps) {
  const inputBorderStyle = errorMessage ? 'border-ERROR' : 'border-GRAY_500';

  return (
    <View className={containerStyle}>
      <Text className="text-base text-GRAY_800 font-bold">{label}</Text>
      <Controller
        {...controllerProps}
        render={({ field: { value, onChange } }) => (
          <MaskedTextInput
            {...inputProps}
            mask={mask}
            className={`
              text-base text-GRAY_800 w-full py-1.5 pl-2.5
              bg-GRAY_100 border ${inputBorderStyle} rounded-lg
              max-h-20
            `}
            selectionColor={COLORS.GRAY_800}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text className="text-ERROR pl-1 h-6">{errorMessage}</Text>
    </View>
  );
}
