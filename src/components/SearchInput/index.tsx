import { MagnifyingGlass } from 'phosphor-react-native';
import { View, TextInput } from 'react-native';
import { COLORS } from '@constants/colors.constant';
import { ISearchInputProps } from './interfaces/searchInputProps.interface';

export function SearchInput({
  search,
  changeSearch,
  ...rest
}: ISearchInputProps) {
  return (
    <View
      className={`
        h-11 pl-2.5 my-4 flex-row items-center mx-9
        bg-GRAY_100 border border-GRAY_500 rounded-lg
      `}
    >
      <MagnifyingGlass size={24} color={COLORS.GRAY_700} weight="bold" />
      <TextInput
        className={`
          text-base text-GRAY_800 w-full h-11 pl-2.5 
        `}
        value={search}
        onChangeText={changeSearch}
        selectionColor={COLORS.GRAY_800}
        {...rest}
      />
    </View>
  );
}
