export interface RatingFormProps {
  businessId: string;
  updateRating?: () => void | Promise<void>;
}
