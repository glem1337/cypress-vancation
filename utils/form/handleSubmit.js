import { pick } from 'ramda';

export const handleSubmit = (values, {
  props, setErrors, setSubmitting, setStatus, resetForm, setValues,
}) => {
  props.onSubmit(values, setErrors, setSubmitting, setStatus, resetForm, setValues);
};

export const handleSubmitWithProps = (keys = []) => (values, {
  props, setErrors, setSubmitting, setStatus, resetForm, setValues,
}) => {
  props.onSubmit(
    values,
    setErrors,
    setSubmitting,
    setStatus,
    resetForm,
    setValues,
    pick(keys, props),
  );
};
