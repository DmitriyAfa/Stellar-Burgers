import { useState, useEffect } from "react";
import { useHistory, useLocation, Link, Redirect } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useActions } from "../../utils/useAction";

function ResetPassword() {
  const history = useHistory();
  const { resetPassword, getUser } = useActions();
  const location = useLocation();

  let background = (location.state && location.state.from) || location;

  const [form, setValue] = useState({ password: "", token: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(form);

    if (res) {
      history.push("/login", { from: location });
    }
  };

  if (background.pathname !== "/forgot-password") {
    return <Redirect to={"/profile"} />;
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
              <Button onClick={submit} type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </form>
          <div className={`${styles.button} text text_type_main-default mt-20`}>
            Восстановили пароль?
            <Link to="/login" className={styles.link}>
              войти
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
