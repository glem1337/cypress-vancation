import { useState } from 'react';
import classNames from 'classnames';
import { Button, Form, Select } from 'antd';
import SlideOutFooter from './components/SlideOutFooter';

const { Option } = Select;

const PickupTime = () => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((prev) => !prev);

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleActive}>
        <i className="icon icon-map-time" />
        <span>Pickup/Drop-off Time</span>
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
            <h3 className="text-subheader mb-8">Pickup/drop-off time</h3>
            <p className="mb-16">
              The pickup/drop-off time indicates the time when a renter can take
              your camper out and return it back.
            </p>
            <Form.Item
              label={<span className="main-input__label">Pickup time</span>}
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
              >
                <Option className="p-0" value="1" label="5:00 PM">
                  <li className="main-dropdown__item">5:00 PM</li>
                </Option>
                <Option className="p-0" value="2" label="12:00 PM">
                  <li className="main-dropdown__item">12:00 PM</li>
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="mb-0"
              label={<span className="main-input__label">Drop-off time</span>}
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
              >
                <Option className="p-0" value="1" label="5:00 PM">
                  <li className="main-dropdown__item">5:00 PM</li>
                </Option>
                <Option className="p-0" value="2" label="12:00 PM">
                  <li className="main-dropdown__item">12:00 PM</li>
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

export default PickupTime;
