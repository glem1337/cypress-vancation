import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import CheckboxField from '../CheckboxField';

const CheckboxGroupFieldComponent = ({
  form,
  field,
  className,
  checkboxClassName,
  titleClassName,
  options,
  isChecked,
  onChange,
  title,
}) => (
  <>
    {title && (
      <p className={classNames(titleClassName)}>
        <FormattedMessage {...title} />
      </p>
    )}
    <div className={classNames(className)}>
      {options.map(({ value, label }) => (
        <CheckboxField
          key={value}
          name={field.name}
          label={label}
          field={field}
          form={form}
          checked={isChecked(value)}
          onChange={onChange(value)}
          className={checkboxClassName}
        />
      ))}
    </div>
  </>
);

CheckboxGroupFieldComponent.defaultProps = {
  className: null,
  checkboxClassName: null,
  titleClassName: null,
  title: null,
};

CheckboxGroupFieldComponent.propTypes = {
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  checkboxClassName: PropTypes.string,
  title: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }),
  form: PropTypes.shape().isRequired,
  field: PropTypes.shape().isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isChecked: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxGroupFieldComponent;
