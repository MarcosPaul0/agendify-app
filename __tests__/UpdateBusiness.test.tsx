import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import ManageBusiness from '@app/session/(onlyHeader)/manageMyBusiness/[businessId]';
import { defaultToastParams } from '../mocks/defaultToastParams.mock';

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

describe('Business Update', () => {
  describe('Business Profile', () => {
    it('All fields are correct', async () => {
      const { getByTestId } = render(<ManageBusiness />);

      const nameInput = getByTestId('name');
      const telephoneInput = getByTestId('telephone');
      const descriptionInput = getByTestId('description');

      expect(nameInput).toBeDefined();
      expect(telephoneInput).toBeDefined();
      expect(descriptionInput).toBeDefined();

      const registerButton = getByTestId('Atualizar dados do negócio');

      await act(async () => {
        fireEvent.changeText(nameInput, 'fake business');
        fireEvent.changeText(telephoneInput, '(35) 999999999');
        fireEvent.changeText(descriptionInput, 'fake description');
        fireEvent(registerButton, 'press');
      });

      await waitFor(() => {
        expect(mockSuccessNotify).toBeCalled();
        expect(mockSuccessNotify).toHaveBeenCalledWith(
          'Dados do negócio atualizado com sucesso',
          defaultToastParams
        );
      });
    });

    it('All fields are empty', async () => {
      const { getByTestId, getAllByText } = render(<ManageBusiness />);

      const nameInput = getByTestId('name');
      const telephoneInput = getByTestId('telephone');
      const descriptionInput = getByTestId('description');

      expect(nameInput).toBeDefined();
      expect(telephoneInput).toBeDefined();
      expect(descriptionInput).toBeDefined();

      const registerButton = getByTestId('Atualizar dados do negócio');

      await act(async () => {
        fireEvent(registerButton, 'press');
      });

      await waitFor(() => {
        const requiredText = getAllByText('Campo obrigatório');

        expect(requiredText).toHaveLength(2);
      });
    });
  });

  describe('Business Address', () => {
    it('All fields are correct', async () => {
      const { getByTestId } = render(<ManageBusiness />);

      const postalCodeInput = getByTestId('postalCode');
      const districtInput = getByTestId('district');
      const cityInput = getByTestId('city');
      const stateInput = getByTestId('state');
      const streetInput = getByTestId('street');
      const numberInput = getByTestId('number');

      expect(postalCodeInput).toBeDefined();
      expect(districtInput).toBeDefined();
      expect(cityInput).toBeDefined();
      expect(stateInput).toBeDefined();
      expect(streetInput).toBeDefined();
      expect(numberInput).toBeDefined();

      const registerButton = getByTestId('Atualizar endereço');

      await act(async () => {
        fireEvent.changeText(postalCodeInput, '00000-000');
        fireEvent.changeText(districtInput, 'fake district');
        fireEvent.changeText(cityInput, 'fake city');
        fireEvent.changeText(stateInput, 'fake state');
        fireEvent.changeText(streetInput, 'fake street');
        fireEvent.changeText(numberInput, '999');
        fireEvent(registerButton, 'press');
      });

      await waitFor(() => {
        expect(mockSuccessNotify).toBeCalled();
        expect(mockSuccessNotify).toHaveBeenCalledWith(
          'Dados do negócio atualizado com sucesso',
          defaultToastParams
        );
      });
    });

    it('All fields are empty', async () => {
      const { getByTestId, getAllByText } = render(<ManageBusiness />);

      const postalCodeInput = getByTestId('postalCode');
      const districtInput = getByTestId('district');
      const cityInput = getByTestId('city');
      const stateInput = getByTestId('state');
      const streetInput = getByTestId('street');
      const numberInput = getByTestId('number');

      expect(postalCodeInput).toBeDefined();
      expect(districtInput).toBeDefined();
      expect(cityInput).toBeDefined();
      expect(stateInput).toBeDefined();
      expect(streetInput).toBeDefined();
      expect(numberInput).toBeDefined();

      const registerButton = getByTestId('Atualizar endereço');

      await act(async () => {
        fireEvent(registerButton, 'press');
      });

      await waitFor(() => {
        const requiredText = getAllByText('Campo obrigatório');

        expect(requiredText).toHaveLength(5);
      });
    });
  });
});
