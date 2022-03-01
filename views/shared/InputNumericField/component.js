import React from 'react';
import { omit } from 'ramda';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import ClassNames from 'classnames';

const InputNumericField = ({
  field,
  form,
  wrapperClassname,
  onIncrease,
  onDecrease,
  asComponent: Component,
  ...props
}) => (
  <div className={ClassNames('main-input-numeric', wrapperClassname)}>
    <Component
      {...omit(['onMaxValueTrigger'], props)}
      {...field}
      type="number"
      readOnly
    />
    <Button
      shape="circle"
      type="secondary"
      className="main-input-numeric__control main-input-numeric__control--minus"
      icon={<i className="icon icon-minus font-20" />}
      onClick={onDecrease}
    />
    <Button
      shape="circle"
      type="secondary"
      className="main-input-numeric__control main-input-numeric__control--plus"
      icon={<i className="icon icon-plus font-20" />}
      onClick={onIncrease}
    />
  </div>
);

InputNumericField.defaultProps = {
  asComponent: Input,
  wrapperClassname: undefined,
};

InputNumericField.propTypes = {
  field: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  wrapperClassname: PropTypes.string,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  asComponent: PropTypes.elementType,
};

export default InputNumericField;
