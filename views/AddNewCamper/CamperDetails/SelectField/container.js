import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { omit } from 'ramda';
import Options from './Options';

import SelectFieldComponent from './component';

class SelectField extends React.PureComponent {
  get items() {
    const { items, renderItem } = this.props;

    return items.map(renderItem || Options);
  }

  handleChange = (value) => {
    const { field: { name }, form: { setFieldValue }, onSelect, items } = this.props;

    setFieldValue(name, value);

    if (onSelect) {
      onSelect({ value, name }, items);
    }
  }

  handleBlur = () => {
    const { field: { name }, form: { setFieldTouched } } = this.props;
    setFieldTouched(name);
  }

  handleSearch = (value) => {
    const { field: { name }, form: { setFieldValue }, numbersOnly } = this.props;

    if (numbersOnly && Number.isNaN(Number(value))) {
      return;
    }

    const prepareValue = value.trim();

    if (prepareValue) {
      setFieldValue(name, value);
    }
  }

  render = () => {
    const props = omit(
      ['onSelect', 'renderItem', 'autoSave', 'numbersOnly'],
      this.props,
    );

    if (this.props.autoSave && this.props.showSearch) {
      props.onSearch = this.handleSearch;
    }

    return (
      <SelectFieldComponent
        {...props}
        items={this.items}
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
      />
    );
  }
}

SelectField.defaultProps = {
  onSelect: null,
  items: [],
  renderItem: null,
  autoSave: true,
  showSearch: false,
  numbersOnly: false,
};

SelectField.propTypes = {
  renderItem: PropTypes.func,
  onSelect: PropTypes.func,
  autoSave: PropTypes.bool,
  showSearch: PropTypes.bool,
  numbersOnly: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.string,
  ])),
  field: PropTypes.shape().isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
};

export { SelectField as SelectFieldContainer };
export default injectIntl(SelectField);
