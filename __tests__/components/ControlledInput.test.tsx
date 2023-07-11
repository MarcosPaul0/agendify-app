import { render } from '@testing-library/react-native';
import { ControlledInput } from '@components/Input';
import { useForm } from 'react-hook-form';

describe('Controlled Input', () => {
  it('Match with snapshot', async () => {
    function ControlledInputComponent() {
      const { control } = useForm();

      return (
        <ControlledInput controllerProps={{ name: 'fake-name', control }} />
      );
    }

    const tree = render(<ControlledInputComponent />);

    expect(tree).toMatchSnapshot();
  });
});
