import { render, screen, fireEvent } from '@testing-library/react';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../../redux/__tests__/store';
import UserNotifyHandle from '../../components/UserNotifyHandle';
import useUserNotify from '../useUserNotify';
import { UserNotify } from '../../model/UserNotify';

const renderApp = (userNotify: UserNotify) => {
  const store = createStore();
  const Child = buildChildComponent(userNotify);
  render(
    <Provider store={store}>
      <UserNotifyHandle />
      <Child />
    </Provider>
  );
  return store;
};

function buildChildComponent(userNotify: UserNotify) {
  return () => {
    const addNotify = useUserNotify();
    return <button onClick={() => addNotify(userNotify)}>NOTIFY</button>;
  };
}

test('test Notify Through Toast', () => {
  renderApp({
    id: 'EXAMPLE',
    title: 'TITLE',
    message: 'MESSAGE',
  });

  expect(screen.queryByText('TITLE')).toBeNull();
  const button = screen.getByText('NOTIFY');
  fireEvent.click(button);
  screen.getByText('TITLE');
  screen.getByText('MESSAGE');

  const exitButton = screen.getByTestId('CloseIcon');
  fireEvent.click(exitButton);
  expect(screen.queryByText('TITLE')).toBeNull();
});
