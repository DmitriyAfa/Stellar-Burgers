import React from 'react';
import {Box, Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';
function AppHeader() {

  const AppHeaderButton = ({typeButton, children, text}) => {
    let typeOfButton = typeButton === 'active' ? '' : styles.inactive ;
    
    return(
    <>
      <button className={`${styles.button} text text_type_main-default mt-4 mb-4 pl-5 pr-5 pb-4 pt-4 ${typeOfButton}`}>
        <span className="mr-2">{children}</span> {text}
      </button>
    </>);
  }

  AppHeaderButton.propTypes = {
    typeButton: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired
  }

  const NavLink = () =>{
    
    return(
      <nav className={styles.nav}>
      <ul className=''>
        <li>
          <AppHeaderButton typeButton='active' text='Конструктор'>
            <BurgerIcon type="primary" />
          </AppHeaderButton>
        </li>
        <li>
        <AppHeaderButton typeButton='' text='Лента заказов'>
          <ListIcon type="secondary" />
        </AppHeaderButton>
        </li>
      </ul>
      </nav>
    );
  }


  return(
    <header className={`${styles.appHeader}`}>
      <NavLink />
      <Logo />
      <AppHeaderButton typeButton='' text='Личный кабинет'>
          <ProfileIcon type="secondary" />
        </AppHeaderButton>
    </header>
  );
}

export default AppHeader; 