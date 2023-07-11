import { render } from '@testing-library/react-native';
import { RatingInput } from '@components/RatingInput';

describe('Rating Input', () => {
  it('Match with snapshot', async () => {
    const tree = render(<RatingInput onChange={() => null} value={5} />);

    expect(tree).toMatchSnapshot();
  });
});
