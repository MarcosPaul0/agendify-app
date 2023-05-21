import { Button } from '@components/Button';
import { ControlledInput } from '@components/Input';
import { SectionTitle } from '@components/SectionTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const updatePasswordValidationSchema = z.object({
  newPassword: z.string(),
  oldPassword: z.string(),
});

type TUpdatePasswordFormData = z.infer<typeof updatePasswordValidationSchema>;

export function UpdatePasswordForm() {
  const formMethods = useForm<TUpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordValidationSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  async function updatePassword() {
    // TODO adicionar integração com a API
  }

  return (
    <>
      <SectionTitle title="Atualizar senha" margin="my-5" />

      <ControlledInput
        errorMessage={errors.oldPassword?.message}
        label="Senha atual"
        controllerProps={{
          control,
          name: 'oldPassword',
        }}
        inputProps={{
          textContentType: 'password',
        }}
      />

      <ControlledInput
        errorMessage={errors.newPassword?.message}
        label="Nova senha"
        controllerProps={{
          control,
          name: 'newPassword',
        }}
        inputProps={{
          textContentType: 'password',
        }}
      />

      <Button
        title="addBusiness"
        text="Atualizar senha"
        onPress={handleSubmit(updatePassword)}
      />
    </>
  );
}
