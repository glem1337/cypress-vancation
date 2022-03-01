import React from 'react';
import PropTypes from 'prop-types';

import InputNumericFieldComponent from './component';

class InputNumericField extends React.PureComponent {
  static propTypes = {
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    onMaxValueTrigger: PropTypes.func,
  };

  static defaultProps = {
    min: 0,
    max: null,
    onMaxValueTrigger: null,
  };

  handleIncrease = () => {
    const {
      field: { name, value },
      form: { setFieldValue },
      max,
    } = this.props;

    if (max && value === max) {
      const { onMaxValueTrigger } = this.props;

      if (onMaxValueTrigger) {
        onMaxValueTrigger();
      }
      return;
    }

    setFieldValue(name, value + 1);
  };

  handleDecrease = () => {
    const {
      field: { name, value },
      form: { setFieldValue },
      min,
    } = this.props;

    if (value === min) return;

    setFieldValue(name, value - 1);
  };

  render = () => (
    <InputNumericFieldComponent
      {...this.props}
      onIncrease={this.handleIncrease}
      onDecrease={this.handleDecrease}
    />
  );
}

export default InputNumericField;
