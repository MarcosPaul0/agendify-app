import { BusinessImagePicker } from '@components/BusinessImagePicker';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledMaskInput } from '@components/ControlledMaskInput';
import { ControlledInput } from '@components/Input';
import { MoneyInput } from '@components/MoneyInput';
import { SectionTitle } from '@components/SectionTitle';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from '@hooks/useNotify';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { formatPriceValue } from '@utils/formatPriceValue';
import { useRouter, useSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { z } from 'zod';

const registerServiceValidationSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório',
  }),
  description: z.string({
    required_error: 'Campo obrigatório',
  }),
  duration: z.string({
    required_error: 'Campo obrigatório',
  }),
  price: z
    .string()
    .optional()
    .transform((price) => {
      if (price) {
        return price.replace(/[R$ ]/g, '').replace(/\./g, '').replace(',', '.');
      }

      return price;
    }),
  imageUri: z.string().optional(),
});

type TRegisterServiceFormData = z.infer<typeof registerServiceValidationSchema>;

export default function RegisterService() {
  const { errorNotify, successNotify } = useNotify();

  const params = useSearchParams();
  const router = useRouter();

  const formMethods = useForm<TRegisterServiceFormData>({
    resolver: zodResolver(registerServiceValidationSchema),
    defaultValues: {
      duration: '00:00',
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = formMethods;

  function handleChangeBusinessImage(imageUri: string) {
    setValue('imageUri', imageUri);
  }

  const businessId = params.businessId as string;

  function catchRegisterServiceError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.BAD_REQUEST:
        errorNotify('O serviço já existe');
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao registrar novo serviço');
        break;
    }
  }

  async function registerBusiness(
    registerBusinessData: TRegisterServiceFormData
  ) {
    try {
      const registerBusinessFormData = new FormData();

      const { imageUri } = registerBusinessData;

      if (imageUri) {
        const filename = imageUri.split('/').pop() as string;

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        registerBusinessFormData.append('image', {
          uri: imageUri,
          name: filename,
          type,
        } as unknown as Blob);
      }

      if (registerBusinessData.price) {
        registerBusinessFormData.append('price', registerBusinessData.price);
      }

      registerBusinessFormData.append('name', registerBusinessData.name);
      registerBusinessFormData.append(
        'description',
        registerBusinessData.description
      );
      registerBusinessFormData.append(
        'duration',
        registerBusinessData.duration
      );
      registerBusinessFormData.append('business_id', businessId);

      await agendifyApiClient.post(
        AGENDIFY_API_ROUTES.SERVICE,
        registerBusinessFormData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      successNotify('Negócio registrado com sucesso');

      router.push(`${APP_ROUTES.MY_BUSINESS_LIST}/${businessId}`);
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchRegisterServiceError });
    }
  }

  const imageUrl = watch('imageUri');
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
            text="Adicionar serviço"
            onPress={handleSubmit(registerBusiness)}
            isLoading={isSubmitting}
          />
        </ScrollView>
      </Container>
    </FormProvider>
  );
}
