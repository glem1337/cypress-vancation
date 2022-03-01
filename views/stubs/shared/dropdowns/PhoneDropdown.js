import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

const PhoneDropdown = ({ className }) => {
  const { Option } = Select;

  return (
    <div className="main-input main-input-phone">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="" className="main-input__label mb-4">
        Phone number
      </label>
      <Select
        id="fieldID"
        name="fieldName"
        className={`main-input__field ${className}`}
        optionLabelProp="label"
        defaultValue="select1"
      >
        <Option className="p-0" value="select1" label="+1">
          <li className="main-dropdown__item">+1</li>
        </Option>
        <Option className="p-0" value="select2" label="+2">
          <li className="main-dropdown__item">+2</li>
        </Option>
        <Option className="p-0" value="select3" label="+380">
          <li className="main-dropdown__item">+380</li>
        </Option>
        <Option className="p-0" value="select4" label="+24">
          <li className="main-dropdown__item">+24</li>
        </Option>
        <Option className="p-0" value="select5" label="+234">
          <li className="main-dropdown__item">+234</li>
        </Option>
        <Option className="p-0" value="select6" label="+345">
          <li className="main-dropdown__item">+345</li>
        </Option>
        <Option className="p-0" value="select7" label="+534">
          <li className="main-dropdown__item">+543</li>
        </Option>
        <Option className="p-0" value="select8" label="+5467">
          <li className="main-dropdown__item">+7567</li>
        </Option>
      </Select>
    </div>
  );
};

PhoneDropdown.defaultProps = {
  className: null,
};

PhoneDropdown.propTypes = {
  className: PropTypes.string,
};

export default PhoneDropdown;
