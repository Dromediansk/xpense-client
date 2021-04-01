import axios, { AxiosResponse } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const postLoginService = async (
  payload: LoginPayload
): Promise<AxiosResponse> =>
  await axios.post("http://192.168.1.21:3000/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const postLogoutService = (
  userId: number,
  token: string
): Promise<AxiosResponse> => {
  return axios.post("http://192.168.1.21:3000/logout", userId, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
};

export const postRegisterService = async (
  payload: LoginPayload
): Promise<AxiosResponse> =>
  await axios.post("http://192.168.1.21:3000/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
