import { Container } from '@components/Container';
import { MyServiceCard } from '@components/MyServiceCard';
import { Spinner } from '@components/Spinner';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { BASE_URL } from '@constants/baseUrl.constant';
import { COLORS } from '@constants/colors.constant';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';

import { Image } from 'expo-image';
import { Link, useRouter, useSearchParams, useFocusEffect } from 'expo-router';
import { Plus } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { IBusinessResponse } from 'src/interfaces/businessResponse.interface';
import { IServiceResponse } from 'src/interfaces/serviceResponse.interface';

export default function MyBusiness() {
  const params = useSearchParams();
  const router = useRouter();

  const [business, setBusiness] = useState<IBusinessResponse | null>(null);

  const { businessId } = params;

  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery<IServiceResponse[]>(
    ['myServices', businessId],
    async () => {
      try {
        const response = await agendifyApiClient.get<IServiceResponse[]>(
          `${AGENDIFY_API_ROUTES.SERVICES_BY_BUSINESS}/${businessId}`
        );

        return response.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [],
    }
  );

  useFocusEffect(
    useCallback(() => {
      refetch();

      (async () => {
        try {
          const response = await agendifyApiClient.get<IBusinessResponse>(
            `${AGENDIFY_API_ROUTES.BUSINESS}/${businessId}`
          );

          setBusiness(response.data);
        } catch {
          router.push(APP_ROUTES.MY_BUSINESS_LIST);
        }
      })();
    }, [])
  );

  const lastServicePosition = services && services.length - 1;

  if (!business) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <View className="w-full bg-BLUE_100 pb-10 items-center">
        <Image
          source={`${BASE_URL}/${business.image_url}`}
          className={`
            h-32 w-32 rounded-full
            border-4 border-BLUE_500
          `}
        />
        <Text className="font-bold text-lg mt-2 text-BLUE_900">
          {business.name}
        </Text>
      </View>

      <ScrollView
        horizontal
        className="mt-4 h-40"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Link
          className="ml-5"
          href={`${APP_ROUTES.REGISTER_SERVICE}/${businessId}`}
        >
          <View
            className={`
              rounded-lg bg-GRAY_100 border border-GRAY_500
              items-center justify-center  h-40 px-4
            `}
          >
            <Plus size={42} color={COLORS.GRAY_600} />
            <Text className="text-lg text-GRAY_600 text-center">
              Novo Serviço
            </Text>
          </View>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          services?.map((service, index) => (
            <MyServiceCard
              key={service.id}
              isLastItem={lastServicePosition === index}
              service={{
                id: service.id,
                duration: service.duration,
                imageUrl: service.image_url,
                name: service.name,
                price: service.price,
              }}
            />
          ))
        )}
      </ScrollView>
    </Container>
  );
}
