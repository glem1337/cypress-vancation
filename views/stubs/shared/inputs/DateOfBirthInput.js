import { Tooltip, Select, Input, Form } from 'antd';

const { Option } = Select;

const DateOfBirthInput = () => (
  <div>
    <div className="d-flex align-items-center mb-8">
      <span className="font-600">Date of birth</span>
      <Tooltip title="Some info">
        <i className="icon icon-info-f main-tooltip-icon font-18" />
      </Tooltip>
    </div>
    <div className="d-flex">
      <div className="flex-1">
        <Form.Item
          className="mb-0"
          label={<span className="main-input__label">Month</span>}
        >
          <Select
            className="main-input__field"
            optionLabelProp="label"
            placeholder="Select"
          >
            <Option className="p-0" value="1" label="January">
              <li className="main-dropdown__item">January</li>
            </Option>
            <Option className="p-0" value="2" label="February">
              <li className="main-dropdown__item">February</li>
            </Option>
            <Option className="p-0" value="3" label="March">
              <li className="main-dropdown__item">March</li>
            </Option>
            <Option className="p-0" value="4" label="April">
              <li className="main-dropdown__item">April</li>
            </Option>
            <Option className="p-0" value="5" label="May">
              <li className="main-dropdown__item">May</li>
            </Option>
            <Option className="p-0" value="6" label="June">
              <li className="main-dropdown__item">June</li>
            </Option>
            <Option className="p-0" value="7" label="July">
              <li className="main-dropdown__item">July</li>
            </Option>
            <Option className="p-0" value="8" label="August">
              <li className="main-dropdown__item">August</li>
            </Option>
            <Option className="p-0" value="9" label="September">
              <li className="main-dropdown__item">September</li>
            </Option>
            <Option className="p-0" value="10" label="October">
              <li className="main-dropdown__item">October</li>
            </Option>
            <Option className="p-0" value="11" label="November">
              <li className="main-dropdown__item">November</li>
            </Option>
            <Option className="p-0" value="12" label="December">
              <li className="main-dropdown__item">December</li>
            </Option>
          </Select>
        </Form.Item>
      </div>
      <div className="w-60 ml-8">
        <Form.Item
          className="mb-0"
          label={<span className="main-input__label">Day</span>}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="w-80 ml-8">
        <Form.Item
          className="mb-0"
          label={<span className="main-input__label">Year</span>}
        >
          <Input />
        </Form.Item>
      </div>
    </div>
  </div>
);

export default DateOfBirthInput;
