export interface IMyServiceCardProps {
  service: {
    id: string;
    name: string;
    price?: number;
    duration?: string;
    description: string;
    imageUrl: string;
  };
  isLastItem?: boolean;
}
