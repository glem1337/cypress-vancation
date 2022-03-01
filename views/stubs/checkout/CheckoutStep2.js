import { useState } from 'react';
import classNames from 'classnames';
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Checkbox,
  AutoComplete,
  Divider,
  Tag,
} from 'antd';
import CollapsibleText from 'views/stubs/search/components/CollapsibleText';
import InputNumeric from '../shared/inputs/InputNumeric';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import Header from './components/Header';
import Footer from './components/Footer';
import Details from './components/Details';

const CheckoutStep2 = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const detailsToggle = () => setDetailsVisible((prev) => !prev);

  return (
    <Form layout="vertical">
      <div className="checkout__wrap">
        <Header currentStep={2} />
        <main className="checkout__main">
          <div className="container">
            <Row gutter={24}>
              <Col lg={16}>
                <div className="checkout__form">
                  <h1 className="text-headline mb-24">
                    Trip Info &#38; Extras
                  </h1>
                  <div>
                    <h2 className="text-title mb-8">Trip information</h2>
                    <p className="mb-24">Tell the owner about your trip</p>
                    <Form.Item
                      label={(
                        <span className="main-input__label">
                          Where are you traveling to? Have you traveled in a
                          campervan or RV before? Any pets or extra guests
                          coming along?
                        </span>
                      )}
                    >
                      <Input placeholder="Type your answer" />
                    </Form.Item>
                    <Form.Item
                      className="mb-0"
                      label={(
                        <span className="main-input__label">
                          How did you hear about Vacation? (Optional)
                        </span>
                      )}
                    >
                      <Input placeholder="Type your answer" />
                    </Form.Item>
                  </div>
                  <Divider className="mt-24 mb-24" />
                  <div>
                    <h2 className="text-title mb-8">Delivery</h2>
                    <div className="d-flex d-md-block flex-column flex-md-row mb-16">
                      <span>
                        The owner will deliver the vehicle to the address of
                        your choosing.
                      </span>
                      {' '}
                      <span className="in-black">
                        $100.00 minimum • Max 30 miles.
                      </span>
                    </div>
                    <Form.Item className="ant-form-item-h-auto">
                      <Checkbox defaultChecked>
                        <span className="text-body">Request delivery</span>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item
                      className="mb-0"
                      label={(
                        <span className="main-input__label">
                          Enter delivery address
                        </span>
                      )}
                    >
                      <AutoComplete
                        allowClear
                        defaultValue="1352 Naped Street, Los Angeles"
                      >
                        <Input
                          prefix={<i className="icon icon-location" />}
                          placeholder="Location"
                        />
                      </AutoComplete>
                    </Form.Item>
                  </div>
                  <Divider className="mt-24 mb-24" />
                  <div>
                    <h2 className="text-title mb-24">Add-ons</h2>
                    <Row gutter={[24, { xs: 16, md: 24 }]}>
                      <Col md={8}>
                        <div className="checkout__form-card">
                          <div className="d-flex align-items-center justify-content-space-between mb-16">
                            <img
                              src="/images/listing/amenities-svg/bathroom/toilet_full_use.svg"
                              alt=""
                            />
                            <Tag color="default">
                              <span className="in-black">$5.00 per day</span>
                            </Tag>
                          </div>
                          <div className="text-subheader mb-8">Toilet</div>
                          <CollapsibleText className="checkout__details-warning-text mb-12">
                            A toilet is a piece of sanitary hardware used for
                            the collection or...
                          </CollapsibleText>
                          <div className="d-flex mt-auto">
                            <div className="flex-1">
                              <InputNumeric
                                className="main-input-numeric--checkout"
                                defaultValue={2}
                              />
                            </div>
                            <Button
                              className="ml-8"
                              type="secondary"
                              icon={<i className="icon icon-cross" />}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={8}>
                        <div className="checkout__form-card">
                          <div className="d-flex align-items-center justify-content-space-between mb-16">
                            <img
                              src="/images/edit_listing/add_ons/Tent.svg"
                              alt=""
                            />
                            <Tag color="default">
                              <span className="in-black">$5.00 per day</span>
                            </Tag>
                          </div>
                          <div className="text-subheader mb-8">Tent</div>
                          <CollapsibleText className="checkout__details-warning-text mb-12">
                            A tent is a shelter consisting of sheets of fabric
                            or other material...
                          </CollapsibleText>
                          <div className="mt-auto">
                            <Button className="w-100">Remove</Button>
                          </div>
                        </div>
                      </Col>
                      <Col md={8}>
                        <div className="checkout__form-card">
                          <div className="d-flex align-items-center justify-content-space-between mb-16">
                            <img
                              src="/images/listing/amenities-svg/edit_listing/essentials/Camping-Chairs.svg"
                              alt=""
                            />
                            <Tag color="default">
                              <span className="in-black">$25.00 each</span>
                            </Tag>
                          </div>
                          <div className="text-subheader mb-8">
                            Camping Chair
                          </div>
                          <p className="mb-12">Open size: 60x85x46/108(H)cm.</p>
                          <div className="mt-auto">
                            <Button type="secondary" className="w-100">
                              Add
                            </Button>
                          </div>
                        </div>
                      </Col>
                      <Col md={8}>
                        <div className="checkout__form-card">
                          <div className="d-flex align-items-center justify-content-space-between mb-16">
                            <img
                              src="/images/edit_listing/add_ons/Cooler.svg"
                              alt=""
                            />
                            <Tag color="default">
                              <span className="in-black">$5.00 per day</span>
                            </Tag>
                          </div>
                          <div className="text-subheader mb-8">Cooler</div>
                          <p className="mb-12">Yeti Soft Sided Cooler.</p>
                          <div className="mt-auto">
                            <Button type="secondary" className="w-100">
                              Add
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
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

export default CheckoutStep2;
