import { userReducer, initialState, } from "./user";
import { GET_USER, RESET_FORGOT_PASSWORD, RESET_ISLOGGEDIN, RESET_PASSWORD, RESET_USER, TUserActions } from "../actions/user";


// describe(name, fn) группирует связанные по логике тесты в один блок
describe("Тест редьюсера UserReducer", () => {
  // it - это alias от test(name, fn, timeout)  timeout - необязательный, по умолчанию составляет 5 секунд
  it("Дожен вернуть начальное состояние", () => {
    // expect(value) - используется для проверки значения используется вместе с f-ей-проверкой ля утверждения чего-либо о значении. Аргументом для функции expect должно быть значение, которое возвращает ваш код, а в функцию проверки необходимо передавать ожидаемое верное значение.
    // .toEqual(value) - используется для рекурсивного сравнения всех свойств экземпляров объектов
    expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
  });
  it("Восстановление забытого пароля", () => {
    // передадим в expect функцию userReducer с начальным состоянием в первом аргументом и функцией которая вернет экшен с типом и payload (в диспатче)
    expect(
      userReducer(
        initialState, 
        {
          type: RESET_FORGOT_PASSWORD,
          payload:  { success: true, message: "Reset email sent"}
        })
      // а далее проверяем как отреагировало хранилище
    ).toEqual({
      ...initialState,
      passwordReset:  { success: true, message: "Reset email sent"},
    });
  });
  it('Восстановить пароль', () => {
    expect(userReducer(
        initialState,
        {
          type: RESET_PASSWORD,
          payload: { success: true, message: "Reset email sent"},
        })
        ).toEqual({
      ...initialState,
      passwordReset: { success: true, message: "Reset email sent"},
    });
  });
  it('Получить пользователя / зарегестрироваться', () => {
    expect(userReducer(
        initialState,
        {
          type: GET_USER,
          payload: {
              success: true,
              user: {
                  email: "email",
                  name: "name"
              },
              accessToken: 'Bearer ...',
              refreshToken: "dasd123123"
            } 
        })
        ).toEqual({
      ...initialState,
      user: {
        success: true,
        user: {
            email: "email",
            name: "name"
        },
        accessToken: 'Bearer ...',
        refreshToken: "dasd123123"
      },
    });
  });
  it('Выйти из аккаунта', () => {
    expect(userReducer(
        initialState,
        {
          type: RESET_USER,
        })
        ).toEqual({
      ...initialState,
      user: null,
    });
  });
  it('Сменить isLoggedIn', () => {
    expect(userReducer(
        initialState,
        {
          type: RESET_ISLOGGEDIN,
        })
        ).toEqual({
      ...initialState,
      isLoggedIn: true,
    });
  });
});
