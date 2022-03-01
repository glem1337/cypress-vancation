import { useState } from 'react';
import classNames from 'classnames';
import { Button, Form, Select } from 'antd';
import SlideOutFooter from './components/SlideOutFooter';

const { Option } = Select;

const DefaultMinNightStay = () => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((prev) => !prev);

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleActive}>
        <i className="icon icon-moon" />
        <span>Default Minimum Night Stay</span>
        <i className="icon icon-right ml-auto" />
      </Button>
      <div
        className={classNames(
          'calendar-listing__side-slideout',
          active && 'calendar-listing__side-slideout--active',
        )}
      >
        <Form layout="vertical">
          <div className="calendar-listing__side-slideout__main">
            <div className="mb-16">
              <Button
                className="ant-btn-link ant-btn-flat pl-0 pr-0"
                onClick={toggleActive}
              >
                <i className="icon icon-left-edge" />
                <span>Back</span>
              </Button>
            </div>
            <h3 className="text-subheader mb-8">Default minimum night stay</h3>
            <p className="mb-16">
              What is the minimum number of nights your guests can rent this rig
              for?
            </p>
            <Form.Item
              className="mb-0"
              label={<span className="main-input__label">Nights</span>}
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
              >
                <Option className="p-0" value="1" label="2 nights">
                  <li className="main-dropdown__item">2 nights</li>
                </Option>
                <Option className="p-0" value="2" label="4 nights">
                  <li className="main-dropdown__item">4 nights</li>
                </Option>
              </Select>
            </Form.Item>
          </div>
          <SlideOutFooter />
        </Form>
      </div>
    </div>
  );
};

export default DefaultMinNightStay;
