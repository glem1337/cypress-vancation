import {
  Input,
  Button,
  Form,
  Switch,
} from 'antd';
import PropTypes from 'prop-types';

const CustomSmallBlock = ({ inputTitle }) => (

  <div className="custom-add-wrap">
    <div className="flex-grow-1">
      <Form.Item
        label={<span className="main-input__label">{ inputTitle }</span>}
      >
        <Input />
      </Form.Item>
    </div>
    <div className="d-inline-flex align-items-center ml-24">
      <Switch />
    </div>
    <div className="custom-acc-wrap__close">
      <Button
        type="secondary"
        icon={<i className="icon icon-cross" />}
      />
    </div>
  </div>
);

CustomSmallBlock.propTypes = {
  inputTitle: PropTypes.string.isRequired,
};

export default CustomSmallBlock;
