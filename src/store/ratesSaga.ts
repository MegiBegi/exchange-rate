import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";

import { ExchangeData } from "../types";
import { loadRates, loadRatesError, loadRatesSuccess } from "./ratesSlice";

const fetchRatesData = (): Promise<ExchangeData> =>
  fetch("https://api.exchangerate-api.com/v4/latest/USD").then((res) =>
    res.json()
  );

function* fetchRates(): Generator<
  | CallEffect<ExchangeData>
  | PutEffect<{
      payload: ExchangeData;
      type: string;
    }>
  | PutEffect<{
      payload: undefined;
      type: string;
    }>,
  void,
  ExchangeData
> {
  try {
    const rates = yield call(fetchRatesData);

    yield put(loadRatesSuccess(rates));
  } catch (error) {
    // toast with error.message

    yield put(loadRatesError());
  }
}

function* loadRatesSaga() {
  yield takeLatest(loadRates, fetchRates);
}

export default loadRatesSaga;
