import { fireEvent, render, screen } from '@testing-library/react';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../../../examples/redux/store';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { AppError } from '../../redux/slices/appStateSlice';
import { handleErrors } from '../../services/errorService';
import useErrorDispatcher from '../useErrorDispatcher';
import './../../../examples/locale';

jest.mock('../../services/errorService');
jest.mock('i18next-browser-languagedetector');
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      args[0]?.includes?.('The above error occurred in the <Child> component') ||
      args[0]?.includes?.('React will try to recreate this component tree')
    ) {
      return; // Suppress expected error boundary errors
    }
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

const renderApp = (content: ReactNode) => {
  const store = createStore();
  // Type-safe aliases to avoid TypeScript conflicts
  const ReduxProvider = Provider as any;
  render(
    <ReduxProvider store={store}>
      <ErrorBoundary>{content}</ErrorBoundary>
    </ReduxProvider>
  );
  return store;
};

test('Test no error', async () => {
  renderApp('PROVA');

  screen.getByText('PROVA');
  checkErrorServiceMockInvocation(0);
});

test('Test uncaught error', async () => {
  const Child: FunctionComponent = () => {
    useEffect(() => {
      throw new Error();
    });

    return <>NOT DISPLAYED</>;
  };
  renderApp(<Child />);

  checkBlockingError();
  checkErrorServiceMockInvocation();
});

test('Test blocking error', async () => {
  const errorDisplayed = 'ERROR DESCRIPTION TO BE DISPLAYED';
  const childText = 'NOT DISPLAYED';
  const Child: FunctionComponent = buildChildComponent(childText, {
    id: 'id',
    error: new Error(),
    showCloseIcon: true,
    blocking: true,
    displayableDescription: errorDisplayed,
    techDescription: 'DUMMY',
    toNotify: true,
  });
  renderApp(<Child />);

  checkBlockingError(errorDisplayed);

  expect(screen.queryByText(childText)).toBeNull();
  checkErrorServiceMockInvocation();
});

test('Test not blocking error not retriable', async () => {
  const errorDisplayed = 'ERROR DESCRIPTION TO BE DISPLAYED';
  const childText = 'DISPLAYED TEXT';
  const Child: FunctionComponent = buildChildComponent(childText, {
    id: 'id',
    error: new Error(),
    showCloseIcon: true,
    blocking: false,
    displayableDescription: errorDisplayed,
    techDescription: 'DUMMY',
    toNotify: true,
  });
  renderApp(<Child />);

  checkNotBlockingError(false, errorDisplayed);

  screen.getByText(childText);
  checkErrorServiceMockInvocation();
  checkCloseNotBlockingError(childText);
});

test('Test not blocking error retriable', async () => {
  const childText = 'DISPLAYED TEXT';
  const retryMock = jest.fn();
  const Child: FunctionComponent = buildChildComponent(childText, {
    id: 'id',
    error: new Error(),
    showCloseIcon: true,
    blocking: false,
    techDescription: 'DUMMY',
    onRetry: retryMock,
    toNotify: true,
    component: 'SessionModal',
  });
  renderApp(<Child />);

  checkNotBlockingError(true);

  screen.getByText(childText);
  checkErrorServiceMockInvocation();

  const exitButton = screen.getByText('Riprova');
  fireEvent.click(exitButton);
  expect(retryMock.mock.calls.length).toBe(1);

  checkClosedError(childText);
});

test('Test not blocking error toast', async () => {
  const errorDisplayed = 'ERROR DESCRIPTION TO BE DISPLAYED';
  const childText = 'DISPLAYED TEXT';
  const Child: FunctionComponent = buildChildComponent(childText, {
    id: 'id',
    error: new Error(),
    showCloseIcon: true,
    blocking: false,
    displayableTitle: 'Errore',
    displayableDescription: errorDisplayed,
    techDescription: 'DUMMY',
    toNotify: true,
    component: 'Toast',
  });
  renderApp(<Child />);

  checkNotBlockingError(false, errorDisplayed);

  screen.getByText(childText);
  checkErrorServiceMockInvocation();
  expect(screen.queryByText('Annulla')).toBeNull();
  const exitButton = screen.getByTestId('CloseIcon');
  fireEvent.click(exitButton);
  checkClosedError(childText);
});

// common methods

function buildChildComponent(childText: string, error: AppError) {
  return () => {
    const addError = useErrorDispatcher();

    useEffect(() => {
      addError(error);
    });

    return <>{childText}</>;
  };
}

function checkErrorServiceMockInvocation(expectedInvocationNumber: number = 1) {
  expect((handleErrors as any).mock.calls.length).toBe(expectedInvocationNumber);
}

function checkBlockingError(description?: string) {
  screen.getByText('Spiacenti, qualcosa è andato storto.');
  screen.getByText(
    description ?? 'A causa di un errore del sistema non è possibile completare la procedura.'
  );
}

function checkNotBlockingError(retriable: boolean, description?: string) {
  screen.getByText('Errore');
  screen.getByText(description ?? 'Spiacenti, qualcosa è andato storto.');
  if (retriable) {
    screen.getByRole('button', { name: 'Riprova' });
  } else {
    expect(screen.queryByText('Riprova')).toBeNull();
  }
}

function checkCloseNotBlockingError(childText: string) {
  const exitButton = screen.getByText('Annulla');
  fireEvent.click(exitButton);
  checkClosedError(childText);
}

function checkClosedError(childText: string) {
  expect(screen.queryByText('Errore')).toBeNull();
  screen.getByText(childText);
}
