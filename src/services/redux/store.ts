import logger from 'redux-logger'

// Redux
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});
