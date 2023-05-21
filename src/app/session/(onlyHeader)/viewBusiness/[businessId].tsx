import { Container } from '@components/Container';
import { ServiceCard } from '@components/ServiceCard';
import { Image } from 'expo-image';
import { View, Text, FlatList } from 'react-native';

import { Spinner } from '@components/Spinner';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { BASE_URL } from '@constants/baseUrl.constant';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';

import { useRouter, useSearchParams, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { IBusinessResponse } from 'src/interfaces/businessResponse.interface';
import { IServiceResponse } from 'src/interfaces/serviceResponse.interface';

export default function ViewBusiness() {
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
      enabled: true,
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
          router.push(APP_ROUTES.SEARCH_BUSINESS);
        }
      })();
    }, [])
  );

  if (!business) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <View className="w-full bg-BLUE_100 py-10 items-center">
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

      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={services}
          className="flex-1 w-full p-5"
          renderItem={({ item }) => (
            <ServiceCard
              key={item.id}
              service={{
                id: item.id,
                duration: item.duration,
                imageUrl: item.image_url,
                name: item.name,
                price: item.price,
              }}
            />
          )}
        />
      )}
    </Container>
  );
}
