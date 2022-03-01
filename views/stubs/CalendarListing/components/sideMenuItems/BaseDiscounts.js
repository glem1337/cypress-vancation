/* eslint-disable react/prop-types */
import { useState } from 'react';
import classNames from 'classnames';
import { Form, Button, Switch, Input } from 'antd';
import SlideOutFooter from './components/SlideOutFooter';

const BaseDiscounts = ({ defaultSettings }) => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((prev) => !prev);
  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(true);

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleActive}>
        <i className="icon icon-discount" />
        <span>Base Discounts</span>
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
            {defaultSettings ? (
              <>
                <h3 className="text-subheader mb-8">Base discounts</h3>
                <p className="mb-16">
                  Set up discounts that encourage longer bookings.
                </p>
                <div className="mb-16">
                  <div className="d-flex align-items-center mb-8">
                    <Switch
                      defaultChecked
                      onChange={() => setWeekly((prev) => !prev)}
                    />
                    <span className="ml-8">Offer weekly discount</span>
                  </div>
                  <p className="text-caption">
                    Discounts for 7 nights or more.
                  </p>
                </div>
                {weekly && (
                  <Form.Item
                    help={(
                      <p className="main-input__message">
                        <i className="main-input__message-icon icon icon-info" />
                        $2,250.00 per week
                      </p>
                    )}
                  >
                    <Input defaultValue="10" className="pr-24" />
                    <span className="main-input__add-txt">%</span>
                  </Form.Item>
                )}
                <div className={classNames(monthly && 'mb-16')}>
                  <div className="d-flex align-items-center mb-8">
                    <Switch
                      defaultChecked
                      onChange={() => setMonthly((prev) => !prev)}
                    />
                    <span className="ml-8">Offer monthly discount</span>
                  </div>
                  <p className="text-caption">
                    Discounts for 28 nights or more.
                  </p>
                </div>
                {monthly && (
                  <Form.Item
                    className="mb-0"
                    help={(
                      <p className="main-input__message">
                        <i className="main-input__message-icon icon icon-info" />
                        $9,856.00 per month
                      </p>
                    )}
                  >
                    <Input defaultValue="12" className="pr-24" />
                    <span className="main-input__add-txt">%</span>
                  </Form.Item>
                )}
              </>
            ) : (
              <>
                <h3 className="text-subheader mb-16">Base discounts</h3>
                <Form.Item
                  label={
                    <span className="main-input__label">Weekly discount</span>
                  }
                  help={(
                    <p className="main-input__message">
                      <i className="main-input__message-icon icon icon-info" />
                      $2,250.00 per week
                    </p>
                  )}
                >
                  <Input defaultValue="10" className="pr-24" />
                  <span className="main-input__add-txt">%</span>
                </Form.Item>
                <Form.Item
                  className="mb-0"
                  label={
                    <span className="main-input__label">Monthly discount</span>
                  }
                  help={(
                    <p className="main-input__message">
                      <i className="main-input__message-icon icon icon-info" />
                      $9,856.00 per month
                    </p>
                  )}
                >
                  <Input defaultValue="12" className="pr-24" />
                  <span className="main-input__add-txt">%</span>
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

export default BaseDiscounts;
