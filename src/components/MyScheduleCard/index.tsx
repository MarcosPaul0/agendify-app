import { Text, TouchableOpacity, View } from 'react-native';
import { Trash } from 'phosphor-react-native';
import { IMyScheduleCardProps } from './interfaces/myScheduleCardProps.interface';

export function MyScheduleCard({ schedule, onDelete }: IMyScheduleCardProps) {
  return (
    <View>
      <View>
        <Text>{schedule.start_datetime}</Text>
        <Text>{schedule.end_datetime}</Text>
      </View>

      <View>
        <Text>{schedule.service.name}</Text>
        <Text>{schedule.service.duration}</Text>
        <Text>{schedule.service.price}</Text>
      </View>

      <TouchableOpacity onPress={() => onDelete(schedule.id)}>
        <Trash size={24} />
      </TouchableOpacity>
    </View>
  );
}
