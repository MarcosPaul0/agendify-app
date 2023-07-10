import { BusinessCard } from '@components/BusinessCard';
import { Container } from '@components/Container';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { IBusinessResponse } from 'src/interfaces/businessResponse.interface';
import { useFocusEffect } from 'expo-router';
import { Spinner } from '@components/Spinner';
import { useCallback } from 'react';

export default function MyBusiness() {
  const {
    data: business,
    isLoading,
    refetch,
  } = useQuery<IBusinessResponse[]>(
    'myBusiness',
    async () => {
      try {
        const response = await agendifyApiClient.get<IBusinessResponse[]>(
          AGENDIFY_API_ROUTES.MY_BUSINESS
        );

        return response.data;
      } catch (error) {
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
    }, [])
  );

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={business}
        renderItem={({ item }) => (
          <BusinessCard
            key={item.id}
            redirectTo={`${APP_ROUTES.VIEW_MY_BUSINESS}/${item.id}`}
            imageUrl={item.image_url}
            description={item.description}
            title={item.name}
            rating={item.rating.averageRating}
            totalRatings={item.rating.totalRatings}
          />
        )}
        className="flex-1 w-full px-5 pb-5 mt-5"
      />
    </Container>
  );
}
