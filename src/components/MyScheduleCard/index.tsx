import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Trash } from 'phosphor-react-native';
import { formatTimeDisplay } from '@utils/formatTimeDisplay';
import { COLORS } from '@constants/colors.constant';
import { formatPrice } from '@utils/formatPrice';
import { IMyScheduleCardProps } from './interfaces/myScheduleCardProps.interface';

export function MyScheduleCard({ schedule, onDelete }: IMyScheduleCardProps) {
  function showAlert() {
    Alert.alert(
      'Deletar agendamento?',
      'Tem certeza que deseja deletar o agendamento?',
      [
        { text: 'Cancelar', onPress: () => null },
        { text: 'Confirmar', onPress: () => onDelete(schedule.id) },
      ],
      { cancelable: true }
    );
  }

  return (
    <View className="w-full flex-row items-center bg-GRAY_100 border border-GRAY_300 rounded-xl p-4 mt-4">
      <View className="items-center">
        <Text>{formatTimeDisplay(new Date(schedule.start_datetime))}</Text>
        <Text>-</Text>
        <Text>{formatTimeDisplay(new Date(schedule.end_datetime))}</Text>
      </View>

      <View className="ml-5 pl-5 flex-1 border-l border-GRAY_300 h-full">
        <Text className="text-base font-bold">{schedule.Service.name}</Text>

        <View className="flex-row items-center">
          <Text>{schedule.Service.duration} h</Text>
          <Text className="ml-4">{formatPrice(schedule.Service.price)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={showAlert}>
        <Trash size={30} color={COLORS.ERROR} />
      </TouchableOpacity>
    </View>
  );
}
