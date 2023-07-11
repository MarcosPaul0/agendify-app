import { render } from '@testing-library/react-native';
import { Container } from '@components/Container';
import { Text } from 'react-native';

describe('Container', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <Container>
        <Text>Fake Children</Text>
      </Container>
    );

    expect(tree).toMatchSnapshot();
  });
});
