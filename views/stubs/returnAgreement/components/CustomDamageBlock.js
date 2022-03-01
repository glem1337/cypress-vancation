import React from 'react';
import {
  Input, Button, Form, Row, Col,
} from 'antd';

const randomId = Math.round(Math.random() * 1000);

const CustomDamageBlock = () => (
  <div className="custom-acc-wrap custom-damage-wrap">
    <div className="flex-grow-1">
      <Form.Item
        label={<span className="main-input__label w-100">Damage description</span>}
      >
        <Input className="w-100" type="text" id={randomId} />
      </Form.Item>
    </div>
    <div className="custom-acc-wrap__sec-input">
      <Form.Item
        label={<span className="main-input__label w-100">Estimated cost to repair</span>}
      >
        <Input
          className="w-100 mb-0"
          type="text"
          id={randomId * 2}
          placeholder="$0"
        />
      </Form.Item>
    </div>
    <div className="w-100">
      <button
        type="button"
        className="main-link in-blue-1000 font-700"
      >
        Add damage photos
      </button>
    </div>
    <div className="w-100">
      <Row gutter={16}>
        <Col span={24}>
          {/* TODO: To FRONT_END  here must be this component
           views/AddNewCamper/Photos/component.js
           */}
        </Col>
      </Row>
    </div>
    <div className="custom-acc-wrap__close">
      <Button
        type="secondary"
        icon={<i className="icon icon-cross" />}
      />
    </div>
  </div>
);

export default CustomDamageBlock;
