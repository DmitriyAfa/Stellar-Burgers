import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../services/auth";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styles from "../../styles/profile.module.css";
import "../../styles/styles.css"; // Для стилизации компонентов из Яндекс библиотеки приходится использовать не моудльные стили, иначе стилизация не работает.
import AppHeader from "../../components/app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  authUser,
  updateAuthorization,
  refreshTokenFunc,
  logout,
} from "../../services/actions/profile";

function ProfilePage() {
  const history = useHistory();
  const auth = useAuth();

  const goToOrders = useCallback(() => {
    history.replace({ pathname: "/profile/orders" });
  }, [history]);
  // const goToId = useCallback(() => {
  //   history.replace({ pathname: "/profile/orders/:id" });
  // }, [history]);

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

  const update = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const data = await updateAuthorization(
      form.email,
      form.name,
      accessToken
    ).then((data) => data);

    if (data.success) {
      setValue({ ...form, name: data.user.name, email: data.user.email });
    } else {
      const refreshToken = localStorage.getItem("refreshToken");
      const tokens = await refreshTokenFunc(refreshToken);
      if (tokens.success) {
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }
    }
  };

  const out = async (e) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem("refreshToken");
    const data = await auth.signOut(refreshToken).then((data) => data);
    if (data) {
      setValue({ ...form, name: "", email: "" });
    }
  };

  return (
    <>
      <AppHeader constructor="" lenta="" profile="active" />
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={`${styles.button} ${styles.buttonActive}`}>
            <Button
              // onClick={goToForgotPassword}
              type="secondary"
              size="small"
            >
              Профиль
            </Button>
          </div>
          <div className={styles.button}>
            <Button onClick={goToOrders} type="secondary" size="small">
              История заказов
            </Button>
          </div>
          <div className={styles.button}>
            <Button onClick={out} type="secondary" size="small">
              Выход
            </Button>
          </div>
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
            <span className={styles.color}>
              <Button
                // onClick={goToForgotPassword}

                type="secondary"
                size="medium"
              >
                Отмена
              </Button>
            </span>
            <Button onClick={update} type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
