import React, { useEffect, useState } from "react";
import './App.scss';
import {Box, Logo, BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/app-header/app-header';
import BurgerIngridients from './components/burger-ingredients/burger-ingridients';
import Modal from './components/modal/modal';
function App() {
  return (
    <>
    <AppHeader />
    <main className='app-main'>
    <BurgerIngridients />
    </main>
    </>
  );
}

export default App;
