import axios from 'axios';

export const brazilApiClient = axios.create({
  baseURL: 'https://brasilapi.com.br/api',
});
