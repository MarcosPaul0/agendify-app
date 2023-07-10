import { IAddressResponse } from './addressResponse.interface';
import { IRatingResponse } from './ratingResponse.interface';

export interface IBusinessResponse {
  id: string;
  name: string;
  is_operating: boolean;
  description: string;
  image_url: string;
  telephone: string;
  address_id: string | null;
  owner_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  rating: IRatingResponse;
  address: IAddressResponse;
}
