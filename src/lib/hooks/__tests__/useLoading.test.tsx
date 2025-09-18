import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../examples/redux/store';
import LoadingOverlay from '../../components/Loading/LoadingOverlay';
import { appStateActions } from '../../redux/slices/appStateSlice';

const renderApp = (injectedStore?: any) => {
  const store = injectedStore ? injectedStore : createStore();
  // Type-safe aliases to avoid TypeScript conflicts
  const ReduxProvider = Provider as any;

  render(
    <ReduxProvider store={store}>
      <LoadingOverlay />
    </ReduxProvider>
  );
  return store;
};

test('Test loading', () => {
  const store = renderApp();
  checkLoading(false);
  dispatchLoadingTask(store.dispatch, 't1', true);
  checkLoading(true);
  dispatchLoadingTask(store.dispatch, 't2', true);
  checkLoading(true);
  dispatchLoadingTask(store.dispatch, 't1', false);
  checkLoading(true);
  dispatchLoadingTask(store.dispatch, 't2', false);
  checkLoading(false);
});

const dispatchLoadingTask = (
  dispatch: (arg0: {
    payload: { task: string; loading: boolean };
    type: 'appState/setLoading';
  }) => void,
  task: string,
  loading: boolean
) => {
  dispatch(appStateActions.setLoading({ task, loading }));
};

const checkLoading = async (expectedLoading: boolean) => {
  if (expectedLoading) {
    await waitFor(() => screen.getByRole('loadingSpinner'));
  } else {
    expect(screen.queryByRole('loadingSpinner')).toBeNull();
  }
};
