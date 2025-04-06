import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listBrand: [],
};

const listBrandSlice = createSlice({
  name: 'listBrand',
  initialState,
  reducers: {
    setListBrand: (state, action) => {
      state.listBrand = action.payload;
    },
  },
});

export const { setListBrand } = listBrandSlice.actions;
export const listBrandReducer = listBrandSlice.reducer;
