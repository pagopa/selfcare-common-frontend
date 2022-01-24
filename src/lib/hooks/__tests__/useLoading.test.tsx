import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../redux/__tests__/store';
import { appStateActions } from '../../redux/slices/appStateSlice';
import LoadingOverlay from '../../components/Loading/LoadingOverlay';

const renderApp = (injectedStore?: any) => {
  const store = injectedStore ? injectedStore : createStore();
  render(
    <Provider store={store}>
      <LoadingOverlay />
    </Provider>
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

const dispatchLoadingTask = (dispatch, task, loading) => {
  dispatch(appStateActions.setLoading({ task, loading }));
};

const checkLoading = (expectedLoading: boolean) => {
  if (expectedLoading) {
    screen.getByRole('loadingSpinner');
  } else {
    expect(screen.queryByRole('loadingSpinner')).toBeNull();
  }
};
