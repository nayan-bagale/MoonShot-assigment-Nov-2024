import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import datasetReducer from "./features/dataset-slice";
import backendApi from "./api/api-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dataset: datasetReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
