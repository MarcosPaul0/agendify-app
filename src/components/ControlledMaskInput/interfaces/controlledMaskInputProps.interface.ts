import { MaskedTextInputProps } from 'react-native-mask-text';

import {
  Control,
  FieldValue,
  RegisterOptions,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

type TControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: string;
  control: Control<FieldValue<any>>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

export interface IControlledMaskInputProps {
  label?: string;
  mask: string;
  errorMessage?: string;
  inputProps?: MaskedTextInputProps;
  controllerProps: TControllerProps;
  containerStyle?: string;
}
