import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import useReduxCachedValue from '../../hooks/useReduxCachedValue';
import withRetrievedValue from '../withRetrievedValue';
import { Provider } from 'react-redux';
import { createStore } from '../../../examples/redux/store';
import { testActions, testSelectors } from '../../../examples/redux/slices/testSlice';
import { fetchTestData } from '../../../examples/services/testService';
import TestData from '../../../examples/model/TestData';

let spyFetch: jest.Mock<Promise<Array<TestData>>>;

beforeEach(() => {
  spyFetch = jest.fn(fetchTestData);
});

const renderApp = (cachedRetrieve: boolean) => {
  const store = createStore();

  const Component = (props: {
    testValues: Array<TestData>;
    prop2: string;
    prop3Optional?: number;
    reload: () => void;
  }) => {
    return (
      <div>
        <div>{props.prop2}</div>
        <div>
          {props.testValues.length > 0
            ? props.testValues.map((o, index) => (
                <div key={o.prop1}>{`(${index + 1})${o.prop1}_${o.prop2}`}</div>
              ))
            : 'no data'}
        </div>
        <button onClick={props.reload}>reload</button>
      </div>
    );
  };

  const getUseReduxCachedTestData = () =>
    useReduxCachedValue(
      'TEST',
      spyFetch,
      testSelectors.selectTestCustomData,
      testActions.setTestCustomData
    );

  const WithRetrievedTestDataComponent = withRetrievedValue(
    'testValues',
    cachedRetrieve ? getUseReduxCachedTestData : () => spyFetch,
    Component
  );

  // Type-safe aliases to avoid TypeScript conflicts
  const ReduxProvider = Provider as any;

  render(
    <ReduxProvider store={store}>
      <WithRetrievedTestDataComponent prop2="PROVA" />
    </ReduxProvider>
  );
};

const baseBehavior = async (cachedRetrieve: boolean) => {
  renderApp(cachedRetrieve);

  await waitFor(() => screen.getByText('(1)z_5'));
  screen.getByText('(2)b_200');
  screen.getByText('(3)g_25');

  screen.getByText('PROVA');

  expect(spyFetch).toHaveBeenCalledTimes(1);

  spyFetch.mockImplementation(
    () => new Promise((resolve) => resolve([{ prop1: 'RELOAD_P1', prop2: -5 }]))
  );

  const reloadButton = screen.getByRole('button', { name: 'reload' });
  fireEvent.click(reloadButton);

  if (cachedRetrieve) {
    await waitFor(() => screen.getByText('(1)z_5'));
    screen.getByText('(2)b_200');
    screen.getByText('(3)g_25');
    expect(spyFetch).toHaveBeenCalledTimes(1);
  } else {
    await waitFor(() => screen.getByText('(1)RELOAD_P1_-5'));

    expect(spyFetch).toHaveBeenCalledTimes(2);
  }
};

test('test using cached retrieve', async () => {
  await baseBehavior(true);
});

test('test using not cached retrieve', async () => {
  await baseBehavior(false);
});
