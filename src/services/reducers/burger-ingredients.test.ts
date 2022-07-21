import {burgerIngredientsReducer, initialState} from './burger-ingredients';
import {DECREASE, GET_INGREDIENT, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, INCREASE, TBurgerIngredientsActions} from '../actions/burger-ingredients';
import { actionCreators } from "../actions/action-creators";
import {testIngredients, testIngredient, payloadId, testIngredientsQty, testOrderNumberSuccess} from '../../utils/mock-data';
import { IIngredient } from '../../utils/types/ingredient.types';
import { ADD_BUN, ADD_INGREDIENT, CLEAR_ORDER_DETAILS, CLOSE_MODAL_OF_ORDER_DETAILS, DELETE_INGREDIENT, DELETE_INGREDIENT_ACTION, GET_BUN_ID, GET_ID, GET_PRICE, MAKE_BUN_QTY_ZERO, OPEN_MODAL_OF_ORDER_DETAILS, SORT_CARD } from '../actions/burger-constructor';
import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';


describe('Тест редьюсера burgerIngredientsReducer', () => {
  it('Дожен вернуть начальное состояние', () => {
    expect(burgerIngredientsReducer(undefined, {} as TBurgerIngredientsActions)).toEqual(initialState);
  });
  it('Добавление ингредиентов', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        actionCreators.getIngredientsSuccess(testIngredients)
      )
    ).toEqual({
      ...initialState,
      ingredients: testIngredients.map((ingredient: IIngredient) => {
        return {
          ingredient: ingredient,
          qty: 0,
        };
      }),
    });
  });
  it('Получение ингредиента (используется для модального окна)', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: GET_INGREDIENT,
          payload: testIngredient,
        })).toEqual({
      ...initialState,
      currentIngredient: testIngredient,
    });
  });
  it('Увеличение счетчика ингрединта', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: INCREASE,
          payload: payloadId,
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: initialState.ingredients.map((ingredient: {qty: number, ingredient:IIngredient}) => {
        if (ingredient.ingredient._id === payloadId) {
          ingredient.qty = ++ingredient.qty;
        }
        return ingredient;
      }),
    });
  });
  it('Уменьшение счетчика ингрединта', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: DECREASE,
          payload: payloadId,
        })
    ).toEqual({
      ...initialState,
      ingredients: initialState.ingredients.map((ingredient: {qty: number, ingredient:IIngredient}) => {
        if (ingredient.ingredient._id === payloadId) {
          ingredient.qty = --ingredient.qty;
        }
        return ingredient;
      }),
    });
  });
  it('Запрост на сервер', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: GET_INGREDIENTS_REQUEST,
        })
    ).toEqual({
      ...initialState,
      ingredientsFailed: false,
      ingredientsRequest: true,
    });
  });
  it('Запрос на сервер проавлен', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: GET_INGREDIENTS_FAILED,
        })
    ).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false,
    });
  });
  it('Очистка деталей для компонента OrderDetails', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: CLEAR_ORDER_DETAILS,
        })
    ).toEqual({
      ...initialState,
      ingredients: initialState.ingredients.map((ingredient: {qty: number, ingredient: IIngredient}) => {
        return {
          ingredient: ingredient.ingredient,
          qty: 0,
        };
      }),
      bun: {
        _id: 'null',
        name: "Выберите булку",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 0.001,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
      },
      order: {
        //!!! поменял с ingredients: false на  ingredients: [] 
        ingredients: [],
        number: null,
      },
      constructorIngredients: [],
      price: 0,
    });
  });
  it('Сортировка ингредиентов BurgerConstructor', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: SORT_CARD,
          payload: testIngredientsQty
        })
    ).toEqual({
      ...initialState,
      constructorIngredients: testIngredientsQty,
    });
  });
  it('Номер орера получен (используется при получении номера заказа)', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        actionCreators.getOrderNumberSuccess(testOrderNumberSuccess))
    ).toEqual({
      ...initialState,
      order: {
        // ingredients ожидает []  т.к. в редьюсере с данным экшеном идет обращение текущему состоянию (state) state.order.ingredients, а текщее состояние initialState - это как раз []. 
        ingredients: [],
        number: testOrderNumberSuccess.order.number
      },
    });
  });
  it('Удалить ингредиент (используется в BurgerConstructor)', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: DELETE_INGREDIENT,
          payload: payloadId
        })
    ).toEqual({
      ...initialState,
      deleteConstructorIngredients: initialState.constructorIngredients.map(
        (ingredient: IIngredient, i: string) => {
          const ind = initialState.constructorIngredients.findIndex(
            (ingredient: {ingr:IIngredient}) => ingredient.ingr._id === payloadId
          );
          if (i !== ind) {
            return ingredient;
          }
        }
      ),
    });
  });
  it('Фильтр undefined ингредиентов)', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: DELETE_INGREDIENT_ACTION,
        })
    ).toEqual({
      ...initialState,
      constructorIngredients: initialState.deleteConstructorIngredients.filter(
        (ingredient: IIngredient) => ingredient !== undefined
      ),
    });
  });
  it('Открытие модального окна и (необязательно) добавление ингредиента)', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: OPEN_MODAL,
          payload: testIngredient
        })
    ).toEqual({
      ...initialState,
      currentIngredient: testIngredient
    });
  });
  it('Закрытие модального окна', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: CLOSE_MODAL
        })
    ).toEqual({
      ...initialState,
      currentIngredient: false
    });
  });
  it('Добавить булку', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: ADD_BUN,
          ingredient: testIngredient
        })
    ).toEqual({
      ...initialState,
      bun: testIngredient
    });
  });
  it('Добавить ингредиент (BurgerConstructor)', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: ADD_INGREDIENT,
          ingredient: testIngredient,
          payload: '1234uuid'
        })
    ).toEqual({
      ...initialState,
      constructorIngredients: [
        ...initialState.constructorIngredients,
        { ingr: testIngredient, id: '1234uuid' },
      ],
    });
  });
  it('Обнулить счётчик для булок', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: MAKE_BUN_QTY_ZERO,
        })
    ).toEqual({
      ...initialState,
      ingredients: initialState.ingredients.map((ingredient: {qty: number, ingredient: IIngredient}) => {
        if (ingredient.ingredient.type === "bun") {
          return {
            ingredient: ingredient.ingredient,
            qty: 0,
          };
        }
        return ingredient;
      }),
    });
  });
  it('Получить ID', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: GET_ID,
        })
    ).toEqual({
      ...initialState,
      order: {
        ingredients: initialState.constructorIngredients
        .map((ingredient: IIngredient) => ingredient._id)
        .concat(initialState!.bunId!._id)
        .concat(initialState!.bunId!._id),
        number: null
      }
    });
  });
  it('Получить ID булки', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: GET_BUN_ID,
        })
    ).toEqual({
      ...initialState,
      bunId: initialState.bun,
    });
  });
  it('Получить цену', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: GET_PRICE,
        })
    ).toEqual({
      ...initialState,
      price: initialState.bun
          ? initialState.constructorIngredients.reduce(
              (prev: number, next:{ingr: IIngredient}) => prev + next.ingr.price,
              0
            ) +
            initialState.bun.price * 2
          : initialState.constructorIngredients.reduce(
              (prev: number, next:{ingr: IIngredient}) => prev + next.ingr.price,
              0
            ),
    });
  });
  it('Открыть модальное окно с деталями ордера', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: OPEN_MODAL_OF_ORDER_DETAILS,
        })
    ).toEqual({
      ...initialState,
      orderDetailsIsActive: true,
    });
  });
  it('Закрыть модальное окно с деталями ордера', () => {
    expect(
      burgerIngredientsReducer(
        initialState,
        {
          type: CLOSE_MODAL_OF_ORDER_DETAILS,
        })
    ).toEqual({
      ...initialState,
      orderDetailsIsActive: false,
    });
  });
});
