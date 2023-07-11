import { AddressForm } from '@components/AddressForm';
import { BusinessImagePicker } from '@components/BusinessImagePicker';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledMaskInput } from '@components/ControlledMaskInput';
import { DeleteAlert } from '@components/DeleteAlert';
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
  telephone: z.string({
    required_error: 'Campo obrigatório',
  }),
});

const updateAddressValidationSchema = z.object({
  postalCode: z.string({
    required_error: 'Campo obrigatório',
  }),
  city: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .refine(
      (city) => !(city.length > 100),
      'Número máximo de caracteres é 100'
    ),
  state: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .refine((state) => !(state.length > 2), 'Deve ser a sigla do estado'),
  street: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .refine(
      (street) => !(street.length > 100),
      'Número máximo de caracteres é 100'
    ),
  district: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .refine(
      (street) => !(street.length > 50),
      'Número máximo de caracteres é 50'
    ),
  number: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .refine(
      (number) => !(number.length > 10),
      'Número máximo de caracteres é 10'
    ),
});

type TUpdateBusinessFormData = z.infer<typeof updateBusinessValidationSchema>;
type TUpdateAddressFormData = z.infer<typeof updateAddressValidationSchema>;

export default function ManageBusiness() {
  const { errorNotify, successNotify } = useNotify();

  const params = useSearchParams();
  const router = useRouter();
  const businessId = params.businessId as string;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [addressId, setAddressId] = useState('');

  const updateBusinessFormMethods = useForm<TUpdateBusinessFormData>({
    resolver: zodResolver(updateBusinessValidationSchema),
  });

  const updateAddressFormMethods = useForm<TUpdateAddressFormData>({
    resolver: zodResolver(updateAddressValidationSchema),
  });

  const {
    control: updateBusinessControl,
    handleSubmit: updateBusinessHandleSubmit,
    setValue: updateBusinessSetValue,
    formState: {
      errors: updateBusinessErrors,
      isSubmitting: updateBusinessIsSubmitting,
    },
  } = updateBusinessFormMethods;

  const {
    handleSubmit: updateAddressHandleSubmit,
    setValue: updateAddressSetValue,
    formState: { isSubmitting: updateAddressIsSubmitting },
  } = updateAddressFormMethods;

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
      } catch (error) {
        setImageUrl(null);
      }
    }
  }

  function catchUpdateBusinessError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao atualizar o negócio');
        break;
    }
  }

  async function updateBusiness(updateBusinessData: TUpdateBusinessFormData) {
    try {
      await agendifyApiClient.patch(
        `${AGENDIFY_API_ROUTES.BUSINESS}/${businessId}`,
        updateBusinessData
      );

      successNotify('Dados do negócio atualizado com sucesso');
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchUpdateBusinessError });
    }
  }

  function catchUpdateAddressError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao atualizar o endereço');
        break;
    }
  }

  async function updateAddress(updateAddressFormData: TUpdateAddressFormData) {
    try {
      await agendifyApiClient.patch(
        `${AGENDIFY_API_ROUTES.ADDRESS}/${addressId}`,
        updateAddressFormData
      );

      successNotify('Endereço atualizado com sucesso');
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchUpdateAddressError });
    }
  }

  function catchDeleteBusinessError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao deletar o negócio');
        break;
    }
  }

  async function deleteBusiness() {
    try {
      await agendifyApiClient.delete(
        `${AGENDIFY_API_ROUTES.BUSINESS}/${businessId}`
      );

      successNotify('Negócio deletado com sucesso');
      router.push(APP_ROUTES.MY_BUSINESS_LIST);
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchDeleteBusinessError });
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await agendifyApiClient.get<IBusinessResponse>(
            `${AGENDIFY_API_ROUTES.BUSINESS}/${businessId}`
          );

          const business = response.data;
          const { address } = business;

          setAddressId(address.id);
          updateBusinessSetValue('description', business.description);
          updateBusinessSetValue('name', business.name);
          updateBusinessSetValue('telephone', business.telephone);
          updateAddressSetValue('postalCode', address.postal_code);
          updateAddressSetValue('district', address.district);
          updateAddressSetValue('city', address.city);
          updateAddressSetValue('state', address.state);
          updateAddressSetValue('street', address.street);
          updateAddressSetValue('number', address.number);
          setImageUrl(`${BASE_URL}/${business.image_url}`);
        } catch (error) {
          router.push(APP_ROUTES.MY_BUSINESS_LIST);
        }
      })();
    }, [])
  );

  return (
    <Container>
      <ScrollView className="w-full px-5">
        <SectionTitle title="Informações do negócio" margin="my-5" />

        <BusinessImagePicker
          onChangeImage={handleChangeServiceImage}
          imageUrl={imageUrl}
        />

        <ControlledInput
          errorMessage={updateBusinessErrors.name?.message}
          label="Nome do negócio"
          controllerProps={{
            control: updateBusinessControl,
            name: 'name',
          }}
        />

        <ControlledMaskInput
          mask="(99) 99999 9999"
          errorMessage={updateBusinessErrors.telephone?.message}
          label="Telefone"
          controllerProps={{
            control: updateBusinessControl,
            name: 'telephone',
          }}
        />

        <ControlledInput
          errorMessage={updateBusinessErrors.description?.message}
          label="Descrição"
          inputProps={{
            placeholder: 'Descrição do negócio',
            numberOfLines: 3,
            textAlignVertical: 'top',
            multiline: true,
          }}
          controllerProps={{
            control: updateBusinessControl,
            name: 'description',
          }}
        />

        <Button
          title="updateBusiness"
          text="Atualizar dados do negócio"
          onPress={updateBusinessHandleSubmit(updateBusiness)}
          isLoading={updateBusinessIsSubmitting}
        />

        <FormProvider {...updateAddressFormMethods}>
          <AddressForm />

          <Button
            title="updateAddress"
            text="Atualizar endereço"
            onPress={updateAddressHandleSubmit(updateAddress)}
            isLoading={updateAddressIsSubmitting}
          />
        </FormProvider>

        <DeleteAlert
          onConfirm={deleteBusiness}
          onCancel={() => null}
          buttonText="Deletar negócio"
          text="Deletar um negócio é uma ação definitiva, após a confirmação todos os dados relacionado a seu negócio serão perdidos"
          title="Deletar negócio?"
        />
      </ScrollView>
    </Container>
  );
}
