import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonsLoadMore from '../components/Buttons/ButtonLoadMore.jsx';
import ButtonsCart from '../components/Buttons/ButttonCart.jsx';
import Container from '../components/conteiner/Conteiner.jsx';
import { FormFilter } from '../components/FormFilter/FormFilter.jsx';
import Spinner from '../components/Spiner/Spiner.jsx';
import {
  setCarData,
  setHasMore,
  setLikedCars,
  setLoading,
  setPage,
} from '../redux/filterCarSlices';
import { fetchCarGalleryByFilter } from '../services/car-API.js';
import { updateFilters } from '../utils/updateParams.js';
import css from './Catalog.module.css';

export default function Catalog() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const brand = useSelector((state) => state.filter.brand);
  const rentalPrice = useSelector((state) => state.filter.rentalPrice);
  const minMileage = useSelector((state) => state.filter.minMileage);
  const maxMileage = useSelector((state) => state.filter.maxMileage);
  const page = useSelector((state) => state.filter.page);

  const limit = useSelector((state) => state.filter.limit);
  const isLoading = useSelector((state) => state.filter.isLoading);
  const hasMore = useSelector((state) => state.filter.hasMore);
  const carData = useSelector((state) => state.filter.carData);
  const likedCars = useSelector((state) => state.filter.likedCars);

  const loadMoreButtonRef = useRef(null);

  const scrollToButton = () => {
    scroller.scrollTo('loadMoreButton', {
      duration: 2500,
      delay: 0,
      smooth: 'easeInOutCubic',
    });
  };

  useEffect(() => {
    const params = {
      brand: searchParams.get('brand'),
      rentalPrice: searchParams.get('rentalPrice'),
      minMileage: searchParams.get('minMileage'),
      maxMileage: searchParams.get('maxMileage'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    };

    updateFilters(params, setSearchParams, dispatch);
  }, [searchParams, setSearchParams, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      try {
        const data = await dispatch(
          fetchCarGalleryByFilter({
            brand,
            rentalPrice,
            minMileage,
            maxMileage,
            page,
            limit,
          }),
        ).unwrap();

        if (page === 1) {
          dispatch(setCarData(data));
        } else {
          const currentCarData = carData || [];
          dispatch(setCarData([...currentCarData, ...data]));
        }

        dispatch(setHasMore(data.length === limit));
      } catch (error) {
        console.error('Error fetching car data:', error);
        toast.error('Failed to load data!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        dispatch(setLoading(false));

        scrollToButton();
      }
    };

    fetchData();
  }, [dispatch, brand, rentalPrice, minMileage, maxMileage, page, limit]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete('brand');
    params.delete('rentalPrice');
    params.delete('minMileage');
    params.delete('maxMileage');
    params.delete('page');
    params.delete('limit');
    setSearchParams(params);
  }, []);

  const loadMore = () => {
    if (isLoading) {
      toast.info('Data is loading...', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (!hasMore) {
      toast.warn('No more data to load!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (hasMore && !isLoading) {
      const nextPage = page + 1;

      setSearchParams({
        brand: brand || '',
        rentalPrice: rentalPrice || '',
        minMileage: minMileage || '',
        maxMileage: maxMileage || '',
        page: nextPage,
        limit: limit,
      });
      dispatch(setPage(nextPage));
    }
  };

  const toggleLike = (carId) => {
    return dispatch(setLikedCars({ carId }));
  };

  return (
    <Container>
      <div className={css.catalog}>
        <FormFilter />
        <div className={css.carList}>
          {isLoading && <Spinner />}

          {carData ? (
            carData.map((car, index) => {
              return (
                <div key={`${car.id}-${index}`} className={css.carCard}>
                  <div className={css.imageContainer}>
                    <svg
                      className={`${css.icon} ${css.iconCar}`}
                      onClick={() => toggleLike(car.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <use
                        xlinkHref={
                          likedCars[car.id]
                            ? '/symbol-defs.svg#icon-heart-1'
                            : '/symbol-defs.svg#icon-heart'
                        }
                      ></use>
                    </svg>
                    <img
                      src={car.img}
                      alt={car.brand}
                      className={css.carImage}
                    />
                  </div>
                  <div className={css.carDetails}>
                    <p className={css.carName}>
                      {car.brand}{' '}
                      <span style={{ color: '#3470FF' }}>{car.model}</span>,{' '}
                      {car.year}
                    </p>
                    <p className={css.carPrice}>${car.rentalPrice} </p>
                  </div>
                  <div className={css.carLocation}>
                    <p className={css.carLocationText}>
                      {car.address ? (
                        <>
                          <span className={css.cityCountry1}>
                            {car.address.split(',')[1]}
                          </span>

                          <span className={css.cityCountry2}>
                            {car.address.split(',')[2]}
                          </span>
                        </>
                      ) : (
                        ''
                      )}
                    </p>
                    <p className={css.rentalCompany}>{car.rentalCompany}</p>
                  </div>
                  <div className={css.carInfo}>
                    <p className={css.carType}>{car.type}</p>
                    <p className={css.carMileage}>{car.mileage}</p>
                  </div>
                  <Link to={`/catalog/${car.id}`}>
                    <ButtonsCart />
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {hasMore && isLoading && (
          <div className={css.spinnerContainer}>
            <Spinner />
          </div>
        )}
        {hasMore && (
          <ButtonsLoadMore ref={loadMoreButtonRef} onClick={loadMore} />
        )}

        <ToastContainer />
      </div>
    </Container>
  );
}
