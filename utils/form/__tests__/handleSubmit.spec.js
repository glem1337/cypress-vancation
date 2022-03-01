import { handleSubmit, handleSubmitWithProps } from '../handleSubmit';

describe('handleSubmit()', () => {
  const values = { value1: 'value1' };
  const props = { onSubmit: jest.fn() };
  const formikContext = {
    props,
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setStatus: jest.fn(),
    resetForm: jest.fn(),
    setValues: jest.fn(),
  };

  beforeEach(() => handleSubmit(values, formikContext));

  it('calls onSubmit from props and passes it values and Formik methods', () => {
    expect(props.onSubmit).toHaveBeenCalledWith(
      values,
      formikContext.setErrors,
      formikContext.setSubmitting,
      formikContext.setStatus,
      formikContext.resetForm,
      formikContext.setValues,
    );
  });
});

describe('handleSubmitWithProps()', () => {
  const values = { value1: 'value1' };
  const props = { onSubmit: jest.fn(), token: 'token' };
  const formikContext = {
    props,
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setStatus: jest.fn(),
    resetForm: jest.fn(),
    setValues: jest.fn(),
  };

  beforeEach(() => handleSubmitWithProps(['token'])(values, formikContext));

  it('calls onSubmit from props and passes it values, Formik methods and given props', () => {
    expect(props.onSubmit).toHaveBeenLastCalledWith(
      values,
      formikContext.setErrors,
      formikContext.setSubmitting,
      formikContext.setStatus,
      formikContext.resetForm,
      formikContext.setValues,
      { token: props.token },
    );
  });
});
