// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//types
import { IReduxStore__Adaptive } from "../../types";

const initialState: IReduxStore__Adaptive =  {
  innerWidth: 0,
  currentComponent: 'nonAdaptive',
}
const adaptiveSlice = createSlice({
  name: 'adaptive',
  initialState,
  reducers:{
    setInnerWidth: (state, action: PayloadAction<number>) => {
      state.innerWidth = action.payload
    },
    setCurrentComponent: (state, action: PayloadAction< 'nonAdaptive' | 'BurgerIngredients' | 'BurgerConstructor'>) => {
      state.currentComponent = action.payload
    },
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = adaptiveSlice

// Extract and export each action creator by name
export const {
  setCurrentComponent,
  setInnerWidth
} = actions;
// Export the reducer, either as a default or named export
export default reducer