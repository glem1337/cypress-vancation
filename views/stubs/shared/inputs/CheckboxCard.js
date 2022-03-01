/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Checkbox } from 'antd';

const CheckboxCard = ({ children, defaultChecked = false, hasIcon = true }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <Checkbox
      className="main-checkbox-card"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      {hasIcon && (
        <i className="icon icon-activate-f main-checkbox-card__icon" />
      )}
      <div className="d-flex flex-column flex-1">{children}</div>
    </Checkbox>
  );
};

export default CheckboxCard;
