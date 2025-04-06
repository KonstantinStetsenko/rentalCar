import {
  setFilterBrand,
  setFilterMaxMileage,
  setFilterMinMileage,
  setFilterPrice,
  setLimit,
  setPage,
} from '../redux/filterCarSlices.js';

export const updateFilters = (params, setSearchParams, dispatch) => {
  const { brand, rentalPrice, minMileage, maxMileage, page, limit } = params;

  setSearchParams({
    brand: brand || '',
    rentalPrice: rentalPrice || '',
    minMileage: minMileage || '',
    maxMileage: maxMileage || '',
    page: page || 1,
    limit: limit || 12,
  });

  dispatch(setFilterBrand(brand || ''));
  dispatch(setFilterPrice(rentalPrice || ''));
  dispatch(setFilterMinMileage(minMileage || ''));
  dispatch(setFilterMaxMileage(maxMileage || ''));
  if (page) dispatch(setPage(Number(page)));
  if (limit) dispatch(setLimit(Number(limit)));
};
