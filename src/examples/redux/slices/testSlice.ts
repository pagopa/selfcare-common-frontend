import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TestData from '../../model/TestData';

interface TestState {
  testCustomData?: Array<TestData>;
}

const initialState: TestState = {};

/* eslint-disable functional/immutable-data */
export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestCustomData: (state, action: PayloadAction<Array<TestData>>) => {
      state.testCustomData = action.payload;
    },
  },
});

export const testActions = testSlice.actions;
export const testReducer = testSlice.reducer;

export const testSelectors = {
  selectTestCustomData: (state: { test: TestState }) => state.test.testCustomData,
};
