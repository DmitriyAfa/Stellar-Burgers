import { useState, useCallback, useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../services/auth";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { savePassword } from "../../services/actions/reset-password";
//У компонента PasswordInput остутствует placeholder, поэтому выбран input с типом "password"

function ResetPassword() {
  const history = useHistory();
  const dispatch = useDispatch();

  let auth = useAuth();
  const { state } = useLocation();

  const answer = useSelector(
    (state) => state.burgerIngredients.isCreatePassword
  );

  const [form, setValue] = useState({ password: "", token: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const req = async () => {
    await auth.getUser().then(async (res) => {
      const data = await res;
      if (data.success) {
        setValue({ ...form, name: data.user.name, email: data.user.email });
      }
    });
  };

  useEffect(() => {
    req();
  }, []);

  const goToLogin = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const savePass = () => {
    dispatch(savePassword(form));
  };
  console.log(answer);
  // {success: true, message: "Password successfully reset"}

  if (auth.user) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={{ pathname: state?.from || "/" }}
      />
    );
  }

  return (
    <>
      <AppHeader constructor="" lenta="" profile="active" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <form className={styles.form}>
            <p className={`${styles.title} text text_type_main-medium`}>
              Восстановление пароля
            </p>
            <div className={` mt-6`}>
              <Input
                placeholder="Введите новый пароль"
                type="password"
                value={form.password}
                name="password"
                size="default"
                onChange={onChange}
              />
            </div>
            <div className={` mt-6`}>
              <Input
                placeholder="Введите код из письма"
                value={form.token}
                name="token"
                size="default"
                onChange={onChange}
              />
            </div>
            <div className={`${styles.button} mt-6`}>
              <Button onClick={savePass} type="primary" size="medium">
                Сохранить
              </Button>
            </div>
            <div
              className={`${styles.button} text text_type_main-default mt-20`}
            >
              Восстановили пароль?
              <Button onClick={goToLogin} type="secondary" size="medium">
                Войти
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
