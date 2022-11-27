import React from "react";

// Redux
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { moveRequestToDefault } from "./../../../services/redux/slicers/userSlice";

// Ya imports
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

// Types
import {
  ILocationType,
  IReduxStore,
  TFormDataType,
  IInputDataType,
} from "./../../../services/types/";

// Helpers
import { useFormAndValidation } from "./../../../services/hooks/useFormAndValidation";

// Styles
import Styles from "./editForm.module.scss";

interface IEditFormComponent {
  dispatchCallbackFn: (dataFromForm: {
    name?: string;
    email?: string;
    password?: string;
  }) => void;
  formData: TFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<TFormDataType>>;
  defaultValueForPassword: string;
}

const EditForm: React.FunctionComponent<IEditFormComponent> = React.memo(
  ({ dispatchCallbackFn, formData, setFormData, defaultValueForPassword }) => {
    const dispatch = useDispatch();

    const user = useSelector((store: IReduxStore) => store.user, shallowEqual);
    const { request } = user;

    const { handleChange, isFailed, setIsFailed } = useFormAndValidation(
      formData,
      setFormData
    );

    const [inputsSuccessChanging, setInputsSuccessChanging] = React.useState<
      boolean[]
    >([false, false, false]);
    const [inputsCanBeChanged, setInputsCanBeChanged] = React.useState<
      boolean[]
    >([false, false, false]);

    const [dataChanged, setDataChanged] = React.useState<boolean>(false);

    const inputsRef = React.useRef<HTMLInputElement[]>([]);

    React.useEffect(() => {
      if (!inputsRef.current || inputsRef.current.length === 0) return;

      [...inputsRef.current].forEach((child) =>
        child.setAttribute("required", "true")
      );
      inputsRef.current[0].focus();

      return () => {
        dispatch(moveRequestToDefault());
        setIsFailed(false);
      };
    }, [inputsRef, dispatch, setIsFailed]);

    React.useEffect(() => {
      if (!request.failed || !inputsRef.current) return setIsFailed(false);

      setIsFailed(true);
      inputsRef.current[0].focus();
    }, [request.failed, inputsRef, setIsFailed]);

    /* 
    Проверяем обновились какие-то данные в инпутах:
      если обновились – отображаем контролы для сохранения/сброса изменений
      если нет – не отображаем :)
  */
    React.useEffect(() => {
      setDataChanged(
        formData.filter((editInput) => {
          return editInput.name === "password"
            ? editInput.value.length !== 0
              ? editInput.value !== defaultValueForPassword
              : false
            : editInput.value !== user.data[editInput.name as "name" | "email"];
        }).length > 0
      );
    }, [user.data, defaultValueForPassword, formData, setDataChanged]);

    /* 
    Трекаем включение редактирования на инпуте пароля:
      если начали изменять – удаляем у него value;
      если отменили изменения – ставим дефолтное значение;
  */
    const changePasswordValueOnEdit = React.useCallback(
      (isCanBeChanged: boolean) => {
        const newDataState = [...formData],
          neededIndex = inputsCanBeChanged.length - 1;

        if (isCanBeChanged) {
          newDataState[neededIndex].value = "";
        } else {
          newDataState[neededIndex].value = defaultValueForPassword;
        }

        setFormData(newDataState);
      },
      [defaultValueForPassword, formData, setFormData, inputsCanBeChanged]
    );

    const movePasswordToDefaultState = React.useCallback(() => {
      const newState = [...formData].map((dataInput: IInputDataType) => {
        return dataInput.name !== "password"
          ? dataInput
          : { ...dataInput, value: defaultValueForPassword };
      });

      setFormData(newState);
      setInputsCanBeChanged([false, false, false]);
    }, [defaultValueForPassword, formData, setFormData, setInputsCanBeChanged]);

    const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void =
      React.useCallback(
        (e) => {
          e.preventDefault();
          if (request.pending) return;

          const dataFromForm = [...formData].reduce(
            (prevValue, dataInput: IInputDataType) => {
              return dataInput.name !== "password"
                ? dataInput.value ===
                  user.data[dataInput.name as "name" | "email"]
                  ? prevValue
                  : { ...prevValue, [dataInput.name]: dataInput.value }
                : dataInput.name === "password" &&
                  dataInput.value === defaultValueForPassword
                ? prevValue
                : { ...prevValue, [dataInput.name]: dataInput.value };
            },
            {}
          );

          let isChangegData = [false, false, false];

          for (let name in dataFromForm) {
            const selectedDataItem = [...formData].find(
              (dataInput: IInputDataType) => dataInput.name === name
            );

            if (!selectedDataItem) return;
            const selectedDataItem__index = [...formData].indexOf(
              selectedDataItem
            );
            if (selectedDataItem__index === -1) return;

            isChangegData[selectedDataItem__index] = true;
          }

          movePasswordToDefaultState();
          setInputsSuccessChanging(isChangegData);

          dispatchCallbackFn(dataFromForm);
        },
        [
          defaultValueForPassword,
          formData,
          dispatchCallbackFn,
          request.pending,
          movePasswordToDefaultState,
          user.data,
          setInputsSuccessChanging,
        ]
      );

    const handleReset: (e: React.FormEvent<HTMLFormElement>) => void =
      React.useCallback(
        (e) => {
          e.preventDefault();
          if (request.pending) return false;

          const newState = [...formData].map((dataInput: IInputDataType) => {
            return dataInput.name !== "password"
              ? {
                  ...dataInput,
                  value: user.data[dataInput.name as "name" | "email"] || "",
                }
              : { ...dataInput, value: defaultValueForPassword };
          });

          setFormData(newState);

          setInputsCanBeChanged([false, false, false]);
        },
        [
          defaultValueForPassword,
          formData,
          setFormData,
          request.pending,
          user.data,
          setInputsCanBeChanged,
        ]
      );

    return (
      <form
        className={
          Styles.formContainer +
          " " +
          (isFailed ? Styles.formContainer_failed : "")
        }
        onSubmit={handleSubmit}
        onReset={handleReset}
        style={{
          pointerEvents: request.pending ? "none" : "auto",
        }}
      >
        {formData.map((dataInput: IInputDataType, dataInputIndex: number) => (
          <label key={dataInput.name} className={Styles.formContainer__input}>
            {
              <Input
                type={dataInput.type}
                placeholder={dataInput.placeholder}
                onChange={handleChange}
                icon={
                  inputsCanBeChanged[dataInputIndex] ? "CloseIcon" : "EditIcon"
                }
                value={dataInput.value}
                name={dataInput.name}
                error={isFailed}
                onIconClick={
                  dataInputIndex !== formData.length - 1
                    ? () => {
                        let newState = [...inputsCanBeChanged];
                        newState.splice(
                          dataInputIndex,
                          1,
                          !inputsCanBeChanged[dataInputIndex]
                        );
                        setInputsCanBeChanged(newState);
                      }
                    : () => {
                        let newState = [...inputsCanBeChanged];
                        newState.splice(
                          dataInputIndex,
                          1,
                          !inputsCanBeChanged[dataInputIndex]
                        );
                        setInputsCanBeChanged(newState);

                        changePasswordValueOnEdit(
                          !inputsCanBeChanged[dataInputIndex]
                        );
                      }
                }
                disabled={!inputsCanBeChanged[dataInputIndex]}
                success={inputsSuccessChanging[dataInputIndex]}
                ref={(ref) => (inputsRef.current[dataInputIndex] = ref!)}
              />
            }
          </label>
        ))}

        {dataChanged && (
          <div className={Styles.formContainer__controls}>
            <button
              type="reset"
              className={
                Styles.controls__button + " " + Styles.controls__button_reset
              }
            >
              <span>Отмена</span>
            </button>
            {/* @ts-expect-error */}
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    );
  }
);

export default EditForm;
