import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

export async function fetchCarGallery() {
  try {
    const response = await axios(`${BASE_URL}/cars`);
    const data = response.data.cars;

    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchCarGalleryById(id) {
  try {
    const response = await axios(`${BASE_URL}/cars/${id}`);
    const data = response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchCarGalleryByFilter = createAsyncThunk(
  'cars/fetchCarGalleryByFilter',
  async (
    {
      brand = '',
      rentalPrice = '',
      minMileage = '',
      maxMileage = '',
      page = 1,
      limit = 6,
    },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams();
      if (brand) {
        params.append('brand', brand);
      }
      if (rentalPrice) {
        params.append('rentalPrice', rentalPrice);
      }
      if (minMileage) {
        params.append('minMileage', minMileage);
      }
      if (maxMileage) {
        params.append('maxMileage', maxMileage);
      }
      params.append('page', page);
      params.append('limit', limit);

      const response = await axios.get(`${BASE_URL}/cars?${params.toString()}`);
      const data = response.data.cars || [];

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export async function fetchCarNameBrand() {
  try {
    const response = await axios.get(`${BASE_URL}/brands`);
    const data = response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}
