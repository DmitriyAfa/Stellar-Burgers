// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//types
import { IReduxStore__Feed, TOrders } from '../../types';

const initialState: IReduxStore__Feed = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  request: {
    pending: false,
    success: false,
    failed: false
  }
}
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnectionStart: (state, payload: PayloadAction<string>) => {
      return;
    },
    wsConnectionSuccess: (state) => {
      state.request = {
        pending: false,
        success: true,
        failed: false
      }
    },
    wsConnectionStop: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: false
      }
    },
    wsConnectionError: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: true
      }
    },
    wsConnectionGetMessage: (state, message: PayloadAction<{
      orders: TOrders,
      success: boolean,
      total: number,
      totalToday: number,
    }>) => {
      const { payload } = message;
      state.feed = {
        // Ограничение заказов до 25 позиций
        orders: payload.orders.splice(0, 25),
        total: payload.total,
        totalToday: payload.totalToday
      }
    },
    wsConnectionClosed: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: false
      }
    },
    // payload с типом any сделан так как на данный момент не известно какого вида сообщения будем передавать
    // приложение не передает сообщение 
    wsConnectionSendMessage: (state, payload: any) => {
      return;
    }
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = feedSlice

// Extract and export each action creator by name
export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionStop,
  wsConnectionError,
  wsConnectionGetMessage,
  wsConnectionClosed,
  wsConnectionSendMessage
} = actions;
// Export the reducer, either as a default or named export
export default reducer