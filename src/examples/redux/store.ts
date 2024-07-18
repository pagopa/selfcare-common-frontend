import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { appStateReducer } from '../../lib/redux/slices/appStateSlice';
import { userReducer } from '../../lib/redux/slices/userSlice';
import { permissionsReducer } from '../../lib/redux/slices/permissionsSlice';
import { testReducer } from './slices/testSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      appState: appStateReducer,
      test: testReducer,
      permissions: permissionsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(process.env.NODE_ENV === 'development' ? [logger] : []),
  });
