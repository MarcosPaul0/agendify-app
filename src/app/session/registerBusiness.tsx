import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledInput } from '@components/Input';
import { ScreenTitle } from '@components/ScreenTitle';
import { SectionTitle } from '@components/SectionTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const registerBusinessValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  postalCode: z.string(),
  city: z.string(),
  state: z.string(),
  street: z.string(),
  number: z.string(),
});

type TRegisterBusinessFormData = z.infer<
  typeof registerBusinessValidationSchema
>;

export function RegisterBusiness() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterBusinessFormData>({
    resolver: zodResolver(registerBusinessValidationSchema),
  });

  async function registerBusiness() {
    // TODO adicionar integração com a API
  }

  return (
    <Container isScrollable>
      <ScreenTitle text="Registrar meu negócio" />

      <SectionTitle title="Informações do negócio" />

      <ControlledInput
        errorMessage={errors.name?.message}
        label="Nome do negócio"
        controllerProps={{
          control,
          name: 'name',
        }}
      />

      <ControlledInput
        errorMessage={errors.description?.message}
        label="Descrição"
        inputProps={{
          placeholder: 'Descrição do negócio',
          numberOfLines: 3,
          multiline: true,
        }}
        controllerProps={{
          control,
          name: 'description',
        }}
      />

      <SectionTitle title="Informações de endereço" />

      <ControlledInput
        errorMessage={errors.postalCode?.message}
        label="CEP"
        controllerProps={{
          control,
          name: 'postalCode',
        }}
      />

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

      <Button
        title="addBusiness"
        text="Adicionar negócio"
        onPress={handleSubmit(registerBusiness)}
      />
    </Container>
  );
}
