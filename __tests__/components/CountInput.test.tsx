import { render } from '@testing-library/react-native';
import { CountInput } from '@components/CountInput';

describe('Count Input', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <CountInput count={2} increment={() => null} decrement={() => null} />
    );

    expect(tree).toMatchSnapshot();
  });
});
