import { ControlledInput } from '@components/Input';
import { SectionTitle } from '@components/SectionTitle';
import { View } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { brazilApiClient } from '@services/brazilApiClient';
import { BRAZIL_API_ROUTES } from '@routes/brazilApiRoutes.constant';
import { isAxiosError } from 'axios';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { ControlledMaskInput } from '@components/ControlledMaskInput';
import { IAddressFormData } from './interfaces/addressFormData.interface';
import { IAdressBrazilApiResponse } from './interfaces/adressBrazilApiResponse.interface';

export function AddressForm() {
  const {
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<IAddressFormData>();

  const postalCode = watch('postalCode');

  useEffect(() => {
    (async () => {
      const sanitizedPostalCode = postalCode
        ? postalCode.replace(/[-]/g, '')
        : '';

      if (sanitizedPostalCode.length === 8) {
        try {
          const response = await brazilApiClient.get<IAdressBrazilApiResponse>(
            `${BRAZIL_API_ROUTES.POSTAL_CODE}/${sanitizedPostalCode}`
          );

          const address = response.data;

          if (address.city) {
            setValue('city', address.city);
          }
          if (address.state) {
            setValue('state', address.state);
          }
          if (address.street) {
            setValue('street', address.street);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            if (error.status === HTTP_STATUS.NOT_FOUND) {
              setError('postalCode', {
                message: 'CEP inválido',
              });
            }
          }

          clearErrors('postalCode');
        }
      }
    })();
  }, [postalCode]);

  return (
    <>
      <SectionTitle title="Informações de endereço" />

      <View className="flex-row">
        <ControlledMaskInput
          errorMessage={errors.postalCode?.message}
          label="CEP"
          controllerProps={{
            control,
            name: 'postalCode',
          }}
          mask="99999-999"
          containerStyle="flex-1"
        />

        <ControlledInput
          errorMessage={errors.district?.message}
          label="Bairro"
          controllerProps={{
            control,
            name: 'district',
          }}
          containerStyle="flex-1 ml-4"
        />
      </View>

      <View className="flex-row">
        <ControlledInput
          errorMessage={errors.city?.message}
          label="Cidade"
          controllerProps={{
            control,
            name: 'city',
          }}
          containerStyle="flex-1"
        />

        <ControlledInput
          errorMessage={errors.state?.message}
          label="Estado"
          controllerProps={{
            control,
            name: 'state',
          }}
          containerStyle="w-1/4 ml-4"
        />
      </View>

      <View className="flex-row">
        <ControlledInput
          errorMessage={errors.street?.message}
          label="Logradouro"
          inputProps={{
            placeholder: 'Rua, Avenida, Travessa...',
          }}
          controllerProps={{
            control,
            name: 'street',
          }}
          containerStyle="flex-1"
        />

        <ControlledInput
          errorMessage={errors.number?.message}
          label="Número"
          controllerProps={{
            control,
            name: 'number',
          }}
          containerStyle="w-1/4 ml-4"
        />
      </View>
    </>
  );
}
