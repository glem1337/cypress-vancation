import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Select } from 'antd';
import { getIn } from 'formik';
import { is } from 'ramda';
import InputHelp from 'views/shared/InputHelp';

const SelectField = ({
  label,
  field,
  placeholder,
  intl,
  tooltip,
  handleChange,
  handleBlur,
  items,
  formItemClasses,
  form: { touched, errors },
  ...props
}) => {
  const fieldTouched = getIn(touched, field.name);
  const fieldErrors = getIn(errors, field.name);
  const HelperErrorOrTouched = fieldTouched && fieldErrors && <InputHelp type="danger" text={fieldErrors} />;
  const HelperDefault = tooltip && <InputHelp text={tooltip} />;

  return (
    <Form.Item
      label={label && (
        <span className="main-input__label">
          <FormattedMessage {...label} />
        </span>
      )}
      validateStatus={fieldTouched && fieldErrors && 'error'}
      help={HelperErrorOrTouched || HelperDefault}
      className={formItemClasses}
    >
      <Select
        optionLabelProp="label"
        {...props}
        {...field}
        value={field.value || props.value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoClearSearchValue={false}
        placeholder={
          is(Object, placeholder)
            ? intl.formatMessage(placeholder)
            : placeholder
        }
      >
        {items.map(elem => elem)}
      </Select>
    </Form.Item>
  );
};

SelectField.defaultProps = {
  label: null,
  placeholder: null,
  tooltip: null,
  value: undefined,
  items: [],
  formItemClasses: undefined,
};

SelectField.propTypes = {
  field: PropTypes.shape().isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
    status: PropTypes.shape(),
  }).isRequired,
  label: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }),
  placeholder: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.string,
  ]),
  intl: PropTypes.shape().isRequired,
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  value: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.node),
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  formItemClasses: PropTypes.string,
};

export default SelectField;
