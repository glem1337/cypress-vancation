import React from 'react';
import {
  Col, Row, Divider, Form, Input, Switch,
} from 'antd';
import LayoutListing from './LayoutKeyExchange';

const KeyPhotos = () => (
  <LayoutListing>
    <Form layout="vertical">
      <Row gutter={24}>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            Upload vehicle photos
          </h1>
          <p className="mb-24">
            These photos are to show the existing condition of the vehicle and to note any
            pre-existing damage.
            {' '}
            <a href="" className="main-link in-blue-1000 font-600">Recommended Photos</a>
          </p>
          <Form.Item className="ant-form-item-h-auto">
            <div className="d-flex align-items-center">
              <Switch />
              <span className="ml-8">Reuse previous photos</span>
            </div>
          </Form.Item>
        </Col>
        <Col span={24}>
          {/* TODO: To FRONT_END  here must be this component
           views/AddNewCamper/Photos/component.js
           */}
        </Col>
        <Col span={24}>
          <Divider className="mt-0 mb-28" />
        </Col>
        <Col span={24}>
          <div className="text-subheader mb-32 font-700">
            Pre-existing damage
          </div>
          <Form.Item className="ant-form-item-h-auto">
            <div className="d-flex align-items-center">
              <Switch />
              <span className="ml-8">Reuse damage description</span>
            </div>
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label={<span className="main-input__label w-100">Exterior damages (optional)</span>}
          >
            <div className="main-input-textarea-wrap mb-0">
              <Input.TextArea
                rows={5}
              />
            </div>
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label={<span className="main-input__label w-100">Interior damages (optional)</span>}
          >
            <div className="main-input-textarea-wrap mb-0">
              <Input.TextArea
                rows={5}
              />
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </LayoutListing>
);

export default KeyPhotos;
