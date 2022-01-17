import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../model/User';

interface UserState {
  logged?: User;
}

const initialState: UserState = {};

/* eslint-disable functional/immutable-data */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<User>) => {
      state.logged = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userSelectors = {
  selectLoggedUser: (state: any) => state.user.logged,
};
