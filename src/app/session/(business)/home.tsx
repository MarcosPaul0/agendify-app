import { Container } from '@components/Container';
import { Image } from 'expo-image';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <Container hasMarginTop={false}>
      <View className="w-full bg-BLUE_100 pb-10 items-center">
        <Image
          source="https://avatars.githubusercontent.com/u/64232527?v=4"
          className={`
            h-32 w-32 rounded-full
            border-4 border-BLUE_500
          `}
        />
        <Text className="font-bold text-lg mt-2 text-BLUE_900">
          Meu negócio
        </Text>
      </View>
    </Container>
  );
}
