import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import MyAvailability from '@app/session/(myBusiness)/myAvailability/[businessId]';
import {
  errorToastParams,
  successToastParams,
} from '../mocks/defaultToastParams.mock';

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

const mockNotify = jest
  .fn()
  .mockImplementation((message: string, toastOptions?: ToastOptions) => ({
    message,
    toastOptions,
  }));

jest.mock('react-native-toast-notifications', () => ({
  useToast: () => ({
    show: mockNotify,
  }),
}));

describe('Business Register', () => {
  it('All fields are correct', async () => {
    const { getByTestId } = render(<MyAvailability />);

    const sundayCheckbox = getByTestId('Domingo');
    const mondayCheckbox = getByTestId('Segunda-feira');
    const tuesdayCheckbox = getByTestId('Terça-feira');
    const wednesdayCheckbox = getByTestId('Quarta-feira');
    const thursdayCheckbox = getByTestId('Quinta-feira');
    const fridayCheckbox = getByTestId('Sexta-feira');
    const saturdayCheckbox = getByTestId('Sábado');
    const beginTimeButton = getByTestId('beginTimePickerButton');
    const endTimeButton = getByTestId('endTimePickerButton');

    expect(sundayCheckbox).toBeDefined();
    expect(mondayCheckbox).toBeDefined();
    expect(tuesdayCheckbox).toBeDefined();
    expect(wednesdayCheckbox).toBeDefined();
    expect(thursdayCheckbox).toBeDefined();
    expect(fridayCheckbox).toBeDefined();
    expect(saturdayCheckbox).toBeDefined();
    expect(beginTimeButton).toBeDefined();
    expect(endTimeButton).toBeDefined();

    const submitButton = getByTestId('Confirmar disponibilidade');

    await act(async () => {
      fireEvent(sundayCheckbox, 'press');
      fireEvent(mondayCheckbox, 'press');
      fireEvent(tuesdayCheckbox, 'press');
      fireEvent(wednesdayCheckbox, 'press');
      fireEvent(thursdayCheckbox, 'press');
      fireEvent(fridayCheckbox, 'press');
      fireEvent(saturdayCheckbox, 'press');

      fireEvent(submitButton, 'press');
    });

    await waitFor(() => {
      expect(mockNotify).toBeCalled();
      expect(mockNotify).toHaveBeenCalledWith(
        'Disponibilidade atualizada com sucesso',
        successToastParams
      );
    });
  });

  it('All week days is unselected', async () => {
    const { getByTestId } = render(<MyAvailability />);

    const sundayCheckbox = getByTestId('Domingo');
    const mondayCheckbox = getByTestId('Segunda-feira');
    const tuesdayCheckbox = getByTestId('Terça-feira');
    const wednesdayCheckbox = getByTestId('Quarta-feira');
    const thursdayCheckbox = getByTestId('Quinta-feira');
    const fridayCheckbox = getByTestId('Sexta-feira');
    const saturdayCheckbox = getByTestId('Sábado');
    const beginTimeButton = getByTestId('beginTimePickerButton');
    const endTimeButton = getByTestId('endTimePickerButton');

    expect(sundayCheckbox).toBeDefined();
    expect(mondayCheckbox).toBeDefined();
    expect(tuesdayCheckbox).toBeDefined();
    expect(wednesdayCheckbox).toBeDefined();
    expect(thursdayCheckbox).toBeDefined();
    expect(fridayCheckbox).toBeDefined();
    expect(saturdayCheckbox).toBeDefined();
    expect(beginTimeButton).toBeDefined();
    expect(endTimeButton).toBeDefined();

    const submitButton = getByTestId('Confirmar disponibilidade');

    await act(async () => {
      fireEvent(mondayCheckbox, 'press');
      fireEvent(tuesdayCheckbox, 'press');
      fireEvent(wednesdayCheckbox, 'press');
      fireEvent(thursdayCheckbox, 'press');
      fireEvent(fridayCheckbox, 'press');

      fireEvent(submitButton, 'press');
    });

    await waitFor(() => {
      expect(mockNotify).toBeCalled();
      expect(mockNotify).toHaveBeenCalledWith(
        'É necessário selecionar pelo menos um dia da semana',
        errorToastParams
      );
    });
  });
});
