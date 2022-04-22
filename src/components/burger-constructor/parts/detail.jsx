import React, {useState} from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter, DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import '../burger-constructor.scss';
import IngridientDetails from "../../ingridient-details/ingridient-details";
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
  const arr = ingridients.map((ingridients) => {
    return(
      <MakeDetail key={ingridients._id} ingridient={ingridients} />
    );
  })

  return(
    <ul className='burger-constructor__scroll-bar'>
        {arr}
    </ul>
  );
}

Detail.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
}

export default Detail;