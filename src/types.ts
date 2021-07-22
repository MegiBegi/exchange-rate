export type ExchangeData = {
  base: string;
  date: string;
  provider: string;
  rates: Record<string, number>;
  terms: string;
  time_last_updated: number;
};
