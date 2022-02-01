import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { appStateReducer } from './lib/redux/slices/appStateSlice';
import { userReducer } from './lib/redux/slices/userSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      appState: appStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(process.env.NODE_ENV === 'development' ? [logger] : []),
  });
