import { BusinessCard } from '@components/BusinessCard';
import { Container } from '@components/Container';
import { SearchInput } from '@components/SearchInput';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { IBusinessResponse } from 'src/interfaces/businessResponse.interface';
import { useQuery } from 'react-query';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { BASE_URL } from '@constants/baseUrl.constant';
import { useFocusEffect } from 'expo-router';
import { Spinner } from '@components/Spinner';

export default function SearchBusiness() {
  const [search, setSearch] = useState('');

  function changeSearch(text: string) {
    setSearch(text);
  }

  const {
    data: business,
    refetch,
    isLoading,
  } = useQuery<IBusinessResponse[]>(
    ['allBusiness', search],
    async () => {
      try {
        const searchFilter = search && {
          business_name: search,
        };

        const response = await agendifyApiClient.get<IBusinessResponse[]>(
          AGENDIFY_API_ROUTES.BUSINESS,
          {
            params: searchFilter,
          }
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

  return (
    <Container>
      <SearchInput
        search={search}
        changeSearch={changeSearch}
        placeholder="Buscar serviço"
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={business}
          renderItem={({ item }) => (
            <BusinessCard
              key={item.id}
              redirectTo={`${APP_ROUTES.VIEW_BUSINESS}/${item.id}`}
              imageUrl={`${BASE_URL}/${item.image_url}`}
              description={item.description}
              title={item.name}
            />
          )}
          className="w-full px-5 pb-2"
        />
      )}
    </Container>
  );
}
