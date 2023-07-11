import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import RegisterService from '@app/session/(onlyHeader)/service/register/[businessId]';
import { successToastParams } from '../mocks/defaultToastParams.mock';

jest.mock('expo-router', () => {
  const currentRouter = jest.requireActual('expo-router');

  return {
    ...currentRouter,
    useFocusEffect: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue({
      businessId: 'fakeBusinessId',
    }),
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn().mockImplementation((path: string) => path),
    }),
  };
});

jest.mock('axios', () => ({
  isAxiosError: jest.fn().mockReturnValue(true),
  create: jest.fn().mockImplementation(() => ({
    post: () => null,
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

describe('Register Service', () => {
  it('All fields are correct', async () => {
    const { getByTestId } = render(<RegisterService />);

    const nameInput = getByTestId('name');
    const priceInput = getByTestId('price');
    const durationInput = getByTestId('duration');
    const descriptionInput = getByTestId('description');

    expect(nameInput).toBeDefined();
    expect(priceInput).toBeDefined();
    expect(durationInput).toBeDefined();
    expect(descriptionInput).toBeDefined();

    const registerButton = getByTestId('Adicionar serviço');

    await act(async () => {
      fireEvent.changeText(nameInput, 'fake name');
      fireEvent.changeText(priceInput, 'R$ 20,00');
      fireEvent.changeText(durationInput, '30:00');
      fireEvent.changeText(descriptionInput, 'fake description');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      expect(mockSuccessNotify).toBeCalled();
      expect(mockSuccessNotify).toHaveBeenCalledWith(
        'Serviço registrado com sucesso',
        successToastParams
      );
    });
  });

  it('All fields are empty', async () => {
    const { getByTestId, getAllByText } = render(<RegisterService />);

    const nameInput = getByTestId('name');
    const priceInput = getByTestId('price');
    const durationInput = getByTestId('duration');
    const descriptionInput = getByTestId('description');

    expect(nameInput).toBeDefined();
    expect(priceInput).toBeDefined();
    expect(durationInput).toBeDefined();
    expect(descriptionInput).toBeDefined();

    const registerButton = getByTestId('Adicionar serviço');

    await act(async () => {
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Campo obrigatório');

      expect(requiredText).toHaveLength(2);
    });
  });
});
