export interface IServiceCardProps {
  service: {
    id: string;
    name: string;
    price?: number;
    duration?: string;
    imageUrl: string;
  };
  isLastItem?: boolean;
}
