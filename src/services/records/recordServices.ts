import axios, { AxiosResponse } from "axios";

interface RecordsPayload {
  dateFrom: string;
  dateTo: string;
}

export enum Records {
  EXPENSES = "expenses",
  INCOMES = "incomes",
}

export const getRecordsService = async (
  recordType: Records,
  userId: number,
  token: string,
  payload: RecordsPayload
): Promise<AxiosResponse> =>
  await axios.get(`http://192.168.1.21:3000/expenses/${userId}`, {
    headers: {
      authorization: token,
      dateFrom: payload.dateFrom,
      dateTo: payload.dateTo,
    },
  });
