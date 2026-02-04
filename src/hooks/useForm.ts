import { useState, type ChangeEvent } from 'react';

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => ValidationErrors<T>
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    const finalValue = type === 'checkbox' ?
      (e.target as HTMLInputElement).checked : value;

    const newValues = { ...values, [name]:finalValue };

    setValues(newValues);

    if (touched[name as keyof T]) {
      const validationErrors = validate(newValues);
      setErrors(validationErrors);
    }
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  const handleSubmit = async ( onSubmit: (value: T) => void | Promise<void>) => {
    // 1. Mark all fields as touched to show validation errors
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>)

    setTouched(allTouched)

    // 2. Validate everything
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // 3. If no errors, submit
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }

  return {
    values,
    setValues,
    errors,
    touched,
    isSubmitting,
    isValid: Object.keys(errors).length === 0,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  }
}