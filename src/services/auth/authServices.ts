import axios, { AxiosResponse } from 'axios';
import { HOST } from '@env';

interface LoginPayload {
  email: string;
  password: string;
}

export const postLoginService = (
  payload: LoginPayload,
): Promise<AxiosResponse> =>
  axios.post(`${HOST}:3000/login`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const postLogoutService = (
  userId: number,
  token: string,
): Promise<AxiosResponse> =>
  axios.post(`${HOST}:3000/logout`, userId, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  });

export const postRegisterService = (
  payload: LoginPayload,
): Promise<AxiosResponse> =>
  axios.post(`${HOST}:3000/register`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
