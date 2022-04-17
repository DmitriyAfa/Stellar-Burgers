import React from 'react';
import PropTypes from 'prop-types';
import {CurrencyIcon, Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-constructor.scss';


function BurgerConstructor(props) {
  const {api} = props;
  
  return(
    <section className='burger-constructor'>
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
            <ul className='burger-constructor__scroll-bar'>
              <li>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                />
              </li>
              <li className='mt-4'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                />
              </li>
              <li className='mt-4'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                />
              </li>
              <li className='mt-4'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                />
              </li>
              <li className='mt-4'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                />
              </li>
              <li className='mt-4'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                />
              </li>
              <li className='mt-4'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                />
              </li>
            </ul>
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
      <span className='mt-10 burger-constructor__bottom'>
        <span className='mr-10'>
          <p className='text text_type_digits-medium'>610</p>
          <CurrencyIcon type="primary" />
        </span>
        <span className='burger-constructor__bottom-button'><Button type="primary" size="small">
        Оформить заказ
      </Button></span>
      </span>
    </section>
  );

}

BurgerConstructor.propTypes = {
  api: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BurgerConstructor; 


