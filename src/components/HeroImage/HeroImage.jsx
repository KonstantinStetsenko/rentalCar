import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroImage.module.css';

function HeroImage() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('handleClick called');
    navigate('/catalog');
  };

  return (
    <div className={styles.myDiv}>
      <div className={styles.titleContainer}>
        <h1 className={styles.h1}>Find your perfect rental car</h1>
        <h2 className={styles.h2}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <button onClick={handleClick} className={styles.btn}>
          View Catalog
        </button>
      </div>
    </div>
  );
}

export default HeroImage;
