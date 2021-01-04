import axios from 'axios';
import { getCookie } from '../utils/utils';
export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFTOKEN': getCookie('X-CSRFTOKEN') || getCookie('csrftoken')
  },
  timeout: 60000
});
