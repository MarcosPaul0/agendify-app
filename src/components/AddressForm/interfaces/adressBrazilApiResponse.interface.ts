export interface IAdressBrazilApiResponse {
  cep: string;
  city: string;
  // location: { coordinates: {}; type: 'Point' };
  neighborhood: string;
  state: string;
  street: string;
}
