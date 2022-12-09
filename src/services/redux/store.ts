import logger from 'redux-logger'
// Redux
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../middlewares/socketMiddleware';


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat([socketMiddleware()]),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});
