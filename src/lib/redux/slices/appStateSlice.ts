import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppError } from '../../model/AppError';
import { UserNotify } from '../../model/UserNotify';

// for retrocompatibility
export type { AppError } from '../../model/AppError';

interface AppStateState {
  loading: {
    result: boolean;
    tasks: { [taskId: string]: boolean };
  };
  errors: Array<AppError>;
  userNotifies: Array<UserNotify>;
  unloadEventConfiguration: {
    enabled: boolean;
    open: boolean;
    title?: string;
    description?: string;
    exitAction?: () => void;
  };
}

const initialState: AppStateState = {
  loading: {
    result: false,
    tasks: {},
  },
  errors: [],
  userNotifies: [],
  unloadEventConfiguration: {
    enabled: false,
    open: false,
  },
};

const keepOnPage = (e: BeforeUnloadEvent) => {
  const message =
    "Warning!\n\nNavigating away from this page will delete your text if you haven't already saved it.";
  e.preventDefault();
  // eslint-disable-next-line functional/immutable-data
  e.returnValue = message;
  return message;
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
      if (!action.payload.component) {
        action.payload.component = 'SessionModal';
      }

      if (action.payload.component === 'Toast') {
        if (action.payload.autoclosable === undefined) {
          action.payload.autoclosable = 'timer';
        }
        if (
          action.payload.autoclosable === 'timer' &&
          (!action.payload.autocloseMilliseconds || action.payload.autocloseMilliseconds < 0)
        ) {
          action.payload.autocloseMilliseconds = 2000;
        }
      }

      state.errors.push(action.payload);
    },
    removeError: (state, action: PayloadAction<AppError>) => {
      state.errors = state.errors.filter((e) => e.id !== action.payload.id);
    },

    addNotify: (state, action: PayloadAction<UserNotify>) => {
      if (action.payload.component === 'Toast') {
        if (action.payload.autoclosable === undefined) {
          action.payload.autoclosable = 'timer';
        }
        if (
          action.payload.autoclosable === 'timer' &&
          (!action.payload.autocloseMilliseconds || action.payload.autocloseMilliseconds < 0)
        ) {
          action.payload.autocloseMilliseconds = 2000;
        }
      }

      state.userNotifies.push(action.payload);
    },
    removeNotify: (state, action: PayloadAction<UserNotify>) => {
      state.userNotifies = state.userNotifies.filter((e) => e.id !== action.payload.id);
    },

    enableUnloadEventInterceptor: (
      state,
      action: PayloadAction<{
        title?: string;
        description?: string;
      }>
    ) => {
      state.unloadEventConfiguration.open = false;
      state.unloadEventConfiguration.enabled = true;
      state.unloadEventConfiguration.title = action.payload.title;
      state.unloadEventConfiguration.description = action.payload.description;
      window.addEventListener('beforeunload', keepOnPage);
    },
    disableUnloadEventInterceptor: (state) => {
      state.unloadEventConfiguration.open = false;
      state.unloadEventConfiguration.enabled = false;
      window.removeEventListener('beforeunload', keepOnPage);
    },
    openUnloadEventNotify: (state, action: PayloadAction<() => void>) => {
      state.unloadEventConfiguration.open = true;
      state.unloadEventConfiguration.exitAction = action.payload;
    },
    closeUnloadEventNotify: (state) => {
      state.unloadEventConfiguration.open = false;
      state.unloadEventConfiguration.exitAction = undefined;
    },
  },
});

export const appStateActions = appStateSlice.actions;
export const appStateReducer = appStateSlice.reducer;

export const appStateSelectors = {
  selectLoading: (state: { appState: AppStateState }) => state.appState.loading.result,
  selectErrors: (state: { appState: AppStateState }) => state.appState.errors,
  selectNotifies: (state: { appState: AppStateState }) => state.appState.userNotifies,
  selectUnloadEventConfiguration: (state: { appState: AppStateState }) =>
    state.appState.unloadEventConfiguration,
};
