import { BusinessImagePicker } from '@components/BusinessImagePicker';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledMaskInput } from '@components/ControlledMaskInput';
import { ControlledInput } from '@components/Input';
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
import { useFocusEffect, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { IBusinessResponse } from 'src/interfaces/businessResponse.interface';
import { z } from 'zod';

const updateBusinessValidationSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório',
  }),
  description: z.string({
    required_error: 'Campo obrigatório',
  }),
  telephone: z.string({
    required_error: 'Campo obrigatório',
  }),
});

type TUpdateBusinessFormData = z.infer<typeof updateBusinessValidationSchema>;

export default function ManageBusiness() {
  const { errorNotify, successNotify } = useNotify();

  const params = useSearchParams();

  const router = useRouter();
  const businessId = params.businessId as string;

  const [imageUrl, setImageUrl] = useState('');

  const formMethods = useForm<TUpdateBusinessFormData>({
    resolver: zodResolver(updateBusinessValidationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function handleChangeServiceImage(imageUri: string) {
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
          `${AGENDIFY_API_ROUTES.UPDATE_BUSINESS_IMAGE}/${businessId}`,
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

  function catchRegisterBusinessError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao atualizar o negócio');
        break;
    }
  }

  async function registerBusiness(updateBusinessData: TUpdateBusinessFormData) {
    try {
      await agendifyApiClient.patch(
        `${AGENDIFY_API_ROUTES.BUSINESS}/${businessId}`,
        updateBusinessData
      );

      successNotify('Dados do negócio atualizado com sucesso');

      router.push(`${APP_ROUTES.MY_BUSINESS_LIST}/${businessId}`);
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchRegisterBusinessError });
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await agendifyApiClient.get<IBusinessResponse>(
            `${AGENDIFY_API_ROUTES.SERVICE}/${businessId}`
          );

          const business = response.data;

          setValue('description', business.description);
          setValue('name', business.name);
          setValue('telephone', business.telephone);
          setImageUrl(`${BASE_URL}/${business.image_url}`);
        } catch {
          router.push(APP_ROUTES.MY_BUSINESS_LIST);
        }
      })();
    }, [])
  );

  return (
    <FormProvider {...formMethods}>
      <Container>
        <ScrollView className="w-full px-5">
          <SectionTitle title="Informações do negócio" margin="my-5" />

          <BusinessImagePicker
            onChangeImage={handleChangeServiceImage}
            imageUrl={imageUrl}
          />

          <ControlledInput
            errorMessage={errors.name?.message}
            label="Nome do negócio"
            controllerProps={{
              control,
              name: 'name',
            }}
          />

          <ControlledMaskInput
            mask="(99) 99999 9999"
            errorMessage={errors.telephone?.message}
            label="Telefone"
            controllerProps={{
              control,
              name: 'telephone',
            }}
          />

          <ControlledInput
            errorMessage={errors.description?.message}
            label="Descrição"
            inputProps={{
              placeholder: 'Descrição do negócio',
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
            text="Adicionar negócio"
            onPress={handleSubmit(registerBusiness)}
            isLoading={isSubmitting}
          />
        </ScrollView>
      </Container>
    </FormProvider>
  );
}
