export const validationSchema = (wrapper) => {
  if ('validationSchema' in wrapper.props()) {
    return wrapper.props().validationSchema();
  }

  return validationSchema(wrapper.dive());
};

const describeValidationSchema = wrapper => (
  validationSchema(wrapper).describe()
);

export default describeValidationSchema;
