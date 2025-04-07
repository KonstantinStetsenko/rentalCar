import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Select, { components } from 'react-select';
import { setListBrand } from '../../redux/listBrandSlice.js';
import { fetchCarNameBrand } from '../../services/car-API.js';
import { updateFilters } from '../../utils/updateParams.js';
import { validationSchema } from '../../utils/validationForm.js';
import css from './FormFilter.module.css';

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>{children} $</components.SingleValue>
);

export const FormFilter = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const listBrand = useSelector((state) => state.listBrand.listBrand);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedListBrand = await fetchCarNameBrand();

        if (fetchedListBrand) {
          dispatch(setListBrand(fetchedListBrand));
        }
      } catch (error) {
        console.error('Error fetching car brands:', error);
        dispatch(setListBrand([]));
      }
    };
    fetchData();
  }, [dispatch]);

  const initialValues = {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  };

  const ChoosePrice = [
    { value: '', text: 'None' },
    { value: 30, text: '30' },
    { value: 40, text: '40' },
    { value: 50, text: '50' },
    { value: 60, text: '60' },
    { value: 70, text: '70' },
    { value: 80, text: '80' },
  ];

  const brandId = useId();
  const rentalPriceId = useId();
  const MileageId = useId();

  const onSubmit = (values) => {
    const params = {
      brand: values.brand,
      rentalPrice: values.rentalPrice,
      minMileage: values.minMileage,
      maxMileage: values.maxMileage,
      page: 1,
      limit: 12,
    };

    updateFilters(params, setSearchParams, dispatch);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 204,
      border: 'none',
      borderRadius: '12px',
      boxShadow: 'none',
      fontFamily: 'Manrope',

      '&:hover': {
        borderColor: '#aaa',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: 16,
      color: '#8D929A',
      fontFamily: 'Manrope',
      fontWeight: 500,

      backgroundColor: state.isSelected ? '#007bff' : 'white',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#8D929A', // Цвет шрифта плейсхолдера
      fontSize: '12px',
      fontFamily: 'Manrope',
    }),
    indicatorSeparator: () => null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className={css.filterCatalog}>
            <div className={css.FormFilter}>
              <label className={css.labelSelect} htmlFor={brandId}>
                Car brand
              </label>

              <Select
                className={css.select}
                id={brandId}
                name="brand"
                options={[
                  { value: null, label: 'None' }, // Add the "None" option
                  ...listBrand.map((item) => ({
                    value: item,
                    label: item,
                  })),
                ]}
                value={
                  values.brand
                    ? { value: values.brand, label: values.brand }
                    : null
                }
                onChange={(selectedOption) => {
                  setFieldValue(
                    'brand',
                    selectedOption ? selectedOption.value : '',
                  );
                }}
                styles={customStyles}
                placeholder="Choose a brand"
                components={{}}
              />
            </div>

            <div className={css.FormFilter}>
              <label className={css.labelSelect} htmlFor={rentalPriceId}>
                Price/ 1 hour
              </label>
              <Select
                className={css.select}
                id={rentalPriceId}
                name="rentalPrice"
                options={ChoosePrice.map((item) => ({
                  value: item.value,
                  label: item.text,
                }))}
                value={
                  values.rentalPrice
                    ? { value: values.rentalPrice, label: values.rentalPrice }
                    : null
                }
                onChange={(selectedOption) => {
                  setFieldValue(
                    'rentalPrice',
                    selectedOption ? selectedOption.value : '',
                  );
                }}
                styles={customStyles}
                placeholder="Choose a price"
                components={{ SingleValue }}
              />
            </div>

            <div className={css.inputBlock}>
              <div className={css.inputContainer}>
                <label className={css.labelInput} htmlFor={MileageId}>
                  Сar mileage / km
                </label>

                <div
                  className={css.inputContainerMinMileage}
                  data-placeholder="From"
                >
                  <Field
                    className={css.maxMil}
                    placeholder=" " // Пустой стандартный плейсхолдер
                    type="text"
                    name="minMileage"
                    id="minMileage"
                  />
                </div>
                <div>
                  <ErrorMessage
                    name="minMileage"
                    component="div"
                    className={css.error}
                  />
                </div>
              </div>

              <div className={css.inputContainer}>
                <label className={css.labelInput} htmlFor="maxMileage">
                  Сar mileage / km
                </label>
                <div
                  className={css.inputContainerMaxMileage}
                  data-placeholder="To"
                >
                  <Field
                    className={css.minMil}
                    placeholder=" " // Пустой стандартный плейсхолдер
                    type="text"
                    name="maxMileage"
                    id="maxMileage"
                  />
                </div>
                <div>
                  <ErrorMessage
                    name="maxMileage"
                    component="div"
                    className={css.error}
                  />
                </div>
              </div>
            </div>

            <button className={css.buttonSearch} type="submit">
              Search
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
