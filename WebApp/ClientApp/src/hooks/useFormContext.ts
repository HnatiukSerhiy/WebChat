import { type ChangeEvent, type FocusEvent, useState, useMemo } from 'react';

export type Rule = 'email' | 'required';

export type FormValues = Record<string, string | number>;

export type ValidationRules = Record<string, Rule[]>;

export type FormErrors = Record<string, boolean>;

export type FormElement = HTMLInputElement | HTMLTextAreaElement;

export type FormContext<TValues extends FormValues> = {
  values: TValues;
  isFormValid: boolean;
  errors: FormErrors;
  onValueChange: (event: ChangeEvent<FormElement>) => void;
  onBlur: (event: FocusEvent<FormElement>) => void;
};

const useFormContext = <TValues extends FormValues>(validationRules?: ValidationRules): FormContext<TValues> => {
  const [values, setValues] = useState<TValues>({} as TValues);
  const [isFormValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const onValueChange = (event: ChangeEvent<FormElement>) => {
    const { name: key, value } = event.target;
    setValues(state => ({ ...state, [key]: value }));
  };

  const onBlur = (event: FocusEvent<FormElement>) => {
    const { name: key, value } = event.target;

    const isValueValid = validateFormValue(key, value, validationRules);
    setErrors(state => ({ ...state, [key]: !isValueValid }));
  };

  useMemo(() => {
    const formValid = Object.keys(errors).length > 0 && !Object.values(errors).some(error => error);
    setFormValid(formValid);
  }, [errors]);

  return {
    values,
    errors,
    isFormValid,
    onValueChange,
    onBlur,
  };
};

export default useFormContext;

const validateFormValue = <TValue>(key: string, value: TValue, validationRules?: ValidationRules): boolean => {
  if (!validationRules || Object.keys(validationRules).length === 0)
    return true;

  const validRules = [];
  const rules = validationRules[key];

  for (const rule of rules) {
    switch (rule) {
      case 'email':
        validRules.push(validateEmail(value as string));
        break;
      case 'required':
        validRules.push(validateRequired(value));
        break;
      default:
        validRules.push(false);
        break;
    }
  }

  return !validRules.some(rule => !rule);
};

const validateEmail = (email: string) => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

const validateRequired = <TValue>(value: TValue) => {
  if (isString(value))
    return value !== undefined && value !== null && value !== '';

  return value !== undefined && value !== null;
};

const isString = <TValue>(value: TValue) => typeof value === 'string';
