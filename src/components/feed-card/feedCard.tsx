import { useEffect, useMemo, FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feedCard.module.css";

import { useLocation, useHistory, useRouteMatch } from "react-router";
import { useActions } from "../../utils/useAction";
import { IOrder } from "../../services/reducers/feed";
import { useTypedSelector } from "../../utils/useTypedSelector";
import { getStatus } from "../../utils/getStatus";
import {getDate} from '../../utils/getDate';
import { IIngr } from "../../utils/types/ingredient.types";
import { TStateBurgerIngredients } from "../../services/reducers/burger-ingredients";

const FeedCard: FC<{order: IOrder}> = ({ order }) => {
  const location = useLocation();
  const history = useHistory();
  const {openModal, getFeedDetails} = useActions();
  // Что бы узнать на какой мы именно странице воспользуемся
  // хуком useRouteMatch который сопоставляет текущий URL с заданным аргументом который является путём для проверки
  // если совпадают вернет объект в котором есть ключ isExact значение которого true, если совпал весь адрес (без завершающих символов)
  // если не совпадают вернет null
  const isProfileOrders = useRouteMatch('/profile/orders');
  const isOrderPage = isProfileOrders && isProfileOrders.isExact;
  const { ingredients }  = useTypedSelector(
    (state) => state.burgerIngredients
  );
    // console.log(ingredients)
  // # Создадим карточку с заказом
  
  // Получим картинки путем сравнения id ингредиентов из ордера с id ингредиентов из состояния burgerIngredients
  const getImages = (id: string): string | undefined => {
    let ingr = ingredients.find((i: IIngr) => i.ingredient._id === id);
    if (ingr) {
      return ingr.ingredient.image;
    }
  };

  // Вычислим цену
  const price = useMemo((): number => {
    let allPrice = 0;
    if (ingredients.length === 0) {
      return 0;
    }
    order.ingredients.forEach((id: string) => {
      let price: number;
      if (ingredients && ingredients.length > 0) {
        // !!!! в дальрнейшем можно поменять структуру ingredients, заменив qty на __V ?
        const ingr = ingredients.find((ingredient: IIngr) => ingredient.ingredient._id === id)
        price = ingr !== undefined ? ingr!.ingredient.price : 0;

        if (price) {
          allPrice += price;
        }
      }
    });
    return allPrice;
  }, [ingredients]);

  //  Создадим карточку с заказом # выполнено

  // # Взаимодействие с feed-details и модальным окном
  // !!! Похоже нужно будет создать новое моадльное окно т.к проблемы с передачей данных в header

  //По клику на карточку с ордером
  const onClickOrder = (): void => {
    if (order && order.ingredients.length > 0) {
      // получим ордер в redux и откроем modaльное окно
      getFeedDetails(order);
      openModal();

      // если текущий адрес /profile/orders присвоим pathname ...
      const path = isOrderPage
        ? `/profile/orders/${order._id}`
        : `/feed/${order._id}`;

      // добавим в историю соответсвующий адрес с id из ордера
      // в state.background добавим локацию с которой произошел переход
      history.push({
        pathname: path,
        state: { background: location},
      });
    }
  };


  if (!ingredients.length) {
    return null;
  }
  
  return (
    <div
      className={`p-6 mr-2 mb-4 ${styles.card}`}
      onClick={onClickOrder}
    >
      <div className={`${styles.top} mb-6`}>
        <div className={`${styles.number} 'text text_type_digits-default`}>
          {`#${order.number}`}
        </div>
        <div className={`${styles.date} 'text text_color_inactive`}>
          {getDate(order.createdAt)}
        </div>
      </div>
      <div
        className={`${styles.feedItemName} text text_type_main-medium ${isOrderPage ? 'mb-2' : 'mb-6'}`}
      >
        {order.name}
      </div>
      {isOrderPage ? (
        <p className={`text text_type_main-default mb-6 ${styles.status} ${
            order.status === 'done' ? styles.done : ''
          }`}
        >
          {getStatus(order.status)}
        </p>
      ) : null}

      <div className={styles.bottom}>
        <div className={`${styles.ingredients} pr-6`}>
          {order.ingredients &&
            order.ingredients.map((ingredient: string, index: number) =>
              index <= 5 ? (
                <div
                  className={styles.ingredient}
                  key={`ingredients${ingredient}_${index}`}
                >
                  <img src={getImages(ingredient)} alt="" />
                  {order.ingredients.length > 6 && index === 5 ? (
                    <div
                      className={ `${styles.count} 'text text_type_digits-default text_type_main-medium`}
                    >
                      +{order.ingredients.length - 6}
                    </div>
                  ) : null}
                </div>
              ) : null
            )}
        </div>
        <div className={styles.price}>
          {ingredients ? (
            <span className="text text_type_main-medium">{price}</span>
          ) : null}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
