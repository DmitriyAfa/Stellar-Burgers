import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Detail from './parts/detail';
import {CurrencyIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import ingridientPropTypes from '../../utils/constants';

function BurgerConstructor(props) {
  const {ingridients} = props;

  const [modalActive, setModalActive] = useState(false);

  function setModalActiveTrue(){
    console.log('setModalActiveTrue')
    setModalActive(true);
  };

  function setModalActiveFalse(){
    console.log('setModalActiveFalse')
    setModalActive(false);
  };

  
  return(
    <section className={styles.burgerConstructor}>
      <ul className='mt-25 ml-4'>
        <li className='ml-8 mb-4'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
          </li>
          <li>
            <Detail ingridients={ingridients} />
          </li>
          <li className='ml-8 mt-4'>
          <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
      />
          </li>
      </ul>
      <span className={`mt-10 ${styles.bottom}`}>
        <span className='mr-10'>
          <p className='text text_type_digits-medium'>610</p>
          <CurrencyIcon type="primary" />
        </span>
        <span onClick={setModalActiveTrue} className={styles.bottomButton}><Button type="primary" size="small">
        Оформить заказ
      </Button></span>
      </span>
       <OrderDetails active={modalActive} setActive={setModalActiveFalse}/>
    </section>
  );

}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
};

export default BurgerConstructor; 

