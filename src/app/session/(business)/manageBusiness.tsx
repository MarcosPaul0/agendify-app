import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledInput } from '@components/Input';
import { SectionTitle } from '@components/SectionTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { z } from 'zod';

const updateBusinessValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  postalCode: z.string(),
  city: z.string(),
  state: z.string(),
  street: z.string(),
  number: z.string(),
});

type TUpdateBusinessFormData = z.infer<typeof updateBusinessValidationSchema>;

export default function ManageBusiness() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateBusinessFormData>({
    resolver: zodResolver(updateBusinessValidationSchema),
  });

  async function updateBusiness() {
    // TODO adicionar integração com a API
  }

  return (
    <Container>
      <ScrollView className="w-full px-5">
        <SectionTitle title="Informações do negócio" margin="my-5" />

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
            textAlignVertical: 'top',
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
          text="Atualizar dados do negócio"
          onPress={handleSubmit(updateBusiness)}
        />
      </ScrollView>
    </Container>
  );
}
