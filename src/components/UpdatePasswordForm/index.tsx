import { Button } from '@components/Button';
import { ControlledInput } from '@components/Input';
import { SectionTitle } from '@components/SectionTitle';
import { HTTP_STATUS } from '@constants/httpStatus.constant';
import { useAuthContext } from '@contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from '@hooks/useNotify';
import { AGENDIFY_API_ROUTES } from '@routes/agendifyApiRoutes.constant';
import { agendifyApiClient } from '@services/agendifyApiClient';
import { errorHandler } from '@utils/errorHandler';
import { IErrorResponse } from '@utils/errorHandler/interfaces/errorResponse.interface';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const updatePasswordValidationSchema = z.object({
  newPassword: z.string(),
  oldPassword: z.string(),
});

type TUpdatePasswordFormData = z.infer<typeof updatePasswordValidationSchema>;

export function UpdatePasswordForm() {
  const { user } = useAuthContext();

  const { successNotify, errorNotify } = useNotify();

  const formMethods = useForm<TUpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordValidationSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  function catchUpdateUserError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Ocorreu algum erro ao atualizar a senha');
        break;
    }
  }

  async function updatePassword(updatePasswordData: TUpdatePasswordFormData) {
    try {
      await agendifyApiClient.patch(
        `${AGENDIFY_API_ROUTES.USER}/${user?.id}`,
        updatePasswordData
      );

      successNotify('Sua senha foi atualizada');
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchUpdateUserError });
    }
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
