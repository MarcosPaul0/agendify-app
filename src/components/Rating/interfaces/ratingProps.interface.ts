export interface IRatingProps {
  name: string;
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  numberOfRatings?: number;
  showTotalRatings?: boolean;
}
