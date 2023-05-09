import { Text } from 'react-native';
import { ISectionTitleProps } from './interfaces/sectionTitleProps.interface';

export function SectionTitle({ title, margin = 'mb-5' }: ISectionTitleProps) {
  return (
    <Text
      className={`
        w-full ${margin}
        text-xl font-bold text-BLUE_500
      `}
    >
      {title}
    </Text>
  );
}
