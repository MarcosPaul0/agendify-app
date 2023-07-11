import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import RegisterUser from '@app/registerUser';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { successToastParams } from '../mocks/defaultToastParams.mock';

jest.mock('expo-router', () => {
  const currentRouter = jest.requireActual('expo-router');

  return {
    ...currentRouter,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn().mockImplementation((path: string) => path),
    }),
  };
});

jest.mock('axios', () => ({
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

describe('Register User', () => {
  it('All fields are correct', async () => {
    const { getByTestId } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      expect(mockSuccessNotify).toBeCalled();
      expect(mockSuccessNotify).toHaveBeenCalledWith(
        'Usuário registrado com sucesso',
        successToastParams
      );
    });
  });

  it('All fields are incorrect', async () => {
    const { getByTestId, getByText, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(emailInput, 'marcosphip7gmail.com');
      fireEvent.changeText(passwordInput, 'marcos234233');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Campo obrigatório');
      const emailText = getByText('Email inválido');
      const passwordText = getByText(
        'A senha precisa ter pelo menos: um caractere especial, uma letra maiúscula, uma letra minúscula e um número'
      );

      expect(requiredText).toHaveLength(2);
      expect(emailText).toBeDefined();
      expect(passwordText).toBeDefined();
    });
  });

  it('All fields are empty', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Campo obrigatório');

      expect(requiredText).toHaveLength(4);
    });
  });

  it('Name is invalid: field is empty', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Campo obrigatório');

      expect(requiredText).toHaveLength(1);
    });
  });

  it('Email is invalid: without @', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Email inválido');

      expect(requiredText).toBeDefined();
    });
  });

  it('Email is invalid: without .com, .net, etc.', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Email inválido');

      expect(requiredText).toBeDefined();
    });
  });

  it('Email is invalid: unusual special characters', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos1234');
      fireEvent.changeText(confirmPasswordInput, 'Marcos1234');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText(
        'A senha precisa ter pelo menos: um caractere especial, uma letra maiúscula, uma letra minúscula e um número'
      );

      expect(requiredText).toBeDefined();
    });
  });

  it('Email is invalid: max length', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(
        emailInput,
        'Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos@gmail.com'
      );
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Número máximo de caracteres é 255');

      expect(requiredText).toBeDefined();
    });
  });

  it('Email is invalid: with space', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosp hip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Email inválido');

      expect(requiredText).toBeDefined();
    });
  });

  it('Email is invalid: field is empty', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Campo obrigatório');

      expect(requiredText).toHaveLength(1);
    });
  });

  it('Password is invalid: without lowercase letter', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(passwordInput, 'MARCOS_123');
      fireEvent.changeText(confirmPasswordInput, 'MARCOS_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText(
        'A senha precisa ter pelo menos: um caractere especial, uma letra maiúscula, uma letra minúscula e um número'
      );

      expect(requiredText).toBeDefined();
    });
  });

  it('Password is invalid: without uppercase letter', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosp hip7@gmail.com');
      fireEvent.changeText(passwordInput, 'marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText(
        'A senha precisa ter pelo menos: um caractere especial, uma letra maiúscula, uma letra minúscula e um número'
      );

      expect(requiredText).toBeDefined();
    });
  });

  it('Password is invalid: without special character', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosp hip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcosp123');
      fireEvent.changeText(confirmPasswordInput, 'Marcosp123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText(
        'A senha precisa ter pelo menos: um caractere especial, uma letra maiúscula, uma letra minúscula e um número'
      );

      expect(requiredText).toBeDefined();
    });
  });

  it('Password is invalid: less than 10 characters', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosp hip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos_12');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_13');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText(
        'A senha deve ter no mínimo 10 caracteres'
      );

      expect(requiredText).toBeDefined();
    });
  });

  it('Password is invalid: field with space', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos 123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('A senha não pode ter espaço');

      expect(requiredText).toBeDefined();
    });
  });

  it('Password is invalid: max length', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(
        passwordInput,
        'Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos_123Marcos123Marcos1'
      );
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Número máximo de caracteres é 255');

      expect(requiredText).toBeDefined();
    });
  });

  it('Password is invalid: field is empty', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Campo obrigatório');

      expect(requiredText).toHaveLength(1);
    });
  });

  it('Confirmation password is invalid: is not equal to password', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent.changeText(confirmPasswordInput, 'Marcos_1234');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const confirmPasswordText = getAllByText('As senhas não conferem');

      expect(confirmPasswordText).toBeDefined();
    });
  });

  it('Confirmation password is invalid: field is empty', async () => {
    const { getByTestId, getAllByText } = render(<RegisterUser />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();

    const registerButton = getByTestId('Registrar');

    await act(async () => {
      fireEvent.changeText(nameInput, 'Marcos');
      fireEvent.changeText(emailInput, 'marcosphip7@gmail.com');
      fireEvent.changeText(passwordInput, 'Marcos_123');
      fireEvent(registerButton, 'press');
    });

    await waitFor(() => {
      const requiredText = getAllByText('Campo obrigatório');

      expect(requiredText).toHaveLength(1);
    });
  });
});
