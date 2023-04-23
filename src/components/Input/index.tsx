import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { COLORS } from '@constants/colors.constant';
import type { IControlledInputProps } from './interfaces/controlledInputProps.interface';

export function ControlledInput({
  label,
  errorMessage,
  inputProps,
  controllerProps,
  containerStyle = 'w-full',
}: IControlledInputProps) {
  const inputBorderStyle = errorMessage ? 'border-ERROR' : 'border-GRAY_500';

  return (
    <View className={containerStyle}>
      <Text className="text-base text-GRAY_800 font-bold">{label}</Text>
      <Controller
        {...controllerProps}
        render={({ field: { value, onChange } }) => (
          <TextInput
            {...inputProps}
            className={`
              text-base text-GRAY_800 w-full py-1.5 pl-2.5
              bg-GRAY_100 border ${inputBorderStyle} rounded-lg
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
