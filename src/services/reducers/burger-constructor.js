import { initialState } from "./burger-ingredients";
import { ADD_BUN, ADD_INGREDIENT } from "../actions/burger-constructor";

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: state.ingredients.map((ingredient) =>
          ingredient._id === action.id
            ? [...state.constructorIngredients, ingredient]
            : [...state.constructorIngredients]
        ),
      };
    }
    default: {
      return state;
    }
  }
};
