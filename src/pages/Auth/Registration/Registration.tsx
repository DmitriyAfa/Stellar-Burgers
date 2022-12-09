import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { registerEnhance } from "../../../services/redux/enhances";

// Types
import { ILocationType, TFormDataType } from "../../../services/types";

// Components
import AuthForm from "../../../components/Forms/Auth/AuthForm";

// Styles
import Styles from "./../auth.module.scss";

export const Registration = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [failedMessage, setFailedMessage] = React.useState("");

  const [formData, setFormData] = React.useState<TFormDataType>([
    {
      type: "text",
      name: "name",
      placeholder: "Имя",
      value: "",
    },
    {
      type: "email",
      name: "email",
      placeholder: "E-mail",
      value: "",
    },
    {
      type: "password",
      name: "password",
      placeholder: "Пароль",
      value: "",
    },
  ]);

  const dispatcherHelper = React.useCallback(
    // @ts-expect-error
    (dataFromForm) => {
      dispatch(registerEnhance(dataFromForm) as any).catch((error: Error) =>
        setFailedMessage(error.message)
      );
    },
    [dispatch, setFailedMessage]
  );

  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>Регистрация</span>
        </div>

        <AuthForm
          dispatchCallbackFn={dispatcherHelper}
          formData={formData}
          setFormData={setFormData}
          failedMessage={failedMessage}
          textOnButton={"Зарегистрироваться"}
        />

        <div className={Styles.block__addInfo}>
          <span className={Styles.addInfo__text}>Уже зарегистрированы?</span>
          <Link to="/login" className={Styles.addInfo__link}>
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
});
