import axios, { AxiosResponse } from 'axios';

interface RecordsPayload {
  dateFrom: string;
  dateTo: string;
}

export const getRecordsService = (
  userId: number,
  token: string,
  payload: RecordsPayload,
): Promise<AxiosResponse> =>
  axios.get(`http://192.168.1.21:3000/records/${userId}`, {
    headers: {
      authorization: token,
      dateFrom: payload.dateFrom,
      dateTo: payload.dateTo,
    },
  });
