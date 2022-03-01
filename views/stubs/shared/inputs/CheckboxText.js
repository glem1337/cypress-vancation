/* eslint-disable react/prop-types */
import { Checkbox } from 'antd';

const CheckboxText = ({ children }) => (
  <div className="main-radio-text">
    <Checkbox />
    {children}
  </div>
);

export default CheckboxText;
