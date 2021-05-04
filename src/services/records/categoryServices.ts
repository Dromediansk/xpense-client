import { HOST } from '@env';
import axios, { AxiosResponse } from 'axios';

export const getCategoriesService = (
  userId: number,
  token: string,
): Promise<AxiosResponse> =>
  axios.get(`${HOST}:3000/categories/${userId}`, {
    headers: {
      authorization: token,
    },
  });
