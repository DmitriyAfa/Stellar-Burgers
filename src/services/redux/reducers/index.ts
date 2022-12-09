// Redux
import { combineReducers } from '@reduxjs/toolkit';

// Slicers
import appReducer from '../slicers/appSlice';
import userReducer from '../slicers/userSlice';
import adaptiveReducer from '../slicers/adaptiveSlice';
import feedReducer from '../slicers/feedSlice';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  adaptive: adaptiveReducer,
  feed: feedReducer,
});

export type RootState = ReturnType<typeof rootReducer>