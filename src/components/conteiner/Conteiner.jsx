import styles from './Conteiner.module.css';

function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
