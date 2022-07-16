import React, { useState } from "react";
import { useHistory, useLocation, Link, Redirect } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useActions } from "../../utils/useAction";
import { ILocation, ILocationState } from "../../utils/types/location.types";
import {IResetPasswordForm} from './types';

function ResetPassword() {
  const history = useHistory();
  const { resetPassword } = useActions();
  const location: ILocation  = useLocation();


  let background: ILocationState | ILocation  = (location.state && location.state.from) || location;


  const [form, setValue] = useState<IResetPasswordForm>({ password: "", token: "" });

  const onChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res: Function = await resetPassword(form);

    if (res) {
      history.push("/login", { from: location });
    }
  };

  if (background.pathname !== "/forgot-password") {
    return <Redirect to={"/profile"} />;
  }
  return (
    <>
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
