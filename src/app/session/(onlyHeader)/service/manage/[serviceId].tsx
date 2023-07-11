import { BusinessImagePicker } from '@components/BusinessImagePicker';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledMaskInput } from '@components/ControlledMaskInput';
import { DeleteAlert } from '@components/DeleteAlert';
import { ControlledInput } from '@components/Input';
import { MoneyInput } from '@components/MoneyInput';
import { SectionTitle } from '@components/SectionTitle';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { BASE_URL } from '@constants/baseUrl.constant';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from '@hooks/useNotify';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { formatPriceToSend } from '@utils/formatPriceToSend';
import { formatPriceValue } from '@utils/formatPriceValue';
import { useRouter, useSearchParams, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { IServiceResponse } from 'src/interfaces/serviceResponse.interface';
import { z } from 'zod';

const updateServiceValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .refine((name) => !(name.length > 50), 'Número máximo de caracteres é 50'),
  description: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .refine(
      (description) => !(description.length > 255),
      'Número máximo de caracteres é 255'
    ),
  duration: z.string({
    required_error: 'Campo obrigatório',
  }),
  price: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .transform((price) => {
      if (price) {
        return String(price.replace(/\./g, '').replace(',', '.'));
      }

      return price;
    }),
});

type TUpdateServiceFormData = z.infer<typeof updateServiceValidationSchema>;

export default function ManageService() {
  const { errorNotify, successNotify } = useNotify();

  const params = useSearchParams();
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState('');

  const formMethods = useForm<TUpdateServiceFormData>({
    resolver: zodResolver(updateServiceValidationSchema),
    defaultValues: {
      price: '',
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = formMethods;

  const serviceId = params.serviceId as string;

  async function handleChangeBusinessImage(imageUri: string) {
    const updateImageFormData = new FormData();

    if (imageUri) {
      const filename = imageUri.split('/').pop() as string;

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      updateImageFormData.append('image', {
        uri: imageUri,
        name: filename,
        type,
      } as unknown as Blob);

      try {
        await agendifyApiClient.post(
          `${AGENDIFY_API_ROUTES.UPDATE_SERVICE_IMAGE}/${serviceId}`,
          updateImageFormData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
        );

        successNotify('Imagem atualizada com sucesso');
        setImageUrl(imageUri);
      } catch {
        setImageUrl('');
      }
    }
  }

  function catchUpdateServiceError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao atualizar o serviço');
        break;
    }
  }

  async function updateService({
    description,
    duration,
    name,
    price,
  }: TUpdateServiceFormData) {
    try {
      const response = await agendifyApiClient.patch<IServiceResponse>(
        `${AGENDIFY_API_ROUTES.SERVICE}/${serviceId}`,
        { description, duration, name, price: Number(formatPriceToSend(price)) }
      );

      const businessId = response.data.business_id;

      successNotify('Serviço atualizado com sucesso');

      router.push(`${APP_ROUTES.VIEW_MY_BUSINESS}/${businessId}`);
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchUpdateServiceError });
    }
  }

  function catchDeleteServiceError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao deletar o serviço');
        break;
    }
  }

  async function deleteService() {
    try {
      const response = await agendifyApiClient.delete<IServiceResponse>(
        `${AGENDIFY_API_ROUTES.SERVICE}/${serviceId}`
      );

      const businessId = response.data.business_id;

      successNotify('Serviço deletado com sucesso');
      router.push(`${APP_ROUTES.MY_BUSINESS_LIST}/${businessId}`);
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchDeleteServiceError });
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await agendifyApiClient.get<IServiceResponse>(
            `${AGENDIFY_API_ROUTES.SERVICE}/${serviceId}`
          );

          const service = response.data;

          setValue('description', service.description);
          setValue('name', service.name);
          setValue('duration', service.duration);
          setImageUrl(`${BASE_URL}/${service.image_url}`);

          if (service.price) {
            const formattedPrice = formatPriceValue(service.price);
            setValue(
              'price',
              service.price % 1 === 0 ? `${formattedPrice}00` : formattedPrice
            );
          }
        } catch {
          router.push(APP_ROUTES.MY_BUSINESS_LIST);
        }
      })();
    }, [])
  );

  const price = watch('price');

  return (
    <FormProvider {...formMethods}>
      <Container>
        <ScrollView className="w-full px-5">
          <SectionTitle title="Informações do serviço" margin="my-5" />

          <BusinessImagePicker
            onChangeImage={handleChangeBusinessImage}
            imageUrl={imageUrl}
          />

          <ControlledInput
            errorMessage={errors.name?.message}
            label="Nome do serviço"
            controllerProps={{
              control,
              name: 'name',
            }}
          />

          <View className="flex-row">
            <MoneyInput
              label="Preço"
              errorMessage={errors.price?.message}
              onChangeText={(value) =>
                setValue('price', formatPriceValue(value))
              }
              keyboardType="numeric"
              containerStyle="flex-1"
              value={price}
            />

            <ControlledMaskInput
              mask="99:99"
              errorMessage={errors.duration?.message}
              label="Tempo (hh:mm)"
              controllerProps={{
                control,
                name: 'duration',
              }}
              inputProps={{
                keyboardType: 'numeric',
              }}
              containerStyle="flex-1 ml-5"
            />
          </View>

          <ControlledInput
            errorMessage={errors.description?.message}
            label="Descrição"
            inputProps={{
              placeholder: 'Descrição do serviço',
              numberOfLines: 3,
              textAlignVertical: 'top',
              multiline: true,
            }}
            controllerProps={{
              control,
              name: 'description',
            }}
          />

          <Button
            title="addBusiness"
            text="Atualizar serviço"
            onPress={handleSubmit(updateService)}
            isLoading={isSubmitting}
          />

          <DeleteAlert
            onConfirm={deleteService}
            onCancel={() => null}
            buttonText="Deletar serviço"
            text="Deletar um serviço é uma ação definitiva, após a confirmação todos os dados do serviço serão perdidos"
            title="Deletar serviço?"
          />
        </ScrollView>
      </Container>
    </FormProvider>
  );
}
