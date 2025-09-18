import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../examples/redux/store';
import UserNotifyHandle from '../../components/UserNotifyHandle';
import useUserNotify from '../useUserNotify';
import { UserNotify } from '../../model/UserNotify';
import './../../../examples/locale';

jest.mock('i18next-browser-languagedetector');

const renderApp = (userNotify: UserNotify) => {
  const store = createStore();
  const Child = buildChildComponent(userNotify);
  // Type-safe aliases to avoid TypeScript conflicts
  const ReduxProvider = Provider as any;
  render(
    <ReduxProvider store={store}>
      <UserNotifyHandle />
      <Child />
    </ReduxProvider>
  );
  return store;
};

function buildChildComponent(userNotify: UserNotify) {
  return () => {
    const addNotify = useUserNotify();
    return <button onClick={() => addNotify(userNotify)}>NOTIFY</button>;
  };
}

test('test default component rendered', () => {
  renderApp({
    id: 'EXAMPLE',
    title: 'TITLE',
    message: 'MESSAGE',
    showCloseIcon: true,
  });

  expect(screen.queryByText('EXAMPLE')).toBeNull();
  const button = screen.getByText('NOTIFY');
  fireEvent.click(button);
  screen.getByText('TITLE');
  screen.getByText('MESSAGE');

  screen.getByTestId('ClearOutlinedIcon');
  screen.getByRole('button', { name: 'Annulla' });
});

test('test Notify Through Toast', () => {
  const onCloseMock = jest.fn();
  renderApp({
    id: 'EXAMPLE',
    title: 'TITLE',
    message: 'MESSAGE',
    component: 'Toast',
    onClose: onCloseMock,
    showCloseIcon: true,
  });

  expect(screen.queryByText('TITLE')).toBeNull();
  const button = screen.getByText('NOTIFY');
  fireEvent.click(button);
  screen.getByText('TITLE');
  screen.getByText('MESSAGE');

  const exitButton = screen.getByTestId('CloseIcon');
  fireEvent.click(exitButton);
  expect(screen.queryByText('TITLE')).toBeNull();

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('test Notify Closing Through Popup', () => {
  const onCloseMock = jest.fn();
  renderApp({
    id: 'EXAMPLE',
    title: 'TITLE',
    message: 'MESSAGE',
    component: 'SessionModal',
    onClose: onCloseMock,
    showCloseIcon: true,
  });

  expect(screen.queryByText('EXAMPLE')).toBeNull();
  const button = screen.getByText('NOTIFY');
  fireEvent.click(button);
  screen.getByText('TITLE');
  screen.getByText('MESSAGE');

  const exitButton = screen.getByTestId('ClearOutlinedIcon');
  fireEvent.click(exitButton);
  expect(screen.queryByText('EXAMPLE')).toBeNull();

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('test Notify Confirm Through Popup', () => {
  const onConfirmMock = jest.fn();
  renderApp({
    id: 'EXAMPLE',
    title: 'TITLE',
    message: 'MESSAGE',
    component: 'SessionModal',
    confirmLabel: 'Conferma',
    onConfirm: onConfirmMock,
    showCloseIcon: true,
  });

  expect(screen.queryByText('EXAMPLE')).toBeNull();
  const button = screen.getByText('NOTIFY');
  fireEvent.click(button);
  screen.getByText('TITLE');
  screen.getByText('MESSAGE');

  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  expect(screen.queryByText('EXAMPLE')).toBeNull();

  expect(onConfirmMock).toHaveBeenCalledTimes(1);
});

test('test Notify Cancel Through Popup', () => {
  const onCloseMock = jest.fn();
  renderApp({
    id: 'EXAMPLE',
    title: 'TITLE',
    message: 'MESSAGE',
    component: 'SessionModal',
    onClose: onCloseMock,
    showCloseIcon: true,
  });

  expect(screen.queryByText('EXAMPLE')).toBeNull();
  const button = screen.getByText('NOTIFY');
  fireEvent.click(button);
  screen.getByText('TITLE');
  screen.getByText('MESSAGE');

  const cancelButton = screen.getByRole('button', { name: 'Annulla' });
  fireEvent.click(cancelButton);
  expect(screen.queryByText('EXAMPLE')).toBeNull();

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});
