import { Button } from '@components/Button';
import { ControlledInput } from '@components/Input';
import { RatingInput } from '@components/RatingInput';
import { View, Text } from 'react-native';
import { z } from 'zod';
import { useNotify } from '@hooks/useNotify';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { errorHandler } from '@utils/errorHandler';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMyRatingResponse } from 'src/interfaces/myRatingResponse.interface';
import { useEffect, useState } from 'react';
import { RatingFormProps } from './interfaces/ratingFormProps.interface';

const sendBusinessRatingValidationSchema = z.object({
  rating: z
    .number({
      required_error: 'Campo obrigatório',
    })
    .min(1, 'Avaliação mínima é 1')
    .max(5, 'Avaliação mínima é 5'),
  description: z
    .string()
    .optional()
    .refine(
      (description) => !(description && description.length > 255),
      'Número máximo de caracteres é 255'
    ),
});

type TSendBusinessRatingFormData = z.infer<
  typeof sendBusinessRatingValidationSchema
>;

export function RatingForm({ businessId, updateRating }: RatingFormProps) {
  const { errorNotify, successNotify } = useNotify();

  const [ratingId, setRatingId] = useState<string | null>(null);

  const {
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSendBusinessRatingFormData>({
    defaultValues: {
      rating: 0,
    },
    resolver: zodResolver(sendBusinessRatingValidationSchema),
  });

  function catchSendRatingError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao registrar sua avaliação');
        break;
    }
  }

  async function sendRating(
    sendBusinessRatingData: TSendBusinessRatingFormData
  ) {
    try {
      if (ratingId) {
        await agendifyApiClient.patch(
          `${AGENDIFY_API_ROUTES.RATING}/${ratingId}`,
          {
            ...sendBusinessRatingData,
          }
        );
      } else {
        await agendifyApiClient.post(AGENDIFY_API_ROUTES.RATING, {
          ...sendBusinessRatingData,
          business_id: businessId,
        });
      }

      if (updateRating) {
        await updateRating();
      }

      successNotify('Obrigado pelo feedback!');
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchSendRatingError });
    }
  }

  function handleChangeRate(rate: number) {
    setValue('rating', rate);
  }

  const ratingWatched = watch('rating');

  useEffect(() => {
    (async () => {
      try {
        const myRatingResponse = await agendifyApiClient.get<
          IMyRatingResponse[]
        >(`${AGENDIFY_API_ROUTES.MY_RATINGS}`, {
          params: {
            businessId,
          },
        });

        if (myRatingResponse.data.length > 0) {
          const myRatingData = myRatingResponse.data[0];
          setRatingId(myRatingData.id);

          setValue('rating', myRatingData.rating);
          setValue('description', myRatingData.description);
        }
      } catch (error) {
        setRatingId(null);
        setValue('rating', 0);
        setValue('description', '');
      }
    })();
  }, []);

  return (
    <View
      className={`
          flex-1  items-center 
          bg-GRAY_50 py-5
          mx-5 my-2 max-h-72 border-t border-GRAY_300
        `}
    >
      <Text className="text-md text-GRAY_800 font-bold">Sua avaliação</Text>

      <RatingInput onChange={handleChangeRate} value={ratingWatched} />

      <ControlledInput
        controllerProps={{ control, name: 'description' }}
        errorMessage={errors.description?.message}
        inputProps={{
          placeholder: 'Descreva sua experiência',
          numberOfLines: 3,
          textAlignVertical: 'top',
          multiline: true,
        }}
      />

      <Button
        title="sendRate"
        text="Enviar avaliação"
        onPress={handleSubmit(sendRating)}
        isLoading={isSubmitting}
      />
    </View>
  );
}
