import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import useReduxCachedValue from '../../hooks/useReduxCachedValue';
import withRetrievedValue from '../withRetrievedValue';
import { Provider } from 'react-redux';
import { createStore } from '../../../examples/redux/store';
import { testActions, testSelectors } from '../../../examples/redux/slices/testSlice';
import { fetchTestData } from '../../../examples/services/testService';
import TestData from '../../../examples/model/TestData';

let spyFetch: () => Promise<Array<TestData>>;

beforeEach(() => {
  spyFetch = jest.fn(fetchTestData);
});

const renderApp = () => {
  const store = createStore();

  const Component = (props: {
    testValues: Array<TestData>;
    prop2: string;
    prop3Optional?: number;
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
    getUseReduxCachedTestData,
    Component
  );

  render(
    <Provider store={store}>
      <WithRetrievedTestDataComponent prop2="PROVA" />
    </Provider>
  );
};

test('test', async () => {
  renderApp();

  await waitFor(() => screen.getByText('(1)z_5'));
  screen.getByText('(2)b_200');
  screen.getByText('(3)g_25');

  screen.getByText('PROVA');

  expect(spyFetch).toBeCalledTimes(1);
});
