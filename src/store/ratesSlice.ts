import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ExchangeData } from "../types";
import { RootState } from "./store";

interface RatesState {
  rates: Record<string, number> | null;
  isRatesLoading: boolean;
  lastUpdatedAt: number | null;
}

const initialState: RatesState = {
  rates: null,
  lastUpdatedAt: null,
  isRatesLoading: false,
};

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    loadRates: (state) => {
      state.isRatesLoading = true;
    },
    loadRatesSuccess: (state, action: PayloadAction<ExchangeData>) => {
      state.isRatesLoading = false;

      state.rates = action.payload.rates;
      state.lastUpdatedAt = action.payload.time_last_updated;
    },
    loadRatesError: (state) => {
      state.isRatesLoading = false;
    },
  },
});

export const { loadRates, loadRatesSuccess, loadRatesError } =
  ratesSlice.actions;

export const selectRates = (state: RootState) => {
  return state.rates;
};

export const selectLastUpdatedAt = (state: RootState) => {
  return state.lastUpdatedAt;
};

export const selectIsRatesLoading = (state: RootState) => state.isRatesLoading;

export default ratesSlice.reducer;
