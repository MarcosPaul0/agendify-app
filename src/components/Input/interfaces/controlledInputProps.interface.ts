import { TextInputProps } from 'react-native';

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

export interface IControlledInputProps {
  label?: string;
  errorMessage?: string;
  inputProps?: TextInputProps;
  controllerProps: TControllerProps;
  containerStyle?: string;
}
