import { Container } from '@components/Container';
import { MyScheduleCard } from '@components/MyScheduleCard';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { useNotify } from '@hooks/useNotify';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { IScheduleResponse } from 'src/interfaces/scheduleResponse.interface';

export function MyAppointments() {
  const { errorNotify, successNotify } = useNotify();

  const [appointments, setAppointments] = useState<IScheduleResponse[]>([]);

  function catchDeleteAppointmentError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Ocorreu algum erro ao cancelar seu agendamento');
        break;
    }
  }

  async function deleteAppointment(scheduleId: string) {
    try {
      await agendifyApiClient.delete(
        `${AGENDIFY_API_ROUTES.MY_RATINGS}/${scheduleId}`
      );

      successNotify('Agendamento cancelado com sucesso');
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchDeleteAppointmentError });
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const appointmentsResponse = await agendifyApiClient.get<
            IScheduleResponse[]
          >(AGENDIFY_API_ROUTES.MY_SCHEDULES);

          setAppointments(appointmentsResponse.data);
        } catch {
          setAppointments([]);
        }
      })();
    }, [])
  );

  return (
    <Container>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <MyScheduleCard schedule={item} onDelete={deleteAppointment} />
        )}
      />
    </Container>
  );
}
