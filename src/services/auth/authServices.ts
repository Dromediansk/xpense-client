import axios, { AxiosResponse } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const postLoginService = async (payload: LoginPayload) =>
  await axios.post("http://192.168.1.21:3000/login", payload, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': ''
    },
  });
