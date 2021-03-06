import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import useReduxCachedValue from '../useReduxCachedValue';
import { Provider } from 'react-redux';
import { createStore } from '../../../examples/redux/store';
import { testActions, testSelectors } from '../../../examples/redux/slices/testSlice';
import { fetchTestData, mockedTestData } from '../../../examples/services/testService';
import TestData from '../../../examples/model/TestData';

let spyFetch: () => Promise<Array<TestData>>;

beforeEach(() => {
  spyFetch = jest.fn(fetchTestData);
});

const renderApp = (
  retrieveServiceArgs?: any,
  reduxSelectedPredicate?: (selected: Array<TestData>, retrieveServiceArgs?: any) => boolean
) => {
  const store = createStore();

  const Component = () => {
    const fetchValues: (retrieveServiceArgs?: any) => Promise<Array<TestData>> =
      useReduxCachedValue(
        'TEST',
        spyFetch,
        testSelectors.selectTestCustomData,
        testActions.setTestCustomData,
        reduxSelectedPredicate
      );
    const [values, setValues] = useState<Array<TestData>>([]);

    return (
      <div>
        <button
          onClick={() =>
            fetchValues(retrieveServiceArgs).then((nextValues) => setValues(nextValues))
          }
        >
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
  const retrieverServiceArg = 'PROVA';
  const reduxSelectedPredicateMock = jest.fn(() => false);
  renderApp(retrieverServiceArg, reduxSelectedPredicateMock);

  await waitFor(() => screen.getByText('no data'));

  const fetchButton = screen.getByText('Retrieve Values');
  const clearButton = screen.getByText('Clear');

  await fetchAndCheck(fetchButton);

  await clear(clearButton);

  await fetchAndCheck(fetchButton);

  checkMockInvocationTimes(1, 1, reduxSelectedPredicateMock, retrieverServiceArg); // reduxSelectedPredicateMock called just once, because at the first click there are no entities, so the predicate is not called

  reduxSelectedPredicateMock.mockImplementation(() => true);

  await clear(clearButton);

  await fetchAndCheck(fetchButton);

  checkMockInvocationTimes(2, 2, reduxSelectedPredicateMock, retrieverServiceArg);
});

const fetchAndCheck = async (fetchButton: HTMLElement) => {
  fireEvent.click(fetchButton);

  await waitFor(() => screen.getByText('(1)z_5'));
  screen.getByText('(2)b_200');
  screen.getByText('(3)g_25');
};

const clear = async (clearButton: HTMLElement) => {
  fireEvent.click(clearButton);

  await waitFor(() => expect(screen.queryByText('(1)z_5')).toBeNull());
};

const checkMockInvocationTimes = (
  expectedRetrieverServiceTimes: number,
  expectedReduxSelectedPredicateTimes: number,
  reduxSelectedPredicateMock: jest.Mock,
  retrieverServiceArg?: any
) => {
  expect(spyFetch).toBeCalledTimes(expectedRetrieverServiceTimes);
  expect(spyFetch).toBeCalledWith(retrieverServiceArg);

  expect(reduxSelectedPredicateMock).toBeCalledWith(mockedTestData, retrieverServiceArg);
  expect(reduxSelectedPredicateMock).toBeCalledTimes(expectedReduxSelectedPredicateTimes);
};
