import React from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

// Redux
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { ingredientsIncreaseCounter } from "../../../../services/redux/slicers/appSlice";
import { removeClickedIngredient } from "../../../../services/redux/slicers/appSlice";

// Ya imports
import {
  Counter,
  CurrencyIcon,
  InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// Components
import Menu from "./Menu/Menu";
import DraggableIngredient from "./DraggableIngredient";

import Modal from "../../../Modals/Modal";
import IngredientDetails from "../../../Modals/IngredientDetails/IngredientDetails";

// Types
import { IIngredientType, IReduxStore } from "../../../../services/types";

// Helpers
import LazyLoadPicture from "../../../LazyLoad";

// Styles
import Styles from "./burgerIngredients.module.scss";

const MENU_ITEMS: { text: string; id: string; uuid: string }[] = [
  {
    text: "Булки",
    id: "bun",
    uuid: uuidv4(),
  },
  {
    text: "Соусы",
    id: "sauce",
    uuid: uuidv4(),
  },
  {
    text: "Начинки",
    id: "main",
    uuid: uuidv4(),
  },
];

const BurgerIngredients: React.FunctionComponent = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { ingredients, order } = useSelector(
    (store: IReduxStore) => store.app,
    shallowEqual
  );
  const { id } = useParams<"id">();

  const menuRef = React.useRef<{ handleScrollOfContent: () => void }>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentSectionsRef = React.useRef<HTMLDivElement[]>(
    new Array(MENU_ITEMS.length)
  );

  React.useEffect(() => {
    if (!order.orderId || !contentRef.current) return;

    contentRef.current.scrollTo(0, 0);
  }, [contentRef, order.orderId]);

  const handleIncreaseCounter: (e: React.MouseEvent<HTMLElement>) => void =
    React.useCallback(
      (e) => {
        const target: HTMLElement = e.currentTarget!,
          target__id: string = target.getAttribute("data-id")!;

        const selectedIngredient: IIngredientType = ingredients.data
          .filter(
            (ingredient: IIngredientType) => ingredient._id === target__id
          )
          .shift()!;

        dispatch(ingredientsIncreaseCounter(selectedIngredient));
      },
      [ingredients.data, dispatch]
    );

  const showIngredientDetails: (e: React.MouseEvent<HTMLElement>) => void =
    React.useCallback(
      (e) => {
        e.stopPropagation();

        const target__id = e.currentTarget!.getAttribute("data-id")!;

        navigate(`/ingredients/${target__id}`, {
          state: {
            backgroundLocation: location.pathname,
          },
        });
      },
      [navigate]
    );

  const closeIngredientDetails: () => void = React.useCallback(() => {
    dispatch(removeClickedIngredient());
    navigate(`/`, { replace: true });
  }, [dispatch, navigate]);

  return (
    <div className={Styles.burgerIngredients}>
      <Menu
        menuItems={MENU_ITEMS!}
        scollableContainerRef={contentRef}
        contentContainersRef={contentSectionsRef}
        ref={menuRef}
      />

      <section
        className={
          Styles.burgerIngredients__content +
          " " +
          (!ingredients || !ingredients.request.success
            ? Styles.burgerIngredients__content_loading
            : "")
        }
        onScroll={() => menuRef.current!.handleScrollOfContent()}
        ref={contentRef}
      >
        {MENU_ITEMS.map(
          (
            MENU_ITEM: { id: string; text: string; uuid: string },
            MENU_ITEM_INDEX: number
          ) => {
            return (
              <div
                key={MENU_ITEM.uuid}
                className={Styles.content__section}
                ref={(ref) =>
                  (contentSectionsRef.current[MENU_ITEM_INDEX] = ref!)
                }
                id={MENU_ITEM.id}
              >
                <h2 className={Styles.section__title}>{MENU_ITEM.text}</h2>

                <ul className={Styles.section__items}>
                  {ingredients.data &&
                    ingredients.data.length > 0 &&
                    ingredients.data
                      .filter(
                        (ingredient: IIngredientType) =>
                          ingredient.type === MENU_ITEM.id
                      )
                      .map(
                        (ingredient: IIngredientType, item__index: number) => {
                          return (
                            <DraggableIngredient
                              key={ingredient.uuid}
                              ingredientData={ingredient}
                              className={Styles.items__item}
                              onClick={handleIncreaseCounter}
                            >
                              <div className={Styles.item__image}>
                                <LazyLoadPicture
                                  imageMobile={ingredient.image_mobile}
                                  imageLarge={ingredient.image_large}
                                  image={ingredient.image}
                                  width={240}
                                  height={120}
                                  alt={ingredient.name}
                                />
                              </div>
                              <div className={Styles.item__info}>
                                <span className={Styles.info__price}>
                                  {ingredient.price.toLocaleString()}
                                </span>
                                <div className={Styles.info__icon}>
                                  <CurrencyIcon type="primary" />
                                </div>
                              </div>
                              <div className={Styles.item__title}>
                                <h3 className={Styles.title__text}>
                                  {ingredient.name}
                                </h3>
                              </div>
                              <div
                                className={Styles.item__more}
                                data-id={ingredient._id}
                                onClick={showIngredientDetails}
                                title="Узнать состав 👀"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#000000"
                                  viewBox="0 0 24 24"
                                  width="24px"
                                  height="24px"
                                >
                                  <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z" />
                                </svg>
                              </div>

                              {ingredient.__v > 0 && (
                                <div className={Styles.item__counter}>
                                  <Counter
                                    count={ingredient.__v}
                                    size={
                                      ingredient.__v.toString().length === 1
                                        ? "default"
                                        : "small"
                                    }
                                  />
                                </div>
                              )}
                            </DraggableIngredient>
                          );
                        }
                      )}
                </ul>
              </div>
            );
          }
        )}
      </section>

      {id && (
        <Modal closeModalCallback={closeIngredientDetails}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
});

export default BurgerIngredients;
