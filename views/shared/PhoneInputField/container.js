import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import PhoneInputFieldComponent from './component';

class PhoneInputField extends React.Component {
  static propTypes = {
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
      setFieldTouched: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleBlur = () => {
    const { field: { name }, form: { setFieldTouched } } = this.props;
    setFieldTouched(name);
  }

  handleChange = (value) => {
    const { field: { name }, form: { setFieldValue } } = this.props;
    setFieldValue(name, value);
  }

  render = () => (
    <PhoneInputFieldComponent
      {...this.props}
      handleBlur={this.handleBlur}
      handleChange={this.handleChange}
    />
  );
}

export { PhoneInputField as PhoneInputFieldContainer };
export default injectIntl(PhoneInputField);
