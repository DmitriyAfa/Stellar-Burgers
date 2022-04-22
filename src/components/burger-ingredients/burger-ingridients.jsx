import React from 'react';
import PropTypes from 'prop-types';
import '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingridients.scss';
import Tabs from './parts/tabs';
import Ingridient from './parts/ingridient';
import ingridientPropTypes from '../../utils/constants';


function BurgerIngridients(props) {

  const {ingridients} = props;

  const bun = ingridients.filter(ingridient => ingridient.type === "bun");
  const sauce = ingridients.filter(ingridient => ingridient.type === "sauce");
  const main = ingridients.filter(ingridient => ingridient.type === "main");

  return(
    <section className="burger-ingridients mt-10"> 
    <h2 className='text text_type_main-large'>Соберите бургер</h2>
    <Tabs />
    <div className='burger-ingridients__scrollbar'>
      <Ingridient head='Булки' ingridients={bun} />
      <Ingridient head='Соусы' ingridients={sauce} />
      <Ingridient head='Ингридиенты' ingridients={main} />
    </div>
    </section>
  );
}

BurgerIngridients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
};

export default BurgerIngridients; 


