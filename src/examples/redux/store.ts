import type { Middleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { appStateReducer } from '../../lib/redux/slices/appStateSlice';
import { permissionsReducer } from '../../lib/redux/slices/permissionsSlice';
import { userReducer } from '../../lib/redux/slices/userSlice';
import { testReducer } from './slices/testSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      appState: appStateReducer,
      test: testReducer,
      permissions: permissionsReducer,
    },
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        serializableCheck: false,
      });

      if (process.env.NODE_ENV === 'development') {
        middleware.push(logger as Middleware);
      }

      return middleware;
    },
  });

  export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;