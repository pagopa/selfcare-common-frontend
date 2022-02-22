import TestData from '../model/TestData';

export const mockedTestData: Array<TestData> = [
  {
    prop1: 'z',
    prop2: 5,
  },
  {
    prop1: 'b',
    prop2: 200,
  },
  {
    prop1: 'g',
    prop2: 25,
  },
];

export const fetchTestData = (): Promise<Array<TestData>> =>
  new Promise((resolve) => setTimeout(() => resolve(mockedTestData), 500));
