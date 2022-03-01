import {
  Input,
  Button,
  Form,
  Select,
  Switch,
} from 'antd';

const randomId = Math.round(Math.random() * 1000);

const { Option } = Select;

const CustomAddBlock = () => (

  <div className="custom-add-wrap">
    <div className="flex-grow-1">
      <Form.Item
        label={<span className="main-input__label">Add-on name</span>}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={<span className="main-input__label">Description</span>}
      >
        <Input />
      </Form.Item>
      <div className="d-flex align-items-center flex-wrap w-100 mb-md-8">
        <Form.Item
          className="edit-list-switch-card__small-input"
          label={<span className="main-input__label">Price</span>}
        >
          <Input placeholder="$0" />
        </Form.Item>
        <Form.Item className="edit-list-switch-card__mid-input">
          <Select
            id={randomId}
            name="fieldName"
            className="main-input__field main-input__field--no-label"
            optionLabelProp="label"
            defaultValue="per day"
          >
            <Option className="p-0" value="per day" label="per day">
              <li className="main-dropdown__item">per day</li>
            </Option>
            <Option className="p-0" value="per week" label="per week">
              <li className="main-dropdown__item">per week</li>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="edit-list-switch-card__small-input"
          label={<span className="main-input__label">Max quantity</span>}
        >
          <Input type="number" />
        </Form.Item>
      </div>
    </div>
    <div className="ml-16 ml-md-24">
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

export default CustomAddBlock;
