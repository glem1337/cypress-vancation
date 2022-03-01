import React from 'react';
import {
  Col, Row, Divider, Form, Input, Select,
} from 'antd';
import LayoutListing from './LayoutKeyExchange';
import TooltipIcon from '../shared/TooltipIcon';

const { Option } = Select;

const FinalCondition = () => (
  <LayoutListing withBackBtn>
    <Form layout="vertical">
      <Row gutter={24}>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            Final condition check
          </h1>
          <p className="mb-24">
            You should now do a final condition check to ensure that the RV is roadworthy.
          </p>
        </Col>
        <Col xl={16}>
          <div className="text-subheader mb-8 font-700">
            Please check all of the following
          </div>
          <p className="mb-24">
            Do a condition check.
          </p>
        </Col>
        <Col span={24}>
          <Row gutter={24}>
            <Col span={12} md={6}>
              <p className="mb-16 in-black">
                •
                {' '}
                Tire pressure
              </p>
              <p className="mb-16 in-black">
                •
                {' '}
                Windshield fluid
              </p>
            </Col>
            <Col span={12} md={6}>
              <p className="mb-16 in-black">
                •
                {' '}
                Generator oil
              </p>
              <p className="mb-16 in-black">
                •
                {' '}
                Tire tread
              </p>
            </Col>
            <Col span={12} md={6}>
              <p className="mb-16 in-black">
                •
                {' '}
                Transmission fluid
              </p>
              <p className="mb-16 in-black">
                •
                {' '}
                Motor oil
              </p>
            </Col>
            <Col span={12} md={6}>
              <p className="mb-16 in-black">
                •
                {' '}
                Radiator fluid
              </p>
              <p className="mb-16 in-black">
                •
                {' '}
                Mirrors
              </p>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
        <Col xl={16}>
          <div className="text-subheader mb-8 font-700">
            Fuel, generator, and mileage readings
          </div>
          <p className="mb-16">
            Record the following readings below with the renter present.
          </p>
        </Col>
        <Col xl={16}>
          <Row gutter={24}>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Odometer miles</span>}
              >
                <Input type="text" id="Cost" className="" placeholder="0" />
                <span className="main-input__add-txt">miles</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Generator</span>}
              >
                <Input type="text" id="Cost" className="" placeholder="0" />
                <span className="main-input__add-txt">hours</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Fuel level</span>}
              >
                <Select
                  id="fieldID2"
                  name="fieldName"
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select level"
                >
                  <Option className="p-0" value="select1" label="+1">
                    <li className="main-dropdown__item">10</li>
                  </Option>
                  <Option className="p-0" value="select2" label="+2">
                    <li className="main-dropdown__item">11</li>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Propane level</span>}
              >
                <Select
                  id="fieldID2"
                  name="fieldName"
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select level"
                >
                  <Option className="p-0" value="select1" label="+1">
                    <li className="main-dropdown__item">10</li>
                  </Option>
                  <Option className="p-0" value="select2" label="+2">
                    <li className="main-dropdown__item">11</li>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Fresh water level</span>}
              >
                <Select
                  id="fieldID2"
                  name="fieldName"
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select level"
                >
                  <Option className="p-0" value="select1" label="+1">
                    <li className="main-dropdown__item">10</li>
                  </Option>
                  <Option className="p-0" value="select2" label="+2">
                    <li className="main-dropdown__item">11</li>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Battery charge level</span>}
              >
                <Select
                  id="fieldID2"
                  name="fieldName"
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select level"
                >
                  <Option className="p-0" value="select1" label="+1">
                    <li className="main-dropdown__item">10</li>
                  </Option>
                  <Option className="p-0" value="select2" label="+2">
                    <li className="main-dropdown__item">11</li>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Tire condition</span>}
              >
                <Select
                  id="fieldID2"
                  name="fieldName"
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select condition"
                >
                  <Option className="p-0" value="select1" label="+1">
                    <li className="main-dropdown__item">10</li>
                  </Option>
                  <Option className="p-0" value="select2" label="+2">
                    <li className="main-dropdown__item">11</li>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <div className="main-input-wrap-addtxt d-flex align-items-center">
                <Form.Item
                  className="flex-grow-1"
                  label={<span className="main-input__label">Tank dumped</span>}
                >
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
                <TooltipIcon
                  className="edit-list__float-tooltip"
                  iconClass="icon-info-f"
                  phrase="some phrase"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  </LayoutListing>
);

export default FinalCondition;
