import { useState, useCallback, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { Redirect, useLocation } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css"; // Для стилизации компонентов из Яндекс библиотеки приходится использовать не моудльные стили, иначе стилизация не работает.
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function LoginPage() {
  const history = useHistory();

  let auth = useAuth();
  // console.log(auth.user);

  const { state } = useLocation();

  const goToRegister = useCallback(() => {
    history.replace({ pathname: "/register" });
  }, [history]);
  const goToForgotPassword = useCallback(() => {
    history.replace({ pathname: "/forgot-password" });
  }, [history]);

  const [form, setValue] = useState({ email: "", password: "" });

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

  const login = useCallback(
    (e) => {
      e.preventDefault();
      auth.signin(form);
    },
    [auth, form]
  );

  console.log(auth.user);
  if (auth.user) {
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        // to={{ pathname: state?.from || "/" }}
        to={{ pathname: "/" }}
      />
    );
  }

  return (
    <>
      <AppHeader constructor="" lenta="" profile="active" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <form className={styles.form}>
            <p className={`${styles.title} text text_type_main-medium`}>Вход</p>
            <div className={` mt-6`}>
              <Input
                placeholder="E-mail"
                value={form.email}
                name="email"
                size="default"
                onChange={onChange}
              />
            </div>
            <div className={` mt-6`}>
              <PasswordInput
                value={form.password}
                name={"password"}
                size="default"
                onChange={onChange}
              />
            </div>
            <div className={`${styles.button} mt-6`}>
              <Button onClick={login} type="primary" size="medium">
                Войти
              </Button>
            </div>
            <div
              className={`${styles.button} text text_type_main-default mt-20`}
            >
              Вы - новый пользователь?
              <Button onClick={goToRegister} type="secondary" size="medium">
                Зарегестрироваться
              </Button>
            </div>
            <div
              className={`${styles.button} text text_type_main-default mt-4`}
            >
              Забыли пароль?
              <Button
                onClick={goToForgotPassword}
                type="secondary"
                size="medium"
              >
                Восстановить пароль
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
