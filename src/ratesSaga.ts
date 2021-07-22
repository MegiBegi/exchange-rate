import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";

import { loadRates, loadRatesError, loadRatesSuccess } from "./ratesSlice";
import { ExchangeData } from "./types";

function* fetchRates(): Generator<
  | CallEffect<ExchangeData>
  | PutEffect<{
      payload: ExchangeData;
      type: string;
    }>
  | PutEffect<ActionCreatorWithoutPayload<string>>,
  void,
  ExchangeData
> {
  try {
    const fetchRates = (): Promise<ExchangeData> =>
      fetch("https://api.exchangerate-api.com/v4/latest/USD").then((res) =>
        res.json()
      );
    const rates = yield call(fetchRates);

    yield put(loadRatesSuccess(rates));
  } catch (error) {
    // toast with error.message

    yield put(loadRatesError);
  }
}

function* loadRatesSaga() {
  yield takeLatest(loadRates, fetchRates);
}

export default loadRatesSaga;
