import { injectIntl } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'ramda';

import InputFieldComponent from './component';

class InputField extends React.PureComponent {
  handleChange = (e) => {
    const { field: { name }, form: { setFieldValue }, onChangeHandler } = this.props;

    setFieldValue(name, e.target.value);

    if (onChangeHandler) {
      onChangeHandler(e);
    }
  }

  onBlurHandler = (event) => {
    const {
      field: { onBlur, name, value },
      form: { setFieldValue },
    } = this.props;

    if (/^\s*$/.test(value)) {
      setFieldValue(name, '');
    } else {
      const newValue = typeof value === 'string'
        ? value.trim()
        : value;

      setFieldValue(name, newValue);
    }

    onBlur(event);
  }

  render = () => {
    const props = omit(['onChangeHandler'], this.props);

    return (
      <InputFieldComponent
        {...props}
        handleChange={this.handleChange}
        onBlurHandler={this.onBlurHandler}
      />
    );
  }
}

InputField.defaultProps = {
  onChangeHandler: null,
};

InputField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  onChangeHandler: PropTypes.func,
};

export { InputField as InputFieldContainer };
export default injectIntl(InputField);
