import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "../../styles/styles.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useActions } from "../../utils/useAction";

function RegistrationPage() {
  const { registration } = useActions();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await registration(form);
    if (res) {
      setIsLoading(false);
    }
  };

  console.log();

  if (localStorage.getItem("accessToken")) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <>
      <AppHeader constructor="" lenta="" profile="active" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <form onSubmit={submit} className={styles.form}>
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
            <div className={`${styles.button} mt-6`}>
              {isLoading ? (
                "Ожидание ответа сервера"
              ) : (
                <Button type="primary" size="medium">
                  Зарегестрироваться
                </Button>
              )}
            </div>
          </form>
          <div className={`${styles.button} text text_type_main-default mt-20`}>
            Уже зарегестрированы?
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistrationPage;
