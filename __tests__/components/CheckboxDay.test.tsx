import { render } from '@testing-library/react-native';
import { CheckboxDay } from '@components/CheckboxDay';

describe('Checkbox Day', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <CheckboxDay day="fake-day" isChecked onCheck={() => null} />
    );

    expect(tree).toMatchSnapshot();
  });
});
