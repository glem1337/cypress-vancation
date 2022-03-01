import { useState } from 'react';
import classNames from 'classnames';
import { Button, Form, Select } from 'antd';
import SlideOutFooter from './components/SlideOutFooter';

const { Option } = Select;

const PreparationTime = () => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((prev) => !prev);

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleActive}>
        <i className="icon icon-time" />
        <span>Preparation Time</span>
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
            <h3 className="text-subheader mb-8">Preparation time</h3>
            <p className="mb-16">
              The time needed to prepare the camper for the next renter. (i.e. -
              Select &quot;1 day&quot; if you can&apos;t offer same day
              turnovers).
            </p>
            <Form.Item
              className="mb-0"
              label={<span className="main-input__label">Days</span>}
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
              >
                <Option className="p-0" value="1" label="0 days">
                  <li className="main-dropdown__item">0 days</li>
                </Option>
                <Option className="p-0" value="2" label="1 day">
                  <li className="main-dropdown__item">1 day</li>
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

export default PreparationTime;
