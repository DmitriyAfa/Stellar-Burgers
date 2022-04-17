import React from 'react';
import {Box, Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingridients.scss';
import Tabs from './parts/tabs';
import Modal from '../modal/modal';
import Ingridient from './parts/ingridient';



function BurgerIngridients(props) {

  const {api} = props;

  const bun = api.filter(ingridient => ingridient.type === "bun");
  const sauce = api.filter(ingridient => ingridient.type === "sauce");
  const main = api.filter(ingridient => ingridient.type === "main");

  return(
    <section className="burger-ingridients mt-10"> 
    <h2 className='text text_type_main-large'>Соберите бургер</h2>
    <Tabs />
    {/* <Ingridient head='Булки' ingridientsFromBurgerIngridients={bun} />
    <Ingridient head='Соусы' ingridientsFromBurgerIngridients={sauce} /> */}
    <Ingridient head='Ингридиенты' ingridientsFromBurgerIngridients={main} />
    </section>
  );
}

export default BurgerIngridients; 


