import { TextInputProps } from 'react-native';

export interface ISearchInputProps extends TextInputProps {
  search: string;
  changeSearch: (text: string) => void;
}
