// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//types
import { IReduxStore__Adaptive } from "../../types";

const initialState: IReduxStore__Adaptive = {
  currentComponent: 'nonAdaptive',
}
const adaptiveSlice = createSlice({
  name: 'adaptive',
  initialState,
  reducers: {
    setCurrentComponent: (state, action: PayloadAction<'nonAdaptive' | 'BurgerIngredients' | 'BurgerConstructor' | "FeedOrders" | "FeedStatistic">) => {
      state.currentComponent = action.payload
    },
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = adaptiveSlice

// Extract and export each action creator by name
export const {
  setCurrentComponent,
} = actions;
// Export the reducer, either as a default or named export
export default reducer