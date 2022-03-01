/* eslint-disable react/prop-types */
import { Radio } from 'antd';

const RadioCard = ({ children, ...rest }) => (
  <Radio
    {...rest}
    className="main-radio-card"
  >
    <i className="icon icon-activate-f main-radio-card__icon" />
    <div className="d-flex flex-column flex-1">{children}</div>
  </Radio>
  );

export default RadioCard;
