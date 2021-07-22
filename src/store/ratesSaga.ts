import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import {
  call,
  CallEffect,
  delay,
  put,
  PutEffect,
  race,
  StrictEffect,
  take,
  takeLatest,
} from "redux-saga/effects";

import { ExchangeData } from "../types";
import {
  loadRates,
  loadRatesError,
  loadRatesSuccess,
  pollRatesStart,
  pollRatesStop,
} from "./ratesSlice";

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
  | PutEffect<ActionCreatorWithoutPayload<string>>,
  void,
  ExchangeData
> {
  try {
    const rates = yield call(fetchRatesData);

    yield put(loadRatesSuccess(rates));
  } catch (error) {
    // toast with error.message

    yield put(loadRatesError);
  }
}

function* pollRatesFetching(): Generator<
  | CallEffect<ExchangeData | StrictEffect<number>>
  | PutEffect<{
      payload: ExchangeData;
      type: string;
    }>
  | PutEffect<ActionCreatorWithoutPayload<string>>,
  void,
  ExchangeData
> {
  while (true) {
    try {
      const rates = yield call(fetchRatesData);
      yield put(loadRatesSuccess(rates));
      yield delay(3000);
    } catch (error) {
      // toast with error.message

      yield put(loadRatesError);
    }
  }
}

function* loadRatesSaga() {
  yield takeLatest(loadRates, fetchRates);

  while (true) {
    yield take(pollRatesStart);
    yield race([call(pollRatesFetching), take(pollRatesStop)]);
  }
}

export default loadRatesSaga;
