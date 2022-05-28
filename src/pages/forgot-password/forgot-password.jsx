import { useState, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/actions/forgot-password-page";

function ForgotPassword() {
  const history = useHistory();
  const dispatch = useDispatch();

  let auth = useAuth();
  const { state } = useLocation();

  const answer = useSelector((state) => state.burgerIngredients.passwordReset);

  const [form, setValue] = useState({ email: "" });

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

  const postEmail = () => {
    dispatch(resetPassword(form.email));
  };
  console.log(answer);

  if (auth.user) {
    return <Redirect to={{ pathname: state?.from || "/" }} />;
  }

  if (answer.success && answer.message === "Reset email sent") {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
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
                placeholder="Укажите e-mail"
                type="email"
                value={form.email}
                name="email"
                size="default"
                onChange={onChange}
              />
            </div>
            <div onClick={postEmail} className={`${styles.button} mt-6`}>
              <Button type="primary" size="medium">
                Восстановить
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

export default ForgotPassword;
