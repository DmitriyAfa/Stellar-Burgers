import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styles from "./profile.module.css";
import "../../styles/styles.css"; // Для стилизации компонентов из Яндекс библиотеки приходится использовать не моудльные стили, иначе стилизация не работает.
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useActions } from "../../utils/useAction";

function ProfilePage() {
  const history = useHistory();
  const { user } = useSelector((state: any) => state.user);
  console.log(history);
  const { getUser, changeAuthUser, logout } = useActions();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const onChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const logOut = async () => {
    const res: any = await logout();
    if (res) {
      history.push("/login");
    }
  };

  const getUserFunc = async () => {
    const res: any = await getUser();
    console.log(res);
    if (res.success) {
      setValue({ ...form, name: res.user.name, email: res.user.email });
    }
  };

  useEffect(() => {
    getUserFunc();
  }, []);

  const backForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setValue({ ...form, name: user.name, email: user.email, password: "" });
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res: any = await changeAuthUser(form);
    if (res) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.left}>
          <Link
            to="/login"
            className={`${styles.link} ${styles.button} ${styles.linkActive}`}
          >
            войти
          </Link>
          <Link
            to="/profile/orders"
            className={`${styles.link} ${styles.button}`}
          >
            История заказов
          </Link>
          <Button onClick={logOut} type="secondary" size="large">
            Выход
          </Button>
          <div className={`text ${styles.leftBottom} text_type_main-default`}>
            В этом разделе вы можете <br /> изменить свои персональные данные
          </div>
        </div>
        <div className={styles.right}>
          <form className={styles.form}>
            <div>
              <Input
                placeholder="Имя"
                value={form.name}
                name="name"
                size="default"
                onChange={onChange}
                icon="EditIcon"
              />
            </div>
            <div className={` mt-6`}>
              <Input
                placeholder="E-mail"
                value={form.email}
                name="email"
                size="default"
                onChange={onChange}
                icon="EditIcon"
              />
            </div>
            <div className={` mt-6`}>
              <Input
                placeholder="Пароль"
                value={form.password}
                name={"password"}
                size="default"
                onChange={onChange}
                icon="EditIcon"
              />
            </div>
          </form>
          <div className={`${styles.rightBottom} mt-6`}>
            {isLoading ? (
              "Ожидание ответа сервера"
            ) : (
              <>
                <span className={styles.color}>
                  <Button onClick={backForm} type="secondary" size="medium">
                    Отмена
                  </Button>
                </span>
                <Button onClick={submit} type="primary" size="medium">
                  Сохранить
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
