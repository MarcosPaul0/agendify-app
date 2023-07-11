import { render } from '@testing-library/react-native';
import { ControlledMaskInput } from '@components/ControlledMaskInput';
import { useForm } from 'react-hook-form';

describe('Controlled Mask Input', () => {
  it('Match with snapshot', async () => {
    function ControlledMaskInputComponent() {
      const { control } = useForm();

      return (
        <ControlledMaskInput
          controllerProps={{ name: 'fake-name', control }}
          mask="99"
        />
      );
    }

    const tree = render(<ControlledMaskInputComponent />);

    expect(tree).toMatchSnapshot();
  });
});
