/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';

const InputNumeric = ({ className, defaultValue = 0, ...rest }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div {...rest} className={classNames('main-input-numeric', className)}>
      <Input {...rest} value={value} className="mb-0" type="number" />
      <Button
        shape="circle"
        type="secondary"
        className="main-input-numeric__control main-input-numeric__control--minus"
        icon={<i className="icon icon-minus font-20" />}
        onClick={() => setValue((prev) => +prev - 1)}
      />
      <Button
        shape="circle"
        type="secondary"
        className="main-input-numeric__control main-input-numeric__control--plus"
        icon={<i className="icon icon-plus font-20" />}
        onClick={() => setValue((prev) => +prev + 1)}
      />
    </div>
  );
};

export default InputNumeric;
