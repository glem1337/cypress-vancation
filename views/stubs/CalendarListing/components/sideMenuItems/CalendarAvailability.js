import { useState } from 'react';
import classNames from 'classnames';
import { Button, Form, Select } from 'antd';
import SlideOutFooter from './components/SlideOutFooter';

const { Option } = Select;

const CalendarAvailability = () => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((prev) => !prev);

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleActive}>
        <i className="icon icon-calendar-check" />
        <span>Calendar Availability</span>
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
            <h3 className="text-subheader mb-8">Calendar availability</h3>
            <p className="mb-16">
              Specify how far out you want your calendar to show as available.
              We typically recommend 12 months.
            </p>
            <Form.Item
              className="mb-0"
              label={<span className="main-input__label">Period</span>}
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
              >
                <Option className="p-0" value="1" label="6 months">
                  <li className="main-dropdown__item">6 months</li>
                </Option>
                <Option className="p-0" value="2" label="12 months">
                  <li className="main-dropdown__item">12 months</li>
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

export default CalendarAvailability;
