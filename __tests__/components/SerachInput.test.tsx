import { render } from '@testing-library/react-native';
import { SearchInput } from '@components/SearchInput';

describe('Search Input', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <SearchInput search="fake-search" changeSearch={() => null} />
    );

    expect(tree).toMatchSnapshot();
  });
});
