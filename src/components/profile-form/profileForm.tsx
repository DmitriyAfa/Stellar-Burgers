import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";

import { useActions } from "../../utils/useAction";
import { useTypedSelector } from "../../utils/useTypedSelector";
import styles from './profileForm.module.css';

export const ProfileForm = () => {
  const { user } = useTypedSelector((state) => state.user);
  const { getUser, changeAuthUser, logout } = useActions();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const onChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };
  const getUserFunc = async () => {
    const res: any = await getUser();
    if (res.success) {
      setValue({ ...form, name: res.user.name, email: res.user.email });
    }
  };

  useEffect(() => {
    getUserFunc();
  }, []);

  const backForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setValue({ ...form, name: user?.name, email: user!.email, password: "" });
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res: Function = await changeAuthUser(form);
    if (res) {
      setIsLoading(false);
    }
  };

  
  
  return(
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
  )
}