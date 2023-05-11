import { AddressForm } from '@components/AddressForm';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ControlledInput } from '@components/Input';
import { SectionTitle } from '@components/SectionTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { ScrollView } from 'react-native';
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
  const formMethods = useForm<TUpdateBusinessFormData>({
    resolver: zodResolver(updateBusinessValidationSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  async function updateBusiness() {
    // TODO adicionar integração com a API
  }

  return (
    <FormProvider {...formMethods}>
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

          <AddressForm />

          <Button
            title="addBusiness"
            text="Atualizar dados do negócio"
            onPress={handleSubmit(updateBusiness)}
          />
        </ScrollView>
      </Container>
    </FormProvider>
  );
}
