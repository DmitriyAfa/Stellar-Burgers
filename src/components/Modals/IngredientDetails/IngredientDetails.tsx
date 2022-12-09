import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

// Redux
import {
  setClickedIngredient,
} from './../../../services/redux/slicers/appSlice';

// Components
import Modal from './../Modal';

// Types
import { IIngredientType, ILocationType, IReduxStore } from './../../../services/types/';

// Helpers
import LazyLoadPicture from './../../LazyLoad/';

// Styles
import Styles from './ingredientDetails.module.scss';



const nutritionalValues = [
  {
    name: "Калории,ккал",
    id: "calories"
  },
  {
    name: "Белки, г",
    id: "proteins"
  },
  {
    name: "Жиры, г",
    id: "fat"
  },
  {
    name: "Углеводы, г",
    id: "carbohydrates"
  },
];


const IngredientDetails: React.FunctionComponent = React.memo(() => {

    const location = useLocation() as ILocationType;
    const state = location.state as { backgroundLocation?: Location };

    const ingredients = useSelector( (store : IReduxStore) => store.app.ingredients.data, shallowEqual);

    const [selectedIngredient, setSelectedIngredient] = React.useState<IIngredientType | null>(null)
    const { id } = useParams<"id">();



    React.useEffect(() => {
      const neededIngredient = ingredients.filter( (ingredient : IIngredientType) => ingredient._id === id ).shift()!;
      
      if(!neededIngredient) return;
      setSelectedIngredient( neededIngredient )
    }, [ingredients, id]);



  return (
    selectedIngredient &&
    <div className={
      Styles.ingredientDetails + ' ' +
      ( state?.backgroundLocation ? '' : Styles.ingredientDetails_self)
    }>
      <section className={Styles.ingredientDetails__title}>
        <span> 
          Детали ингредиента
        </span>
      </section>
      <section className={Styles.ingredientDetails__content}>
        <div className={Styles.content__image}>
          <LazyLoadPicture 
            image={selectedIngredient.image_large}
            width={480} height={240}
            alt={selectedIngredient.name} 
          />
        </div>
        <div className={Styles.content__name}>
          <span>
            {selectedIngredient.name}
          </span>
        </div>
        <div className={Styles.content__details}>
          {
            nutritionalValues.map( (nutritionalValue: {name: string, id: string}) => {
              return (
                <div key={nutritionalValue.id} className={Styles.details__detail}>
                  <span className={Styles.detail__name}>
                    {nutritionalValue.name}
                  </span>
                  <span className={Styles.detail__prop}>
                    {selectedIngredient[nutritionalValue.id as keyof IIngredientType]}
                  </span>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  )

});

export default IngredientDetails;