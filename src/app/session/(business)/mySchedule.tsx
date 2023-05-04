import { Calendar } from '@components/Calendar';
import { Container } from '@components/Container';
import { View, StatusBar } from 'react-native';

export default function MySchedule() {
  return (
    <Container bgColor="blue">
      <View
        style={{
          marginTop: StatusBar.currentHeight,
        }}
        className={`
          w-full py-2
        `}
      >
        <Calendar />
      </View>

      <View className="w-full flex-1 bg-GRAY_50" />
    </Container>
  );
}
