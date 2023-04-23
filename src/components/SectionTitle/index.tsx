import { Text } from 'react-native';
import { ISectionTitleProps } from './interfaces/sectionTitleProps.interface';

export function SectionTitle({ title }: ISectionTitleProps) {
  return (
    <Text
      className={`
        w-full mb-5
        text-xl font-bold text-BLUE_500
      `}
    >
      {title}
    </Text>
  );
}
