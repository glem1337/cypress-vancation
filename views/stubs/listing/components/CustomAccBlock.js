import { Input, Button } from 'antd';
import InputNumeric from '../../shared/inputs/InputNumeric';

const randomId = Math.round(Math.random() * 1000);

const CustomAccBlock = () => (
  <div className="custom-acc-wrap">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor={randomId} className="main-input__label w-100">
      Name
    </label>
    <Input className="custom-acc-wrap__main-input" type="text" id={randomId} />
    <InputNumeric className="custom-acc-wrap__sec-input" value={2} />
    <div className="custom-acc-wrap__close">
      <Button
        type="secondary"
        icon={<i className="icon icon-cross" />}
      />
    </div>
  </div>
);

export default CustomAccBlock;
