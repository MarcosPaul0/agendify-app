import { render } from '@testing-library/react-native';
import { DeleteAlert } from '@components/DeleteAlert';

describe('Delete Alert', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <DeleteAlert
        text="fake=text"
        buttonText="fake-text"
        onCancel={() => null}
        onConfirm={() => null}
        title="fake-title"
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
