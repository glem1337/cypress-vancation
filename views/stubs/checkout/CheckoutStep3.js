import { useState } from 'react';
import classNames from 'classnames';
import {
 Row, Col, Button, Form, Radio, Tag, Alert,
} from 'antd';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import Header from './components/Header';
import Footer from './components/Footer';
import Details from './components/Details';

const CheckoutStep3 = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const detailsToggle = () => setDetailsVisible((prev) => !prev);

  return (
    <Form layout="vertical">
      <div className="checkout__wrap">
        <Header currentStep={3} />
        <main className="checkout__main">
          <div className="container">
            <Row gutter={24}>
              <Col lg={16}>
                <div className="checkout__form">
                  <h1 className="text-headline mb-8">Protection Plan</h1>
                  <p className="mb-16">
                    Select a required insurance plan and travel with peace of
                    mind. Your standard insurance doesn&apos;t extend to RV
                    rentals.
                  </p>
                  <Alert
                    type="info"
                    className="mb-24"
                    showIcon
                    icon={<i className="icon icon-info" />}
                    message="Plans backed by Crum &#38; Forster Insurance with up to $1 million liability and up to $200,000 damage protection."
                  />
                  <Radio.Group defaultValue="required" className="w-100">
                    <Radio value="required" className="checkout__form-radio">
                      <div>
                        <div className="d-flex d-md-block flex-column text-subheader font-400 mb-16 pr-24">
                          <span>Required Protection Plan</span>
                          {' '}
                          <span>
                            <span className="in-gray-700">•</span>
                            {' '}
                            $38/Day
                          </span>
                        </div>
                        <div className="checkout__form-radio-grid">
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Deductible.svg"
                              alt=""
                            />
                            <span className="ml-8">$3,000 Deductible</span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Roadside_Assistance.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              24/7 Roadside Assistance
                            </span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Insurance_Coverage.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              $1 Million Liability Protection
                            </span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Damage_Protection.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              Up To $200,000 Damage Protection
                            </span>
                          </div>
                        </div>
                      </div>
                    </Radio>
                    <Radio value="enhanced" className="checkout__form-radio">
                      <div>
                        <div className="d-flex d-md-block flex-column text-subheader font-400 mb-16 pr-24">
                          <span>Enhanced Protection Plan</span>
                          {' '}
                          <span>
                            <span className="in-gray-700">•</span>
                            {' '}
                            $48/Day
                          </span>
                        </div>
                        <div className="checkout__form-radio-grid">
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Deductible.svg"
                              alt=""
                            />
                            <span className="ml-8">$2,000 Deductible</span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Roadside_Assistance.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              24/7 Roadside Assistance
                            </span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Insurance_Coverage.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              $1 Million Liability Protection
                            </span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Damage_Protection.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              Up To $200,000 Damage Protection
                            </span>
                          </div>
                        </div>
                      </div>
                    </Radio>
                    <Radio value="superior" className="checkout__form-radio">
                      <div>
                        <div className="d-flex d-md-block flex-column text-subheader font-400 mb-16 pr-24">
                          <span>Superior Protection Plan</span>
                          {' '}
                          <span>
                            <span className="in-gray-700">•</span>
                            {' '}
                            $64/Day
                          </span>
                          <Tag className="ml-md-8" color="cyan">
                            <i className="icon icon-like-f" />
                            <span>Vancation recommended</span>
                          </Tag>
                        </div>
                        <div className="checkout__form-radio-grid">
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Deductible.svg"
                              alt=""
                            />
                            <span className="ml-8">$1,500 Deductible</span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Roadside_Assistance.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              24/7 Roadside Assistance
                            </span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Insurance_Coverage.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              $1 Million Liability Protection
                            </span>
                          </div>
                          <div className="checkout__form-radio-item">
                            <img
                              src="/images/listing/insurance/Damage_Protection.svg"
                              alt=""
                            />
                            <span className="ml-8">
                              Up To $200,000 Damage Protection
                            </span>
                          </div>
                        </div>
                      </div>
                    </Radio>
                  </Radio.Group>
                  <div className="d-none d-lg-flex align-items-center justify-content-space-between mt-48">
                    <Button
                      className="ant-btn-link ant-btn-flat pl-0 pr-0"
                      icon={<i className="icon icon-left-edge" />}
                    >
                      Back
                    </Button>
                    <MainBtnGradient
                      text="Continue"
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
          continueBtnText="Continue"
        />
      </div>
    </Form>
  );
};

export default CheckoutStep3;
