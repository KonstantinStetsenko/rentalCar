import { createSlice } from '@reduxjs/toolkit';
import { fetchCarGalleryByFilter } from '../services/car-API.js';

const initialState = {
  carData: [],
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
  page: 1,
  limit: 12,
  isLoading: false,
  hasMore: true,
  likedCars: JSON.parse(localStorage.getItem('likedCars')) || {},
};

const filterCarSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterBrand: (state, action) => {
      state.brand = action.payload;
    },
    setFilterPrice: (state, action) => {
      state.rentalPrice = action.payload;
    },
    setFilterMinMileage: (state, action) => {
      state.minMileage = action.payload;
    },
    setFilterMaxMileage: (state, action) => {
      state.maxMileage = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setCarData: (state, action) => {
      state.carData = action.payload;
    },
    setLikedCars: (state, action) => {
      const { carId } = action.payload;
      if (typeof carId !== 'string' && typeof carId !== 'number') return; // безпечна перевірка
      state.likedCars[carId] = !state.likedCars[carId];
      localStorage.setItem('likedCars', JSON.stringify(state.likedCars));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarGalleryByFilter.pending, (state) => {
        state.isLoading = true;
        state.hasMore = true;
      })
      .addCase(fetchCarGalleryByFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
        state.carData = [...state.carData, ...action.payload];
      })
      .addCase(fetchCarGalleryByFilter.rejected, (state) => {
        state.isLoading = false;
        state.hasMore = false;
        state.carData = [];
      });
  },
});

export const {
  setFilterBrand,
  setFilterPrice,
  setFilterMinMileage,
  setFilterMaxMileage,
  setPage,
  setLimit,
  setLoading,
  setHasMore,
  setCarData,
  setLikedCars,
} = filterCarSlice.actions;

export const cartReducer = filterCarSlice.reducer;
