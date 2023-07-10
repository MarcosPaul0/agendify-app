export interface IBusinessCardProps {
  imageUrl: string;
  title: string;
  description: string;
  favoriteIsActive?: boolean;
  isFavorite?: boolean;
  redirectTo: string;
  rating: number;
  totalRatings: number;
}
