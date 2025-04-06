import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './filterCarSlices.js';
import { listBrandReducer } from './listBrandSlice.js';

export const store = configureStore({
  reducer: {
    filter: cartReducer,
    listBrand: listBrandReducer,
  },
});
