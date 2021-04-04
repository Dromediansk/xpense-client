import axios, { AxiosResponse } from 'axios';

export const getCategoriesService = (
  userId: number,
  token: string,
): Promise<AxiosResponse> =>
  axios.get(`http://192.168.1.21:3000/categories/${userId}`, {
    headers: {
      authorization: token,
    },
  });
