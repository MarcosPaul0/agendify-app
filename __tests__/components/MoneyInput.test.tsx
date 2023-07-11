import { render } from '@testing-library/react-native';
import { MoneyInput } from '@components/MoneyInput';

describe('Money Input', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <MoneyInput onChangeText={() => null} label="fake-label" />
    );

    expect(tree).toMatchSnapshot();
  });
});
