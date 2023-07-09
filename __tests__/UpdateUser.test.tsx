import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ManageUser from '@app/session/(onlyHeader)/manageUser/[userId]';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { defaultToastParams } from '../mocks/defaultToastParams.mock';

jest.mock('expo-router', () => {
  const currentRouter = jest.requireActual('expo-router');

  return {
    ...currentRouter,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn().mockImplementation((path: string) => path),
    }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockImplementation((key: string) => `fake${key}token`),
  removeItem: jest.fn().mockImplementation((key: string) => `fake${key}token`),
  setItem: jest
    .fn()
    .mockImplementation(
      (key: string, value: string) => `fake${key}token${value}`
    ),
}));

jest.mock('axios', () => ({
  create: jest.fn().mockImplementation(() => ({
    patch: () => null,
  })),
}));

const mockSuccessNotify = jest
  .fn()
  .mockImplementation((message: string, toastOptions?: ToastOptions) => ({
    message,
    toastOptions,
  }));

jest.mock('react-native-toast-notifications', () => ({
  useToast: () => ({
    show: mockSuccessNotify,
  }),
}));

describe('User Update', () => {
  describe('Update profile', () => {
    it('All fields are correct', async () => {
      const { getByTestId } = render(<ManageUser />);

      const nameInput = getByTestId('name');
      const emailInput = getByTestId('email');

      expect(nameInput).toBeDefined();
      expect(emailInput).toBeDefined();

      const updateButton = getByTestId('Atualizar perfil');

      await act(async () => {
        fireEvent.changeText(nameInput, 'Marcos');
        fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
        fireEvent(updateButton, 'press');
      });

      await waitFor(() => {
        expect(mockSuccessNotify).toBeCalled();
        expect(mockSuccessNotify).toHaveBeenCalledWith(
          'Seus dados foram atualizados!',
          defaultToastParams
        );
      });
    });
  });

  describe('Update password', () => {
    it('All fields are correct', async () => {
      const { getByTestId } = render(<ManageUser />);

      const oldPasswordInput = getByTestId('oldPassword');
      const newPasswordInput = getByTestId('newPassword');

      expect(oldPasswordInput).toBeDefined();
      expect(newPasswordInput).toBeDefined();

      const updateButton = getByTestId('Atualizar senha');

      await act(async () => {
        fireEvent.changeText(oldPasswordInput, 'fakeOldPassword');
        fireEvent.changeText(newPasswordInput, 'fakeOldPassword');
        fireEvent(updateButton, 'press');
      });

      await waitFor(() => {
        expect(mockSuccessNotify).toBeCalled();
        expect(mockSuccessNotify).toHaveBeenCalledWith(
          'Sua senha foi atualizada',
          defaultToastParams
        );
      });
    });
  });
});
