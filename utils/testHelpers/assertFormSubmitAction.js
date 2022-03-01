const assertFormSubmitAction = (action, type) => {
  const form = {
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setStatus: jest.fn(),
    resetForm: jest.fn(),
    setValues: jest.fn(),
  };
  const values = { formValue: 'mock' };
  const payload = { additional: 'data' };
  const expectedAction = {
    type,
    values,
    form,
    ...payload,
  };

  expect(action(values, ...Object.values(form), payload)).toEqual(expectedAction);
};

export default assertFormSubmitAction;
