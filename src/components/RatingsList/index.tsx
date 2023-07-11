import { useEffect, useState } from 'react';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { IMyRatingResponse } from 'src/interfaces/myRatingResponse.interface';
import { Text, View } from 'react-native';
import { Rating } from '@components/Rating';
import { IRatingsListProps } from './interfaces/ratingsListProps.interface';

export function RatingsList({ businessId }: IRatingsListProps) {
  const [ratings, setRatings] = useState<IMyRatingResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const myRatingResponse = await agendifyApiClient.get<
          IMyRatingResponse[]
        >(`${AGENDIFY_API_ROUTES.RATINGS_BY_BUSINESS}/${businessId}`, {
          params: {
            businessId,
          },
        });

        setRatings(myRatingResponse.data.slice(0, 3));
      } catch (error) {
        setRatings([]);
      }
    })();
  }, []);

  return (
    <View>
      {ratings.map((rating) => (
        <View key={rating.id} className="border-t border-GRAY_300 mx-5 py-5">
          <Rating rating={rating.rating} name={rating.id} />
          <Text
            className="bg-GRAY_100 p-2 rounded-lg border border-GRAY_500 mt-2 h-20"
            numberOfLines={3}
          >
            {rating.description}
          </Text>
        </View>
      ))}
    </View>
  );
}
