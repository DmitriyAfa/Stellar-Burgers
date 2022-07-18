import { useEffect, useMemo } from "react";
import styles from "./feed-details.module.css";
import { useTypedSelector } from "../../utils/useTypedSelector";
import {useParams, useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getStatus } from "../../utils/getStatus";
import { useActions } from "../../utils/useAction";
import { wsUrl } from "../../services/baseUrl";
import {getDate} from '../../utils/getDate';
import { IIngr } from "../../utils/types/ingredient.types";
import { TStateBurgerIngredients } from "../../services/reducers/burger-ingredients";

export const FeedDetails = () => {
  const {wsConnectionStart, wsConnectionStop} = useActions();
  const {id} = useParams<{id?: string}>();
  const {orders} = useTypedSelector((state) => state.feed)
  const {ingredients} = useTypedSelector((state) => state.burgerIngredients) 
  

  // открытие соединения сокетов при первом рендере страницы
  useEffect(() => {
    wsConnectionStart(wsUrl);
  }, []);

  // закрытие соединения сокетов при покидании страницы
  useEffect(() => {
    return () => {
      wsConnectionStop();
    }
  }, []);

  // На отдельной странице не отображался компонет т.к. при переходе на новую вкладку вручную state обновляется и нужно найти order по id текущей страници
  
  const order = useMemo(() => {

    if (orders.length > 0) {
      return orders.find((order) => id === order._id);
    }
  }, [orders]);


  const findIngredeints  = useMemo(() => {
    if(order && ingredients){
      // создадим массив на основе ингредиентов в ордере ( id) с помощью метода map создадим новый массив  в который отфильтруем ингредиенты из состояния ingredients
      const arr = order.ingredients.map((id: string) => {
        return ingredients.find((ingredient: IIngr) => id  === ingredient.ingredient._id)
      })

      // пройдемся по каждому эл-ту массива
      for(let i = 0; i < arr.length; i++){
        //если это последний элемент в списке добавим ему значение 1
        if(i === arr.length -1 ){
          arr[i]!.qty = 1;
        }
        // и сравним его с другими элементами
        for(let j = i + 1; j < arr.length; j++){
          // увеличи ингредиент на 1
          arr[i]!.qty = 1;
          // если в массиве уже есть ингредиент с подобным id, то увеличим qty
          if(arr[i]!.ingredient._id === arr[j]!.ingredient._id){
            arr[i]!.qty = arr[i]!.qty + 1;
            //  и удалим данный эл-т из массива
            arr.splice(j, 1)
          }
        }
      }
      return arr;
    }
  }, [order, ingredients]);

  const totalPrice = useMemo(() => {
    if (findIngredeints && findIngredeints.length) {
      return findIngredeints.reduce((agg , next) => {
       return agg += next!.qty * next!.ingredient.price
      }, 0)
    }
  }, [findIngredeints, ingredients]);

  if( order === undefined || !ingredients.length){
    return null;
  }

  return (
    <>
      <div className={`mb-15 ${styles.main}`}>
      <div className={styles.header}>
        <h4 className="mt-2 text text_type_main-medium">{order.name}</h4>
        <p
          className={` mb-15 text text_type_main-default ${styles.status}`}
        >
          {getStatus(order.status)}
        </p>
          <h5 className="text text_type_main-medium mb-6">Состав:</h5>
        </div>
        <div
          className={`mb-10 ${styles.scrollBar}`}
        >
          {findIngredeints &&
            findIngredeints.map((ingredient, index) => (
              <div
                className={`mb-4 ${styles.ingredientCard}`}
                key={`${index}_${ingredient!.ingredient._id}`}
              >
                  <img className={`${styles.img} mr-4`} src={ingredient!.ingredient.image_mobile} alt="" />
                <div className={`text text_type_main-default mr-6 ${styles.name}`}>
                  {ingredient!.ingredient.name}
                </div>
                <div
                  className={`${styles.price}`}
                >
                  <p className="mr-4 text text_type_digits-default">{`${ingredient!.qty} x ${ingredient!.ingredient.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
        </div>
        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            {getDate(order.createdAt)}
          </p>
          <div className={styles.cost}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}


