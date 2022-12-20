import React from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { resetPasswordEnhance } from "../../../services/redux/enhances";

// Types
import { ILocationType, TFormDataType } from "../../../services/types";

// Components
import AuthForm from "../../../components/Forms/Auth/AuthForm";

// Styles
import Styles from "./../auth.module.scss";

export const ResetPassword = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as ILocationType;

  const [failedMessage, setFailedMessage] = React.useState("");

  const [formData, setFormData] = React.useState<TFormDataType>([
    {
      type: "password",
      name: "password",
      placeholder: "Введите новый пароль",
      value: "",
    },
    {
      type: "text",
      name: "token",
      placeholder: "Введите код из письма",
      value: "",
    },
  ]);

  const from = location.state?.from?.pathname || "/";

  const dispatcherHelper = React.useCallback(
    // @ts-expect-error
    (dataFromForm) => {
      dispatch(resetPasswordEnhance(dataFromForm) as any)
        .then(() => {
          return navigate("/login", {
            state: {
              from: {
                pathname: "/forgot-password",
              },
            },
          });
        })
        .catch((error: any) => {
          setFailedMessage(error.message);
        });
    },
    [dispatch, navigate, setFailedMessage]
  );

  if (from !== "/forgot-password")
    return <Navigate to={"/forgot-password"} replace={true} />;

  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>Восстановление пароля</span>
        </div>

        <AuthForm
          dispatchCallbackFn={dispatcherHelper}
          formData={formData}
          setFormData={setFormData}
          failedMessage={failedMessage}
          textOnButton={"Сохранить"}
        />

        <div className={Styles.block__addInfo}>
          <span className={Styles.addInfo__text}>Вспомнили пароль?</span>
          <Link to="/login" className={Styles.addInfo__link}>
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
});
