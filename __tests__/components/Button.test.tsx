import { render } from '@testing-library/react-native';
import { Button } from '@components/Button';

describe('Button', () => {
  it('Match with snapshot', async () => {
    const tree = render(<Button text="fake-text" title="fake-title" />);

    expect(tree).toMatchSnapshot();
  });
});
