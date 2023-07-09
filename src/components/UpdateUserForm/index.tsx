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

const updateUserValidationSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório',
  }),
  email: z.string().optional(),
});

type TUpdateUserFormData = z.infer<typeof updateUserValidationSchema>;

export function UpdateUserForm() {
  const { user } = useAuthContext();

  const { successNotify, errorNotify } = useNotify();

  const formMethods = useForm<TUpdateUserFormData>({
    resolver: zodResolver(updateUserValidationSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  function catchUpdateUserError(error: IErrorResponse) {
    switch (error.statusCode) {
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorNotify('Erro interno do servidor');
        break;
      default:
        errorNotify('Ocorreu algum erro ao atualizar os dados!');
        break;
    }
  }

  async function updateUser(updateUserData: TUpdateUserFormData) {
    try {
      await agendifyApiClient.patch(
        `${AGENDIFY_API_ROUTES.USER}/${user?.id}`,
        updateUserData
      );

      successNotify('Seus dados foram atualizados!');
    } catch (error) {
      errorHandler({ error, catchAxiosError: catchUpdateUserError });
    }
  }

  return (
    <>
      <SectionTitle title="Editar perfil" margin="my-5" />

      <ControlledInput
        errorMessage={errors.name?.message}
        label="Nome"
        controllerProps={{
          control,
          name: 'name',
        }}
      />

      <ControlledInput
        errorMessage={errors.name?.message}
        label="Email"
        controllerProps={{
          control,
          name: 'email',
        }}
        inputProps={{
          inputMode: 'email',
          editable: false,
        }}
      />

      <Button
        title="addBusiness"
        text="Atualizar perfil"
        onPress={handleSubmit(updateUser)}
        isLoading={isSubmitting}
      />
    </>
  );
}
