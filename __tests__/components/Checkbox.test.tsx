import { render } from '@testing-library/react-native';
import { Checkbox } from '@components/Checkbox';

describe('Checkbox', () => {
  it('Match with snapshot', async () => {
    const tree = render(<Checkbox isChecked />);

    expect(tree).toMatchSnapshot();
  });
});
