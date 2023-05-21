import { Container } from '@components/Container';
import { DeleteAlert } from '@components/DeleteAlert';
import { UpdatePasswordForm } from '@components/UpdatePasswordForm';
import { UpdateUserForm } from '@components/UpdateUserForm';
import { ScrollView } from 'react-native';

export default function ManageUser() {
  return (
    <Container>
      <ScrollView className="w-full px-5 pb-4">
        <UpdateUserForm />

        <UpdatePasswordForm />

        <DeleteAlert
          buttonText="Deleter conta"
          onCancel={() => null}
          onConfirm={() => null}
          text="Tem certaza que deseja deletar sua conta? Essa é uma decisão definitiva"
          title="Deletar conta"
        />
      </ScrollView>
    </Container>
  );
}
