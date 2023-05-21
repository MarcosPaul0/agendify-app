import { BASE_URL } from '@constants/baseUrl.constant';
import axios from 'axios';

export const agendifyApiClient = axios.create({
  baseURL: BASE_URL,
});
