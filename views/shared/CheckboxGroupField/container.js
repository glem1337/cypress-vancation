import React from 'react';
import PropTypes from 'prop-types';
import { without } from 'ramda';

import CheckboxGroupFieldComponent from './component';

class CheckboxGroupField extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    field: PropTypes.shape().isRequired,
  };

  isChecked = value => this.props.field.value.includes(value);

  handleChange = value => () => {
    const { field } = this.props;

    const newValues = field.value.includes(value)
      ? without([value], field.value)
      : [...field.value, value];

    field.onChange({ target: { value: newValues, name: field.name } });
  };

  render() {
    return (
      <CheckboxGroupFieldComponent
        {...this.props}
        isChecked={this.isChecked}
        onChange={this.handleChange}
      />
    );
  }
}

export default CheckboxGroupField;
