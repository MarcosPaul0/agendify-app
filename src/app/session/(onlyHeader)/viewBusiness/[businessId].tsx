import { Container } from '@components/Container';
import { ServiceCard } from '@components/ServiceCard';
import { Image } from 'expo-image';
import { View, Text, ScrollView } from 'react-native';

import { Spinner } from '@components/Spinner';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';

import { useRouter, useSearchParams, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { IBusinessResponse } from 'src/interfaces/businessResponse.interface';
import { IServiceResponse } from 'src/interfaces/serviceResponse.interface';

import { RatingForm } from '@components/RatingForm';
import { ServiceModal } from '@components/ServiceModal';
import { getImageUrl } from '@utils/getImageUrl';
import { useScheduleContext } from '@contexts/ScheduleContext';
import { RatingsList } from '@components/RatingsList';

export default function ViewBusiness() {
  const params = useSearchParams();
  const router = useRouter();

  const { schedule } = useScheduleContext();

  const [serviceModalIsOpen, setServiceModalIsOpen] = useState(false);
  const [activeService, setActiveService] = useState<IServiceResponse | null>(
    null
  );
  const [business, setBusiness] = useState<IBusinessResponse | null>(null);

  const businessId = params.businessId as string;

  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery<IServiceResponse[]>(
    ['servicesByBusiness', businessId],
    async () => {
      try {
        const servicesResponse = await agendifyApiClient.get<
          IServiceResponse[]
        >(`${AGENDIFY_API_ROUTES.SERVICES_BY_BUSINESS}/${businessId}`);

        return servicesResponse.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [],
      enabled: true,
    }
  );

  async function getBusinessData() {
    try {
      const businessResponse = await agendifyApiClient.get<IBusinessResponse>(
        `${AGENDIFY_API_ROUTES.BUSINESS}/${businessId}`
      );

      setBusiness(businessResponse.data);
    } catch {
      router.push(APP_ROUTES.SEARCH_BUSINESS);
    }
  }

  useFocusEffect(
    useCallback(() => {
      refetch();

      (async () => {
        await getBusinessData();
      })();
    }, [])
  );

  function handleOpenServiceModal(service: IServiceResponse) {
    setActiveService(service);
    setServiceModalIsOpen(true);
  }

  function handleCloseServiceModal() {
    setServiceModalIsOpen(false);
  }

  if (!business) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView className="flex-1 w-full">
        <View className="w-full bg-BLUE_100 pt-4 pb-5 items-center mb-2">
          <Image
            source={getImageUrl(business.image_url)}
            className={`
            h-32 w-32 rounded-full
            border-4 border-BLUE_500
          `}
          />
          <Text className="font-bold text-lg mt-2 text-BLUE_900">
            {business.name}
          </Text>

          <Text className="text-sm text-center mt-1 text-GRAY_600 px-5">
            {business.address.street} - {business.address.number} -{' '}
            {business.address.city} - {business.address.state}
          </Text>
        </View>

        <View className="w-full flex-1 px-5 relative">
          <View className="h-8" />

          {isLoading ? (
            <Spinner />
          ) : (
            services?.map((service) => {
              const serviceScheduled = schedule.find(
                (schedule) => schedule.serviceId === service.id
              );

              const serviceCount = serviceScheduled
                ? serviceScheduled.count
                : 0;

              return (
                <ServiceCard
                  key={service.id}
                  service={{
                    id: service.id,
                    duration: service.duration,
                    imageUrl: service.image_url,
                    description: service.description,
                    name: service.name,
                    price: service.price,
                  }}
                  showNumber
                  count={serviceCount}
                  onPress={() => handleOpenServiceModal(service)}
                />
              );
            })
          )}
        </View>

        <RatingForm businessId={businessId} updateRating={getBusinessData} />

        <RatingsList businessId={businessId} />
      </ScrollView>

      <ServiceModal
        isOpen={serviceModalIsOpen}
        closeModal={handleCloseServiceModal}
        businessId={businessId}
        service={activeService as IServiceResponse}
      />
    </Container>
  );
}
