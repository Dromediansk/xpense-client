import axios, { AxiosResponse } from 'axios';

export const getCategoriesService = (
  userId: number,
  token: string,
): Promise<AxiosResponse> =>
  axios.get(`http://localhost:3000/categories/${userId}`, {
    headers: {
      authorization: token,
    },
  });
