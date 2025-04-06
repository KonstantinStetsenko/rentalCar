import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/conteiner/Conteiner.jsx';
import SendForm from '../components/SendForm/SendForm.jsx';
import { fetchCarGalleryById } from '../services/car-API.js';
import css from './CarDetailsPage.module.css';

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    async function getCar() {
      const data = await fetchCarGalleryById(id);

      setCar(data);
    }
    getCar();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Container>
        <div className={css.carDetails}>
          <div>
            <img className={css.carImg} src={car.img} alt={car.brand} />
            <div>
              <SendForm />
            </div>
          </div>

          <div>
            <div>
              <div className={css.carDetailsHeader}>
                <h2 className={css.carName}>
                  {car.brand} {car.model}, {car.year}
                </h2>
                <p className={css.carId}>Id: {car.id.slice(0, 4)}</p>
              </div>
              <div className={css.carDetailsLocation}>
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
                <p className={css.carLocationText}>
                  {`Mileage: ${new Intl.NumberFormat('fr-FR').format(car.mileage)}\u00A0km`}
                </p>
              </div>
              <p className={css.rentalPrice}>${car.rentalPrice} </p>
            </div>
            <p className={css.descriptionText}>{car.description}</p>

            <div className={css.carRentalList}>
              <h3 className={css.titleList}>Rental Conditions: </h3>
              <ul className={css.carList}>
                {car.rentalConditions.map((item, index) => (
                  <li className={css.descriptionText} key={index}>
                    <svg className={`${css.icon} ${css.iconCar}`}>
                      <use xlinkHref="/symbol-defs.svg#icon-point"></use>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.carSpecificationsList}>
              <h3 className={css.titleList}>Car Specifications:</h3>
              <ul className={css.carList}>
                <li className={css.descriptionText}>
                  <svg className={`${css.icon} ${css.iconCar}`}>
                    <use xlinkHref="/symbol-defs.svg#icon-yar"></use>
                  </svg>
                  Year: {car.year}
                </li>
                <li className={css.descriptionText}>
                  <svg className={`${css.icon} ${css.iconCar}`}>
                    <use xlinkHref="/symbol-defs.svg#icon-car"></use>
                  </svg>
                  Type: {car.type}
                </li>
                <li className={css.descriptionText}>
                  <svg className={`${css.icon} ${css.iconCar}`}>
                    <use xlinkHref="/symbol-defs.svg#icon-Flue"></use>
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.descriptionText}>
                  <svg className={`${css.icon} ${css.iconCar}`}>
                    <use xlinkHref="/symbol-defs.svg#icon-Engine"></use>
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>
            <div className={css.carAccessoriesList}>
              <h3 className={css.titleList}>
                Accessories and functionalities:
              </h3>

              <ul className={css.carList}>
                {car.functionalities.map((item, index) => (
                  <li className={css.descriptionText} key={index}>
                    <svg className={`${css.icon} ${css.iconCar}`}>
                      <use xlinkHref="/symbol-defs.svg#icon-point"></use>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
