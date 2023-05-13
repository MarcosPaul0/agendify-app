import axios from 'axios';

export const agendifyApiClient = axios.create({
  baseURL: 'http://localhost:3333',
});
