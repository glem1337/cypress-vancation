import { useState } from 'react';
import classNames from 'classnames';
import { Form, Input, Switch, Button } from 'antd';
import SlideOutFooter from './components/SlideOutFooter';

const DefaultNightlyRate = () => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((prev) => !prev);
  const [customize, setCustomize] = useState(true);

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleActive}>
        <i className="icon icon-price" />
        <span>Default Nightly Rate</span>
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
            <h3 className="text-subheader mb-16">Default nightly rate</h3>
            <Form.Item
              className="mb-24"
              label={<span className="main-input__label">Cost per night</span>}
            >
              <Input
                defaultValue="$160"
                className="pr-80"
                disabled={customize}
              />
              <span className="main-input__add-txt">per night</span>
            </Form.Item>
            <div
              className={classNames(
                'd-flex align-items-center',
                customize && 'mb-16',
              )}
            >
              <Switch
                defaultChecked
                onChange={() => setCustomize((prev) => !prev)}
              />
              <span className="ml-8">Customize by night of the week</span>
            </div>
            {customize && (
              <>
                <Form.Item
                  label={<span className="main-input__label">Monday</span>}
                >
                  <Input defaultValue="$350" className="pr-80" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
                <Form.Item
                  label={<span className="main-input__label">Tuesday</span>}
                >
                  <Input defaultValue="$350" className="pr-80" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
                <Form.Item
                  label={<span className="main-input__label">Wednesday</span>}
                >
                  <Input defaultValue="$350" className="pr-80" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
                <Form.Item
                  label={<span className="main-input__label">Thursday</span>}
                >
                  <Input defaultValue="$350" className="pr-80" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
                <Form.Item
                  label={<span className="main-input__label">Friday</span>}
                >
                  <Input defaultValue="$350" className="pr-80" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
                <Form.Item
                  label={<span className="main-input__label">Saturday</span>}
                >
                  <Input defaultValue="$350" className="pr-80" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
                <Form.Item
                  className="mb-0"
                  label={<span className="main-input__label">Sunday</span>}
                >
                  <Input defaultValue="$350" className="pr-80" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
              </>
            )}
          </div>
          <SlideOutFooter />
        </Form>
      </div>
    </div>
  );
};

export default DefaultNightlyRate;
