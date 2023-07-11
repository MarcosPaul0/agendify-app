import { render } from '@testing-library/react-native';
import { LinkButton } from '@components/LinkButton';

describe('Link Button', () => {
  it('Match with snapshot', async () => {
    const tree = render(<LinkButton href="fake-route" text="fake=text" />);

    expect(tree).toMatchSnapshot();
  });
});
