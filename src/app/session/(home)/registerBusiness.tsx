import { AddressForm } from '@components/AddressForm';
import { BusinessImagePicker } from '@components/BusinessImagePicker';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledMaskInput } from '@components/ControlledMaskInput';
import { ControlledInput } from '@components/Input';
import { SectionTitle } from '@components/SectionTitle';
import { APP_ROUTES } from '@constants/appRoutes.constant';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from '@hooks/useNotify';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { sanitizeData } from '@utils/sanitizeData';
import { useRouter } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { z } from 'zod';

const registerBusinessValidationSchema = z.object({
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
  telephone: z.string({
    required_error: 'Campo obrigatório',
  }),
  imageUri: z.string().optional(),
});

type TRegisterBusinessFormData = z.infer<
  typeof registerBusinessValidationSchema
>;

export default function RegisterBusiness() {
  const { errorNotify, successNotify } = useNotify();

  const router = useRouter();

  const formMethods = useForm<TRegisterBusinessFormData>({
    resolver: zodResolver(registerBusinessValidationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = formMethods;

  function handleChangeServiceImage(imageUri: string) {
    setValue('imageUri', imageUri);
  }

  function catchRegisterBusinessError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.BAD_REQUEST:
        errorNotify('O negócio já existe');
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Erro ao registrar o negócio');
        break;
    }
  }

  async function registerBusiness(
    registerBusinessData: TRegisterBusinessFormData
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

      const address = {
        postal_code: sanitizeData(registerBusinessData.postalCode),
        number: registerBusinessData.number,
        street: registerBusinessData.street,
        district: registerBusinessData.district,
        city: registerBusinessData.city,
        state: registerBusinessData.state,
      };

      registerBusinessFormData.append('address', JSON.stringify(address));
      registerBusinessFormData.append('name', registerBusinessData.name);
      registerBusinessFormData.append(
        'description',
        registerBusinessData.description
      );
      registerBusinessFormData.append(
        'telephone',
        sanitizeData(registerBusinessData.telephone)
      );
      registerBusinessFormData.append(
        'category_id',
        '8c47084a-524b-413b-a97a-1a14b5440705'
      );

      await agendifyApiClient.post(
        AGENDIFY_API_ROUTES.BUSINESS,
        registerBusinessFormData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      successNotify('Negócio registrado com sucesso');

      router.push(APP_ROUTES.MY_BUSINESS_LIST);
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchRegisterBusinessError });
    }
  }

  const imageUrl = watch('imageUri');

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

          <AddressForm />

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
