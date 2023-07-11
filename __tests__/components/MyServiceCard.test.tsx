import { render } from '@testing-library/react-native';
import { MyServiceCard } from '@components/MyServiceCard';
import { service } from '../../mocks/service.mock';

jest.mock('expo-router', () => {
  const currentRouter = jest.requireActual('expo-router');

  return {
    ...currentRouter,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn().mockImplementation((path: string) => path),
    }),
  };
});

describe('My Service Card', () => {
  it('Match with snapshot', async () => {
    const tree = render(<MyServiceCard service={service} isLastItem />);

    expect(tree).toMatchSnapshot();
  });
});
