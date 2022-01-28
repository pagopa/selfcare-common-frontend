import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { appStateReducer } from '../slices/appStateSlice';
import { userReducer } from '../slices/userSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      appState: appStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([logger]),
  });
