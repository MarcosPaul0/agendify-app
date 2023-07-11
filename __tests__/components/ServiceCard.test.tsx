import { render } from '@testing-library/react-native';
import { ServiceCard } from '@components/ServiceCard';
import { service } from '../../mocks/service.mock';

describe('Service Card', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <ServiceCard service={service} count={2} isLastItem showNumber />
    );

    expect(tree).toMatchSnapshot();
  });
});
