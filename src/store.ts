import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import ratesReducer from "src/ratesSlice";

import mySaga from "./ratesSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(ratesReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
