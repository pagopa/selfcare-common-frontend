import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorInfo } from 'react';
import { UserNotify } from '../../model/UserNotify';

export type AppError = {
  /** The identifier used to recognize the error: it cannot be possible to have the same error id at the same time */
  id: string;
  /** The Error thrown */
  error: Error;
  errorInfo?: ErrorInfo;
  /** If true, this error will show the error page, not allowing the user to do anything, otherwise it will show a closable popup */
  blocking: boolean;
  /** A description of the error to send when notifying the error */
  techDescription: string;
  /** A text to show as title of the popup when a not blocking error occurs */
  displayableTitle?: string;
  /** A text to show as body of the popup when a not blocking error occurs */
  displayableDescription?: string;
  /** If defined, in case of not blocking error, it will render a retry button which will execute this function */
  onRetry?: () => void;
  /** If defined, in case of not blocking error, it will be executed when closing the popup */
  onClose?: () => void;
  /** If true, it will notify the error */
  toNotify: boolean;
  /** Can render a SessionModal or Toast component */
  component?: 'SessionModal' | 'Toast';
};

interface AppStateState {
  loading: {
    result: boolean;
    tasks: { [taskId: string]: boolean };
  };
  errors: Array<AppError>;
  userNotifies: Array<UserNotify>;
}

const initialState: AppStateState = {
  loading: {
    result: false,
    tasks: {},
  },
  errors: [],
  userNotifies: [],
};

/* eslint-disable functional/immutable-data */
export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ task: string; loading: boolean }>) => {
      if (action.payload.loading) {
        state.loading.result = true;
        state.loading.tasks[action.payload.task] = true;
      } else {
        delete state.loading.tasks[action.payload.task];
        state.loading.result = Object.keys(state.loading.tasks).length > 0;
      }
    },
    addError: (state, action: PayloadAction<AppError>) => {
      state.errors.push(action.payload);
    },
    removeError: (state, action: PayloadAction<AppError>) => {
      state.errors = state.errors.filter((e) => e.id !== action.payload.id);
    },
    addNotify: (state, action: PayloadAction<UserNotify>) => {
      state.userNotifies.push(action.payload);
    },
    removeNotify: (state, action: PayloadAction<UserNotify>) => {
      state.userNotifies = state.userNotifies.filter((e) => e.id !== action.payload.id);
    },
  },
});

export const appStateActions = appStateSlice.actions;
export const appStateReducer = appStateSlice.reducer;

export const appStateSelectors = {
  selectLoading: (state: { appState: AppStateState }) => state.appState.loading.result,
  selectErrors: (state: { appState: AppStateState }) => state.appState.errors,
  selectNotifies: (state: { appState: AppStateState }) => state.appState.userNotifies,
};
