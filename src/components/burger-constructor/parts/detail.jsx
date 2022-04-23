import React, {useState} from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter, DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../burger-constructor.module.css';
import ingridientPropTypes from '../../../utils/constants';

 function MakeDetail ({ingridient}) {

   return(
    <li key={ingridient._id} className='ml-4 mr-6 mb-4'>
    <DragIcon type="primary" />
    <ConstructorElement
      text={ingridient.name}
      price={ingridient.price}
      thumbnail={ingridient.image}
    />
  </li>
  );
 }

   MakeDetail.propTypes = {
    ingridient: ingridientPropTypes.isRequired
  }


function Detail({ingridients}){

  const ingridientsWithoutBun = [];

  ingridients.map(ingridient => {
    if (ingridient.type !== "bun") {
      ingridientsWithoutBun.push(ingridient)
    }
  })

  const arr = ingridientsWithoutBun.map((ingridientsWithoutBun) => {
    return(
      <MakeDetail key={ingridientsWithoutBun._id} ingridient={ingridientsWithoutBun} />
    );
  })

  return(
    <ul className={styles.scrollBar}>
        {arr}
    </ul>
  );
}

Detail.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
}

export default Detail;