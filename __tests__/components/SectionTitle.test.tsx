import { render } from '@testing-library/react-native';
import { SectionTitle } from '@components/SectionTitle';

describe('Section Title', () => {
  it('Match with snapshot', async () => {
    const tree = render(<SectionTitle title="fake-title" />);

    expect(tree).toMatchSnapshot();
  });
});
