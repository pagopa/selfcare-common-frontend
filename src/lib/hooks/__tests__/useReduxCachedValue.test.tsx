import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import useReduxCachedValue from '../useReduxCachedValue';
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

  const Component = () => {
    const fetchValues: () => Promise<Array<TestData>> = useReduxCachedValue(
      'TEST',
      spyFetch,
      testSelectors.selectTestCustomData,
      testActions.setTestCustomData
    );
    const [values, setValues] = useState<Array<TestData>>([]);

    return (
      <div>
        <button onClick={() => fetchValues().then((nextValues) => setValues(nextValues))}>
          Retrieve Values
        </button>
        <button onClick={() => setValues([])}>Clear</button>

        {values.length > 0
          ? values.map((o, index) => (
              <div key={o.prop1}>{`(${index + 1})${o.prop1}_${o.prop2}`}</div>
            ))
          : 'no data'}
      </div>
    );
  };

  render(
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

test('test', async () => {
  renderApp();

  await waitFor(() => screen.getByText('no data'));

  const fetchButton = screen.getByText('Retrieve Values');
  const clearButton = screen.getByText('Clear');

  await fetchAndCheck(fetchButton);

  fireEvent.click(clearButton);

  await waitFor(() => expect(screen.queryByText('(1)z_5')).toBeNull());

  await fetchAndCheck(fetchButton);

  expect(spyFetch).toBeCalledTimes(1);
});

const fetchAndCheck = async (fetchButton: HTMLElement) => {
  fireEvent.click(fetchButton);

  await waitFor(() => screen.getByText('(1)z_5'));
  screen.getByText('(2)b_200');
  screen.getByText('(3)g_25');
};
