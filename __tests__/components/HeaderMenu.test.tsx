import { render } from '@testing-library/react-native';
import { HeaderMenu } from '@components/HeaderMenu';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockImplementation((key: string) => `fake${key}token`),
  removeItem: jest.fn().mockImplementation((key: string) => `fake${key}token`),
  setItem: jest
    .fn()
    .mockImplementation(
      (key: string, value: string) => `fake${key}token${value}`
    ),
}));

describe('Header Menu', () => {
  it('Match with snapshot', async () => {
    const tree = render(<HeaderMenu businessId="fake-business-id" />);

    expect(tree).toMatchSnapshot();
  });
});
