import { render } from '@testing-library/react-native';
import { Calendar } from '@components/Calendar';

describe('Calendar', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <Calendar activeDay={new Date()} onChangeDay={() => null} />
    );

    expect(tree).toMatchSnapshot();
  });
});
