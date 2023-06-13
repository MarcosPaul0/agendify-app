import { MaskedTextInputProps } from 'react-native-mask-text';

export interface IMoneyInputProps extends MaskedTextInputProps {
  label: string;
  errorMessage?: string;
  containerStyle?: string;
}
