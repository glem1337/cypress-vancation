import React from 'react';
import {
  Col, Row, Form, Switch, Button,
} from 'antd';
import LayoutListing from '../keyExchange/LayoutKeyExchange';
import CustomDamageBlock from './components/CustomDamageBlock';

const ReturnAgreement = () => (
  <LayoutListing>
    <Form layout="vertical">
      <Row gutter={24}>
        <Col xl={16}>
          <Form.Item className="ant-form-item-h-auto mb-8">
            <div className="d-flex align-items-center">
              <Switch />
              <h1 className="text-headline ml-16">Report damage (if any)</h1>
            </div>
          </Form.Item>
          <p className="mb-24">
            Remember to document the vehicle condition upon return in case there is damage.
          </p>
        </Col>
        <Col xl={16}>
          <CustomDamageBlock />
        </Col>
        <Col span={24}>
          <Button
            className="mt-8"
            type="secondary"
          >
            Add damage
          </Button>
        </Col>
      </Row>
    </Form>
  </LayoutListing>
);

export default ReturnAgreement;
