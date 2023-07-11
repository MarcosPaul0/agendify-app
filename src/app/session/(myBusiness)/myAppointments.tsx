import { Container } from '@components/Container';
import { MyScheduleCard } from '@components/MyScheduleCard';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { useNotify } from '@hooks/useNotify';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { IScheduleResponse } from 'src/interfaces/scheduleResponse.interface';

export default function MyAppointments() {
  const { errorNotify, successNotify } = useNotify();

  const { data: appointments, refetch } = useQuery(
    ['mySchedules'],
    async () => {
      try {
        const appointmentsResponse = await agendifyApiClient.get<
          IScheduleResponse[]
        >(AGENDIFY_API_ROUTES.MY_SCHEDULES);

        return appointmentsResponse.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [],
    }
  );

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
        `${AGENDIFY_API_ROUTES.SCHEDULE}/${scheduleId}`
      );

      successNotify('Agendamento cancelado com sucesso');
      refetch();
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchDeleteAppointmentError });
    }
  }

  return (
    <Container>
      <FlatList
        className="w-full px-5 py-2"
        data={appointments}
        renderItem={({ item }) => (
          <MyScheduleCard schedule={item} onDelete={deleteAppointment} />
        )}
      />
    </Container>
  );
}
