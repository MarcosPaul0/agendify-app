import { Text, View } from 'react-native';
import { ITagProps } from './interfaces/tagProps.interface';

export function Tag({
  text,
  marginLeftIsActive = true,
  size = 'md',
}: ITagProps) {
  return (
    <View
      className={`
        bg-BLUE_400 rounded-md p-1
        ${marginLeftIsActive ? 'ml-2' : ''}  
      `}
    >
      <Text
        className={`
        text-GRAY_50 font-bold
        ${size === 'sm' ? 'text-xs' : 'text-md'}
      `}
      >
        {text}
      </Text>
    </View>
  );
}
