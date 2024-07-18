import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductPermissions {
  productId: string;
  actions: Array<string>;
}

export interface PermissionsState {
  productPermissions: Array<ProductPermissions>;
}

const initialState: PermissionsState = {
  productPermissions: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setProductPermissions: (state, action: PayloadAction<Array<ProductPermissions>>) => ({
      ...state,
      productPermissions: action.payload,
    }),
    resetPermissions: (state) => ({
      ...state,
      productPermissions: [],
    }),
  },
});

// Actions
export const { setProductPermissions, resetPermissions } = permissionsSlice.actions;

export const permissionsReducer = permissionsSlice.reducer;

// Selectors
export const selectProductPermissions = (state: { permissions: PermissionsState }) => 
  state.permissions.productPermissions;
