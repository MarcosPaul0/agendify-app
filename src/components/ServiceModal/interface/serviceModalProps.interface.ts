import { IServiceResponse } from 'src/interfaces/serviceResponse.interface';

export interface IServiceModalProps {
  businessId: string;
  service: IServiceResponse;
  isOpen: boolean;
  count?: number;
  closeModal: () => void;
}
