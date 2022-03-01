const defineCustomComponent = (
  Component, additionalProps = {},
) => (props) => <Component {...props} {...additionalProps} />;

export default defineCustomComponent;
