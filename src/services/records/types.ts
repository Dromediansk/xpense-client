export interface ApiResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data?: T;
}

export enum Records {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export enum Currencies {
  EUR = 'EUR',
  USD = 'USD',
  CZK = 'CZK',
}

export interface Record {
  id: number;
  type: Records;
  user_id: number;
  amount: number;
  currency: Currencies;
  category_id: number;
  account_id: number;
  description: string;
  created: string;
}
