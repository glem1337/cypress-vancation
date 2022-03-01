import { Input, Button, Select, Form } from 'antd';

const randomId = Math.round(Math.random() * 1000);

const CustomFeesBlock = () => {
  const { Option } = Select;

  return (
    <div className="custom-acc-wrap custom-fee-wrap">
      <div className="flex-grow-1">
        <Form.Item
          label={<span className="main-input__label w-100">Fee name</span>}
        >
          <Input className="w-100" type="text" id={randomId} />
        </Form.Item>
      </div>
      <div className="custom-acc-wrap__sec-input">
        <Form.Item
          label={<span className="main-input__label w-100">Price</span>}
        >
          <Input
            className="w-100 mb-0"
            type="text"
            id={randomId * 2}
            placeholder="$0"
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Select
          id="Nights"
          name="fieldName"
          className="main-input__field main-input__field--no-label"
          optionLabelProp="label"
        >
          <Option className="p-0" value="select1" label="+1">
            <li className="main-dropdown__item">2 nights</li>
          </Option>
          <Option className="p-0" value="select2" label="+2">
            <li className="main-dropdown__item">3 nights</li>
          </Option>
        </Select>
      </Form.Item>
      <div className="custom-acc-wrap__close">
        <Button
          type="secondary"
          icon={<i className="icon icon-cross" />}
        />
      </div>
    </div>
  );
};

export default CustomFeesBlock;
