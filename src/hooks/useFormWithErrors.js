import { useState, useEffect, useCallback } from 'react';
import * as yup from 'yup';

export const useFormWithErrors = (
  schema,
  initialValues,
  initialFormErrors = undefined,
  initialDisabled = true
) => {
  if (!initialFormErrors) {
    initialFormErrors = initialValues;
  }

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);
  // const [disabled, setDisabled] = useState(initialDisabled);
  let disabled = initialDisabled;

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const onChange = (name, value) => {
    setFormErrors(name, value);
    setValues({ ...values, [name]: value });
  };

  const resetValues = () => {
    setValues(initialValues);
    setErrors(initialFormErrors || initialValues);
    // setDisabled(true);
    disabled = initialDisabled;
  };

  useEffect(() => {
    // schema.isValid(values).then(valid => setDisabled(!valid));
    schema.isValid(values).then(valid => (disabled = !valid));
    console.log(schema, values);
  }, [schema, values]);

  return {
    values,
    errors,
    disabled,
    onChange,
    resetValues,
  };
};
