import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ILocationType } from '../../../../services/types';

// Ya components
import { MenuIcon, CloseIcon, ProfileIcon, ArrowUpIcon, ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from "./MobileHeader.module.scss";

export const MobileHeader: React.FunctionComponent = React.memo(() =>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIisProfileOpen] = useState(false);

  const location = useLocation() as ILocationType;
  
  const accessToken = true;
console.log(isMenuOpen)
  return(
    <header className={styles.MobileHeaderContainer + ' ' + (isMenuOpen ? styles.MobileHeaderContainer_opened : '')}>
      <div className={styles.header}>
        {isMenuOpen ? (
            <h2 className={styles.header__title}>Меню</h2>
          ) : (
            <div className={styles.header__logo}>
              <img src={require('../../../../assets/images/logo.png')}></img>
            </div>
          )}
        <span onClick={() =>setIsMenuOpen(!isMenuOpen)} className={styles.header__menu}>
          {isMenuOpen ? (
            <CloseIcon type="primary" />
          ) : (
            <MenuIcon type="primary" />
          )}
        </span>
      </div>
      <nav className={styles.nav}>
        {isMenuOpen ? (
          <div className={styles.profile}>
            <div className={styles.profile__container}>
              <div className={styles.content}>
                <ProfileIcon type="primary"/>
                <span className={styles.text}>
                  {
                  accessToken ? "Личный кабинет" : "Войти в аккаунт"
                  }
                </span>
              </div>
              <span onClick={() =>setIisProfileOpen(!isProfileOpen)}>
                {isProfileOpen ? (
                  <ArrowUpIcon type="primary" />
                ): (
                  <ArrowDownIcon type="primary" />
                )}
              </span>    
           </div>
          {isProfileOpen ? (
            <ul className={styles.items}>
              <li className={styles.item}>
                <Link
                  to='/'
                  state={{from: {pathname: location.pathname}}}
                  className={styles.item__link + " text_color_inactive" }
                >
                  Профиль
                </Link>
              </li>
              <li className={styles.item}>
                <Link
                  to='/'
                  state={{from: {pathname: location.pathname}}}
                  className={styles.item__link + " text_color_inactive" }
                >
                  История заказов
                </Link>
              </li>
              <li className={styles.item}>
                <Link
                  to='/'
                  state={{from: {pathname: location.pathname}}}
                  className={styles.item__link + " text_color_inactive" }
                >
                  Выход
                </Link>
              </li>
            </ul>
            ): null}
            
            
          <ul className={styles.links}>
          <li className={styles.content}>
          <ProfileIcon type="primary"/>
          <span className={`${styles.text} text_color_inactive`}>
            Конструктор бургеров
          </span>
        </li>
        <li className={styles.content}>
          <ProfileIcon type="primary"/>
          <span className={`${styles.text} text_color_inactive`}>
            Лента заказов
          </span>
        </li>
       </ul>
       </div>
      ): null}
      </nav>
    </header>
  )
})
