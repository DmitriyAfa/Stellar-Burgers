import { useState, useCallback } from "react";

import { TFormDataType } from "../types/";

const useFormAndValidation = (
  initValues?: any,
  initSetValues?: React.Dispatch<React.SetStateAction<TFormDataType>>
) => {
  const [values, setValues] = useState({});
  const [isFailed, setIsFailed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.currentTarget;
    const { name, value } = target;

    const newFormData = [...(initValues || values)].map((dataInput) => {
      return dataInput.name !== name
        ? dataInput
        : {
            ...dataInput,
            value: value,
          };
    });

    initSetValues ? initSetValues(newFormData) : setValues(newFormData);

    setIsFailed(false);
  };

  // !!!!!!!! Сменить newValues: any
  const resetForm = useCallback(
    (newValues: any = {}, newErrors = {}, newIsValid = false) => {
      initSetValues ? initSetValues(newValues) : setValues(newValues);

      setIsFailed(false);
    },
    [setValues, setIsFailed, initSetValues]
  );

  return { values, handleChange, isFailed, resetForm, setValues, setIsFailed };
};

export { useFormAndValidation };
