import {
  Alert,
  Col,
  Input,
  Row,
  Select,
  Switch,
  Divider,
  Form,
} from 'antd';
import React from 'react';
import LayoutListing from './LayoutListing';

const weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const { Option } = Select;

const Pricing = () => (
  <LayoutListing>
    <Form layout="vertical">
      <Row>
        <Col lg={16}>
          <h1 className="text-headline mb-8">
            Set your Campervan or RV rental prices
          </h1>
          <p className="mb-24">
            This is your default nightly rate pricing,
            you can edit this pricing easily in the calendar after listing your camper.
          </p>
          <Alert
            type="warning"
            className="mb-24"
            showIcon
            icon={<i className="icon icon-idea" />}
            message="Do you rent this camper on another site? You can sync your calendars easily after submitting the listing."
          />
        </Col>
        <Col span={24}>
          <Row>
            <Col md={12} lg={8}>
              <div className="mb-16 text-subheader font-700">
                Default nightly rate
              </div>
              <div className="main-input-wrap-addtxt">
                <Form.Item
                  label={<span className="main-input__label">Cost per night</span>}
                >
                  <Input id="pernight" placeholder="$0" />
                  <span className="main-input__add-txt">per night</span>
                </Form.Item>
              </div>
              <div className="d-flex align-items-center mb-16">
                <Switch />
                <span className="ml-8">Customize by night of the week</span>
              </div>
              {weekDay.map((item) => (
                <div className="main-input-wrap-addtxt" key={item}>
                  <Form.Item
                    label={<span className="main-input__label">{item}</span>}
                  >
                    <Input id={item} placeholder="$0" />
                    <span className="main-input__add-txt">per night</span>
                  </Form.Item>
                </div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Row>
            <Col md={12} lg={8}>
              <div className="mb-8 text-subheader font-700">
                Base discounts
              </div>
              <p className="mb-24">
                Set up discounts that encourage longer bookings.
              </p>
              <div className="d-flex align-items-center mb-8">
                <Switch />
                <span className="ml-8">Offer weekly discount</span>
              </div>
              {/* When switch is active, change mb-24 to mb-16 and vice versa  */}
              <p className="mb-16 text-caption">
                Discounts for 7 nights or more.
              </p>
              <div className="main-input-wrap-addtxt main-input--has-message mb-20">
                <Form.Item
                  help={(
                    <p className="main-input__message">
                      <i className="main-input__message-icon icon icon-info" />
                      $2,250.00 per week
                    </p>
                  )}
                >
                  <Input placeholder="0" className="mb-0" />
                  <span className="main-input__add-txt">%</span>
                </Form.Item>
              </div>
              <div className="d-flex align-items-center mb-8">
                <Switch />
                <span className="ml-8">Offer monthly discount</span>
              </div>
              {/* When switch is active, change mb-24 to mb-16 and vice versa  */}
              <p className="mb-16 text-caption">
                Discounts for 7 nights or more.
              </p>
              <div className="main-input-wrap-addtxt main-input--has-message mb-20">
                <Form.Item
                  help={(
                    <p className="main-input__message">
                      <i className="main-input__message-icon icon icon-info" />
                      $9,856.00 per month
                    </p>
                  )}
                >
                  <Input placeholder="0" className="mb-0" />
                  <span className="main-input__add-txt">%</span>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <div className="mb-8 text-subheader font-700">
        Base discounts
      </div>
      <p className="mb-16">
        What is the minimum number of nights your guests can rent this rig for?
      </p>
      <div className="mb-36">
        <Row>
          <Col md={12} lg={8}>
            <Form.Item
              label={<span className="main-input__label">Nights</span>}
            >
              <Select
                id="Nights"
                name="fieldName"
                className="main-input__field"
                optionLabelProp="label"
              >
                <Option className="p-0" value="select1" label="+1">
                  <li className="main-dropdown__item">2 nights</li>
                </Option>
                <Option className="p-0" value="select2" label="+2">
                  <li className="main-dropdown__item">3 nights</li>
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  </LayoutListing>
);

export default Pricing;
