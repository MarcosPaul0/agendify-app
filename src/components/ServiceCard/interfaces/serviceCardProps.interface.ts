export interface IServiceCardProps {
  service: {
    id: string;
    name: string;
    price?: number;
    description: string;
    duration?: string;
    imageUrl: string;
  };
  isLastItem?: boolean;
  count?: number;
  showNumber?: boolean;
  onPress?: () => void;
}
