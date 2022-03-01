import { useState } from 'react';
import classNames from 'classnames';
import {
 Row, Col, Button, Form, Input, Select, Divider,
} from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import Details from './components/Details';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import CreditCard from './components/CreditCard';

const { Option } = Select;

const CheckoutStep4 = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const detailsToggle = () => setDetailsVisible((prev) => !prev);

  return (
    <Form layout="vertical">
      <div className="checkout__wrap">
        <Header currentStep={4} />
        <main className="checkout__main">
          <div className="container">
            <Row gutter={24}>
              <Col lg={16}>
                <div className="checkout__form">
                  <h1 className="text-headline mb-24">Payment</h1>
                  <CreditCard className="mb-24" />
                  <div>
                    <div className="text-title mb-16">Billing address</div>
                    <Form.Item
                      className="mb-24"
                      label={<span className="main-input__label">Country</span>}
                    >
                      <Select
                        className="main-input__field"
                        optionLabelProp="label"
                        placeholder="Select country"
                      >
                        <Option className="p-0" value="1" label="United States">
                          <li className="main-dropdown__item">United States</li>
                        </Option>
                        <Option className="p-0" value="2" label="Zambia">
                          <li className="main-dropdown__item">Zambia</li>
                        </Option>
                      </Select>
                    </Form.Item>
                    <div className="in-black font-600 mb-16">Address</div>
                    <Form.Item
                      label={<span className="main-input__label">Street</span>}
                    >
                      <Input />
                    </Form.Item>
                    <div className="checkout__address-fields">
                      <Form.Item
                        className="mb-0"
                        label={<span className="main-input__label">City</span>}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="mb-0"
                        label={
                          <span className="main-input__label">Country</span>
                        }
                      >
                        <Select
                          className="main-input__field"
                          optionLabelProp="label"
                          placeholder="Select state"
                        >
                          <Option className="p-0" value="1" label="California">
                            <li className="main-dropdown__item">California</li>
                          </Option>
                          <Option className="p-0" value="2" label="Alaska">
                            <li className="main-dropdown__item">Alaska</li>
                          </Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        className="mb-0"
                        label={
                          <span className="main-input__label">Zip code</span>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <Divider className="mt-20 mb-20" />
                  <p className="mb-24">
                    By continuing, you are agreeing to the Vancation
                    {' '}
                    <a href="#" className="main-link">
                      Terms of Service
                    </a>
                    . You also understand that only verified and approved
                    drivers are authorized to operate the vehicle.
                  </p>
                  <p>
                    The owner has 24 hours to respond. You will only be charged
                    once he confirms your request.
                  </p>
                  <div className="d-none d-lg-flex align-items-center justify-content-space-between mt-48">
                    <Button
                      className="ant-btn-link ant-btn-flat pl-0 pr-0"
                      icon={<i className="icon icon-left-edge" />}
                    >
                      Back
                    </Button>
                    <MainBtnGradient
                      text="Request booking"
                      size="large"
                      className="min-w-140"
                    />
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div
                  className={classNames(
                    'checkout__details',
                    detailsVisible && 'checkout__details--open',
                  )}
                >
                  <Details detailsToggle={detailsToggle} />
                </div>
              </Col>
            </Row>
          </div>
        </main>
        <Footer
          detailsToggle={detailsToggle}
          showBackBtn
          continueBtnText="Request booking"
        />
      </div>
    </Form>
  );
};

export default CheckoutStep4;
