import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import PasswordInputFieldComponent from './component';

class PasswordInputField extends React.Component {
  renderVisibilityIcon = (visible) => (
    visible
      ? <span><span className="icon icon-eye-crossed" /></span>
      : <span><span className="icon icon-eye" /></span>
  )

  handleChange = (e) => {
    const { field: { name }, form: { setFieldValue } } = this.props;

    setFieldValue(name, e.target.value.trim());
  }

  render = () => (
    <PasswordInputFieldComponent
      {...this.props}
      renderVisibilityIcon={this.renderVisibilityIcon}
      handleChange={this.handleChange}
    />
  );
}

PasswordInputField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

export { PasswordInputField as PasswordInputFieldContainer };
export default injectIntl(PasswordInputField);
