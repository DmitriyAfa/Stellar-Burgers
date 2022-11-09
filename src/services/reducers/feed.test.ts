import { FeedReducer, initialState } from "./feed";
import { EwsActions, TwsActions } from "../actions/feed";
import {actionCreators} from '../actions/action-creators';
import { mockOrder, mockwsMessageGet } from "../../utils/mock-data";


describe("Тест редьюсера FeedReducer", () => {
  it("Дожен вернуть начальное состояние", () => {
    expect(FeedReducer(initialState, {} as TwsActions)).toEqual(initialState);
  });
  it('Cоединение с сокетом есть', () => {
    expect(
      FeedReducer(initialState, actionCreators.wsConnectionSuccess())
    ).toEqual({
      ...initialState,
      isConnected: true,
    });
  });
  it('Автоматическое получение данных методом "ping-pong" ', () => {
    expect(
      FeedReducer(initialState, actionCreators.wsGetMessage(mockwsMessageGet))
    ).toEqual({
      ...initialState,
      orders: mockwsMessageGet.orders,
      total: mockwsMessageGet.total,
      totalToday: mockwsMessageGet.totalToday,
    });
  });
  it('Закрытие соединения с сокетом', () => {
    expect(
      FeedReducer(initialState, actionCreators.wsConnectionClosed())
    ).toEqual({
      ...initialState,
      isConnected: false,
    });
  });
  it('Остановка socket-соединения', () => {
    expect(FeedReducer(initialState, actionCreators.wsConnectionStop())).toEqual(
      {
        ...initialState,
      }
    );
  });
  it('Получить детали заказа (для модального окна)', () => {
    expect(FeedReducer(initialState, {
      type: EwsActions.GET_FEED_DETAILS,
      payload: mockOrder,
    })).toEqual(
      {
        ...initialState,
        feedDetails: mockOrder
      }
    );
  });
  
});
