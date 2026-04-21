/* eslint-disable functional/immutable-data */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum StatusEnum {
  'ACTIVE' = 'ACTIVE',

  'TESTING' = 'TESTING',

  'PHASE_OUT' = 'PHASE_OUT',

  'INACTIVE' = 'INACTIVE',
}

export interface SubProductResource {
  /** Product's unique identifier */
  id: string;

  /** Product's title */
  title: string;

  /** Product's onBoarding status */
  productOnBoardingStatus: 'ACTIVE' | 'PENDING' | 'INACTIVE';

  /** Product's status */
  status: StatusEnum;

  /** If a product is delegable to a technical partner */
  delegable: boolean;

  /** Product's depict image */
  imageUrl: string;

  /** Product's logo */
  logo: string;

  /** Product logo's background color */
  logoBgColor: string;

  /** Product's description */
  description: string;

  /** URL that redirects to the public information webpage of the product */
  urlPublic: string;

  /** If a product is invoiceable */
  invoiceable: boolean;
}

export interface Product {
  description: string;
  id: string;
  logo: string;
  title: string;
  urlBO: string;
  backOfficeEnvironmentConfigurations?: Array<{
    environment?: string;
    url?: string;
  }>;
  urlPublic?: string;
  tag?: string;
  // product status.The intrinsic state of the product. Product status is unrelated to product onboarding status.
  status: StatusEnum;
  imageUrl: string;
  subProducts?: Array<SubProductResource>;
  logoBgColor?: string;
  delegable: boolean;
  invoiceable?: boolean;
}

export const InitialState = [];

export const productsSlice = createSlice({
  name: 'products',
  initialState: InitialState as Array<Product>,
  reducers: {
    setProducts: (state, action: PayloadAction<Array<Product>>) => ({
      ...state,
      ...action.payload,
    }),
    resetProducts: () => InitialState,
  },
});

// Actions
export const { setProducts, resetProducts } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

// Selectors
export const selectProducts = (state: { products: Array<Product> }) => state.products;
