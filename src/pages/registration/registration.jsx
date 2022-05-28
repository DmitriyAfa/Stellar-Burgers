import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registration } from "../../services/actions/registration";

function RegistrationPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  let auth = useAuth();

  const { state } = useLocation();

  const registr = useSelector((state) => state.burgerIngredients.registration);

  const [form, setValue] = useState({ name: "", email: "", password: "" });

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

  const goRegistration = () => {
    dispatch(registration(form));
  };

  if (registr.success) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  if (auth.user) {
    return <Redirect to={{ pathname: state?.from || "/" }} />;
  }
  return (
    <>
      <AppHeader constructor="" lenta="" profile="active" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <form className={styles.form}>
            <p className={`${styles.title} text text_type_main-medium`}>
              Регистрация
            </p>
            <div className={` mt-6`}>
              <Input
                placeholder="Имя"
                value={form.name}
                name="name"
                size="default"
                onChange={onChange}
              />
            </div>
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
          </form>
          <div className={`${styles.button} mt-6`}>
            <Button onClick={goRegistration} type="primary" size="medium">
              Зарегестрироваться
            </Button>
          </div>
          <form>
            <div
              className={`${styles.button} text text_type_main-default mt-20`}
            >
              Уже зарегестрированы?
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

export default RegistrationPage;
