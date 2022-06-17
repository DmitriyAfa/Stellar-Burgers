import { useState } from "react";
import { useHistory, useLocation, Link, Redirect } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useActions } from "../../utils/useAction";

function ForgotPassword() {
  const history = useHistory();
  const { forgotPassword } = useActions();
  const location = useLocation();

  const [form, setValue] = useState<{[email: string]: string}>({ email: "" });

  const onChange = (e: any) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const res: any = await forgotPassword(form);

    if (res) {
      history.push("/reset-password", { from: location });
    }
  };

  if (localStorage.getItem("accessToken")) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <>
      <AppHeader constr="" lenta="" profile="active" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={submit}>
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
            <div className={`${styles.button} mt-6`}>
              <Button type="primary" size="medium">
                Восстановить
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

export default ForgotPassword;
