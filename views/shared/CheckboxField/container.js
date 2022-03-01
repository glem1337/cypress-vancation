import React from 'react';

import PropTypes from 'prop-types';
import CheckboxFieldComponent from './component';

class CheckboxField extends React.PureComponent {
  static propTypes = {
    field: PropTypes.shape().isRequired,
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleChange = (e) => {
    const {
      field: { name },
      form: { setFieldValue },
    } = this.props;

    setFieldValue(name, e.target.value);
  };

  render = () => (
    <CheckboxFieldComponent {...this.props} handleChange={this.handleChange} />
  );
}

export default CheckboxField;
