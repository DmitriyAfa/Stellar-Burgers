import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENT,
  OPEN_MODAL,
  CLOSE_MODAL,
  INCREASE,
  DECREASE,
} from "../actions/burger-ingredients";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  DELETE_INGREDIENT_ACTION,
  MAKE_BUN_QTY_ZERO,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ID,
  GET_BUN_ID,
  GET_PRICE,
  CLOSE_MODAL_OF_ORDER_DETAILS,
  OPEN_MODAL_OF_ORDER_DETAILS,
  SORT_CARD,
  CLEAR_ORDER_DETAILS,
} from "../actions/burger-constructor";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  ingredients: false,
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredient: false,

  bun: {
    _id: false,
    name: "Выберите булку",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 0.001,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  bunId: [],
  constructorIngredients: [],
  deleteConstructorIngredients: [],

  order: {
    ingredients: false,
    number: null,
  },
  price: 0,
  orderDetailsIsActive: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ORDER_DETAILS: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          return {
            ingredient: ingredient.ingredient,
            qty: 0,
          };
        }),
        bun: {
          _id: false,
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
          ingredients: false,
          number: null,
        },
        constructorIngredients: [],
        price: 0,
      };
    }
    case SORT_CARD: {
      return {
        ...state,
        constructorIngredients: action.payload,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients.map((ingredient) => {
          return {
            ingredient: ingredient,
            qty: 0,
          };
        }),
        ingredientsRequest: false,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        order: {
          ingredients: state.order.ingredients,
          number: action.number.order.number,
        },
      };
    }

    case INCREASE: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.ingredient._id === action.payload) {
            ingredient.qty = ++ingredient.qty;
          }
          return ingredient;
        }),
      };
    }
    case DECREASE: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.ingredient._id === action.payload) {
            ingredient.qty = --ingredient.qty;
          }
          return ingredient;
        }),
      };
    }
    case GET_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        deleteConstructorIngredients: state.constructorIngredients.map(
          (ingredient, i) => {
            const ind = state.constructorIngredients.findIndex(
              (ingredient) => ingredient.ingr._id === action.payload
            );
            if (i !== ind) {
              return ingredient;
            }
          }
        ),
      };
    }
    case DELETE_INGREDIENT_ACTION: {
      return {
        ...state,
        constructorIngredients: state.deleteConstructorIngredients.filter(
          (ingredient) => ingredient !== undefined
        ),
      };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        currentIngredient: false,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.ingredient,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          { ingr: action.ingredient, id: action.payload },
        ],
      };
    }
    case MAKE_BUN_QTY_ZERO: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.ingredient.type === "bun") {
            return {
              ingredient: ingredient.ingredient,
              qty: 0,
            };
          }
          return ingredient;
        }),
      };
    }
    case GET_ID: {
      return {
        ...state,
        order: {
          ingredients: state.constructorIngredients
            .map((ingredient) => ingredient._id)
            .concat(state.bunId._id)
            .concat(state.bunId._id),
          number: null,
        },
      };
    }
    case GET_BUN_ID: {
      return {
        ...state,
        bunId: state.bun,
      };
    }
    case GET_PRICE: {
      return {
        ...state,
        price: state.bun
          ? state.constructorIngredients.reduce(
              (prev, next) => prev + next.ingr.price,
              0
            ) +
            state.bun.price * 2
          : state.constructorIngredients.reduce(
              (prev, next) => prev + next.ingr.price,
              0
            ),
      };
    }
    case OPEN_MODAL_OF_ORDER_DETAILS: {
      return {
        ...state,
        orderDetailsIsActive: true,
      };
    }
    case CLOSE_MODAL_OF_ORDER_DETAILS: {
      return {
        ...state,
        orderDetailsIsActive: false,
      };
    }
    default: {
      return state;
    }
  }
};
