import React from 'react';
import PropTypes from 'prop-types';

import SwitchFieldComponent from './component';

class SwitchField extends React.Component {
  static defaultProps = {
    onToggle: null,
  };

  static propTypes = {
    onToggle: PropTypes.func,
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleChange = (event) => {
    const {
      field: { name },
      form: { setFieldValue },
      onToggle,
    } = this.props;

    const isChecked = event?.target ? event.target.checked : event;

    if (onToggle) {
      onToggle(isChecked);
    }

    setFieldValue(name, isChecked);
  };

  render = () => (
    <SwitchFieldComponent {...this.props} handleChange={this.handleChange} />
  );
}

export default SwitchField;
