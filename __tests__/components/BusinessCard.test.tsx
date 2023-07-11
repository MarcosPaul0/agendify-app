import { render } from '@testing-library/react-native';
import { BusinessCard } from '@components/BusinessCard';

jest.mock('expo-router', () => {
  const currentRouter = jest.requireActual('expo-router');

  return {
    ...currentRouter,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn().mockImplementation((path: string) => path),
    }),
  };
});

describe('Business Card', () => {
  it('Match with snapshot', async () => {
    const tree = render(
      <BusinessCard
        description="fake-description"
        imageUrl="fake-image-url"
        rating={5}
        redirectTo="fake-redirection"
        title="fake-title"
        totalRatings={5}
        isFavorite
        favoriteIsActive
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
