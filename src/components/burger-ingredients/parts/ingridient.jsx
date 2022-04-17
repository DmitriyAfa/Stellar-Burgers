import React, { useEffect, useState } from "react";
import {Box, Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import '../burger-ingridients.scss';
import Tabs from './tabs';
import Modal from '../../modal/modal';

class Ingridient extends React.Component{
  constructor(props){
    super(props);
    
  }

  setModalActive = () =>{
    console.log('hi')
    this.setState({modalActive: false})
  }

  componentDidMount() {
    console.log(1)
  }
    

render(){
  
  const {head, ingridientsFromBurgerIngridients} = this.props;

  class MakeIngridients extends React.Component{
    constructor(props){
      super(props);

      this.state={
        modalActive: false
      }
    }

    setModalActiveTrue = () =>{
      this.setState({modalActive: true})
    }
    setModalActiveFalse = () =>{
      this.setState({modalActive: false})
    }

    render(){
      const {ingridientFromIngridient} = this.props;

      return(
              <li key={ingridientFromIngridient._id} className='ml-4 mr-6'>
              <Modal active={this.state.modalActive}
               setActive={this.setModalActiveFalse}
                name={ingridientFromIngridient.name}
                image={ingridientFromIngridient.image}
                proteins={ingridientFromIngridient.proteins} 
                fat={ingridientFromIngridient.fat}
                carbohydrates={ingridientFromIngridient.carbohydrates}
                calories={ingridientFromIngridient.calories}
                 />
              <Counter count={1} size="default" />
              <img onClick={this.setModalActiveTrue} className='mr-4 ml-4 burger-ingridients__main-img' src={ingridientFromIngridient.image} alt={ingridientFromIngridient.name} />
              <span className='mt-1' style={{flexDirection: 'row'}}><h3 className="text text_type_digits-default">{ingridientFromIngridient.price}</h3> <span style={{marginLeft: '10px'}}><CurrencyIcon type="primary" /></span></span>
              <h4 className='mt-2 text text_type_main-default'>{ingridientFromIngridient.name}</h4>
            </li>
          );
    }
  }

  const arr = ingridientsFromBurgerIngridients.map((ingridientsFromBurgerIngridients) => {
    return(
      <MakeIngridients key={ingridientsFromBurgerIngridients._id} ingridientFromIngridient={ingridientsFromBurgerIngridients} />
    );
  })

  

  return(
    <div className='burger-ingridients__main'>
      <h3 className='text text_type_main-medium mt-10'>{head}</h3>
      <ul className='mt-6'>
        {arr}
      </ul>
    </div>
  );
  }
}

export default Ingridient;