import { useState } from 'react';
import classNames from 'classnames';
import {
 Row, Col, Button, Form, Input, Divider,
} from 'antd';
import PasswordStrength from 'views/shared/PasswordStrength';
import PhoneDropdown from '../shared/dropdowns/PhoneDropdown';
import DateOfBirthInput from '../shared/inputs/DateOfBirthInput';
import CheckboxText from '../shared/inputs/CheckboxText';
import Header from './components/Header';
import Footer from './components/Footer';
import Details from './components/Details';
import RulesModal from './components/RulesModal';

const CheckoutStep1 = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const detailsToggle = () => setDetailsVisible((prev) => !prev);
  const [rulesVisible, setRulesVisible] = useState(false);
  const rulesVisibleToggle = (e) => {
    e.preventDefault();
    setRulesVisible((prev) => !prev);
  };

  return (
    <Form layout="vertical">
      <div className="checkout__wrap">
        <Header currentStep={1} />
        <main className="checkout__main">
          <div className="container">
            <Row gutter={24}>
              <Col lg={16}>
                <div className="checkout__form">
                  <div className="d-md-flex align-items-center justify-content-space-between mb-16 mb-md-24">
                    <h1 className="text-headline mb-16 mb-md-0">
                      Personal information
                    </h1>
                    <div className="d-flex align-items-center">
                      <span>Already have an account?</span>
                      <Button className="ml-8" type="secondary" size="small">
                        Log in
                      </Button>
                    </div>
                  </div>
                  <Row gutter={24}>
                    <Col md={12}>
                      <Form.Item
                        label={
                          <span className="main-input__label">First name</span>
                        }
                      >
                        <Input placeholder="Cory" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label={
                          <span className="main-input__label">Last name</span>
                        }
                      >
                        <Input placeholder="Hubbard" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label={<span className="main-input__label">Email</span>}
                      >
                        <Input placeholder="cory.hubbard@gmail.com" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item>
                        <div className="d-flex align-items-center">
                          <PhoneDropdown className="mr-8" />
                          <div className="main-input__field--no-label">
                            <Input placeholder="1234567890" className="mb-0" />
                          </div>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item>
                        <DateOfBirthInput />
                      </Form.Item>
                    </Col>
                    <Col md={12} className="mt-md-30">
                      <Form.Item
                        label={
                          <span className="main-input__label">Password</span>
                        }
                        help={<PasswordStrength value="" />}
                      >
                        <Input.Password
                          iconRender={(visible) => (visible ? (
                            <span>
                              <i className="icon icon-eye-crossed" />
                            </span>
                            ) : (
                              <span>
                                <i className="icon icon-eye" />
                              </span>
                            ))
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Divider className="mt-0" plain>
                        Or
                      </Divider>
                    </Col>
                    <Col md={12}>
                      <div className="auth-main-social-btn mb-16 mb-md-0">
                        <img
                          className="mr-12"
                          src="/images/Google.svg"
                          alt=""
                        />
                        Continue with Google
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="auth-main-social-btn mb-0">
                        <img
                          className="mr-12"
                          src="/images/Facebook.svg"
                          alt=""
                        />
                        Continue with Facebook
                      </div>
                    </Col>
                    <Col span={24}>
                      <Divider className="mt-24 mb-24" />
                    </Col>
                    <Col span={24}>
                      <Form.Item className="ant-form-item-h-auto mb-24">
                        <CheckboxText>
                          <p>
                            I agree with
                            {' '}
                            <a
                              href="#"
                              className="main-link"
                              onClick={rulesVisibleToggle}
                            >
                              Rules, Travel Restrictions, Policies, Health &#38;
                              Safety
                            </a>
                            {' '}
                            and also confirm I am at least 25 years old at the
                            time of rental and I have a valid drivers license
                          </p>
                        </CheckboxText>
                      </Form.Item>
                      <p>
                        By clicking &quot;Agree and Continue&quot;, you are
                        agreeing to the Vancation
                        {' '}
                        <a href="#" className="main-link">
                          Terms of Service
                        </a>
                        ,
                        {' '}
                        <a href="#" className="main-link">
                          RV Rental &#38; Optional Insurance Terms
                        </a>
                        ,
                        {' '}
                        <a href="#" className="main-link">
                          Privacy Policy
                        </a>
                        , and to receive booking-related texts. Standard
                        messaging rates may apply.
                      </p>
                      <div className="d-none d-lg-flex justify-content-flex-end mt-48">
                        {/* Change to MainBtnGradient when form is filled */}
                        <Button size="large">Agree and Continue</Button>
                      </div>
                    </Col>
                  </Row>
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
          continueBtnText="Agree and Continue"
        />
        <RulesModal visible={rulesVisible} onClose={rulesVisibleToggle} />
      </div>
    </Form>
  );
};

export default CheckoutStep1;
