import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import Container from '../conteiner/Conteiner.jsx';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <div className={clsx(css.header)}>
      <Container>
        <div className={css.header_item}>
          <NavLink to="/">
            <svg className={`${css.icon} ${css.iconCar}`}>
              <use xlinkHref="/symbol-defs.svg#icon-Logo"></use>
            </svg>
          </NavLink>
          <nav className={css.nav}>
            <NavLink className={buildLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={buildLinkClass} to="/catalog">
              Catalog
            </NavLink>
          </nav>
        </div>
      </Container>
    </div>
  );
}
