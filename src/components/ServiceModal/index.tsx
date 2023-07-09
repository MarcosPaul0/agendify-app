import { View, Text } from 'react-native';
import { Button } from '@components/Button';
import { CountInput } from '@components/CountInput';
import { useScheduleContext } from '@contexts/ScheduleContext';
import { useMemo } from 'react';
import { formatPrice } from '@utils/formatPrice';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { getServiceTimeInMinutes } from '@utils/getServiceTimeInMinutes';
import { IServiceModalProps } from './interface/serviceModalProps.interface';

export function ServiceModal({
  businessId,
  service,
  isOpen,
  closeModal,
}: IServiceModalProps) {
  const router = useRouter();

  const { schedule, incrementScheduledService, decrementScheduledService } =
    useScheduleContext();

  function redirectToSchedule() {
    closeModal();
    router.push(`${APP_ROUTES.SCHEDULE}/${businessId}`);
  }

  const serviceId = service?.id;

  const serviceScheduled = schedule.find(
    (schedule) => schedule.serviceId === serviceId
  );

  const serviceCount = serviceScheduled ? serviceScheduled.count : 0;

  const totalPrice = useMemo(
    () =>
      formatPrice(
        schedule.reduce(
          (totalPriceAccumulator, schedule) =>
            totalPriceAccumulator + schedule.price * schedule.count,
          0
        )
      ),
    [schedule]
  );

  const scheduleButtonIsDisabled = schedule.length === 0;

  const serviceTimeInMinutes = service
    ? getServiceTimeInMinutes(service.duration)
    : 0;

  return isOpen ? (
    <View
      className={`
          bg-GRAY_100 border-t border-gray-300
          px-5 py-2  w-full bottom-0
        `}
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-sm">Tempo estimado</Text>
        <Text className="font-bold text-sm">{totalPrice}</Text>
      </View>

      <View className="flex-row items-center justify-between mt-2">
        <Text className="font-bold text-sm">Total</Text>
        <Text className="font-bold text-sm">{totalPrice}</Text>
      </View>

      <View className="flex-row">
        <CountInput
          count={serviceCount}
          increment={() =>
            incrementScheduledService({
              serviceId,
              name: service.name,
              timeInMinutes: serviceTimeInMinutes,
              price: service.price,
            })
          }
          decrement={() => decrementScheduledService(serviceId)}
        />
        <View className="w-5" />
        <Button
          title="schedule"
          text="Agendar"
          width="flex-1"
          onPress={redirectToSchedule}
          disabled={scheduleButtonIsDisabled}
        />
      </View>
    </View>
  ) : null;
}
