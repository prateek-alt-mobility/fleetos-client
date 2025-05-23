import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { api } from './api';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [api.nestApi.reducerPath]: api.nestApi.reducer,
    [api.v1Api.reducerPath]: api.v1Api.reducer,
    [api.v2Api.reducerPath]: api.v2Api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      api.nestApi.middleware,
      api.v1Api.middleware,
      api.v2Api.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
