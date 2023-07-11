import { render } from '@testing-library/react-native';
import { Rating } from '@components/Rating';

describe('Rating', () => {
  it('Match with snapshot', async () => {
    const tree = render(<Rating name="fake-name" rating={5} />);

    expect(tree).toMatchSnapshot();
  });
});
