import React from 'react';
import {
  Col, Row, Form, Input,
} from 'antd';
import Modal from 'views/stubs/shared/Modal';
import LayoutEditDeparture from './LayoutEditDeparture';
import TooltipIcon from '../shared/TooltipIcon';

const RenterResponsibilities = () => (
  <Modal className="main-modal main-modal--full-screen" closeIcon={false}>
    <LayoutEditDeparture>
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <h1 className="text-headline mb-8">
              Renter responsibilities
            </h1>
            <p className="mb-24">
              Please use this time to remind the renter of their responsibilities and any fees that
              may be incurred should those responsibilities not be met.
            </p>
          </Col>
          <Col span={24}>
            <Row
              gutter={24}
              justify="space-between"
            >
              <Col md={12} xl={8}>
                <Form.Item
                  label={<span className="main-input__label">Mileage fee</span>}
                >
                  <Input type="text" id="Cost" className="" value="0" disabled />
                  <span className="main-input__add-txt">per mile</span>
                </Form.Item>
              </Col>
              <Col md={11} xl={14}>
                <p className="mb-16 mt-md-20">
                  This rental includes 20 miles per day. Additional miles are charged the mileage
                  overage fee.
                </p>
              </Col>
              <Col md={12} xl={8}>
                <Form.Item
                  label={<span className="main-input__label">Generator fee</span>}
                >
                  <Input type="text" id="Cost" className="" value="0" disabled />
                  <span className="main-input__add-txt">per hour</span>
                </Form.Item>
              </Col>
              <Col md={11} xl={14}>
                <p className="mb-16 mt-md-20">
                  This rental includes 10 hours per day. Additional hours are charged the generator
                  overage fee.
                </p>
              </Col>
              <Col md={12} xl={8}>
                <div className="main-input-wrap-addtxt d-flex align-items-center">
                  <Form.Item
                    className="flex-grow-1"
                    label={<span className="main-input__label">Dumping fee</span>}
                  >
                    <Input type="text" id="Cost" className="" placeholder="$0" />
                  </Form.Item>
                  <TooltipIcon
                    className="edit-list__float-tooltip"
                    iconClass="icon-info-f"
                    phrase="some phrase"
                  />
                </div>
              </Col>
              <Col md={11} xl={14}>
                <p className="mb-16 mt-md-20">
                  Unless otherwise noted, the renter is responsible for dumping the black and grey
                  tanks.
                </p>
              </Col>
              <Col md={12} xl={8}>
                <Form.Item
                  label={<span className="main-input__label">Fuel fill-up fee</span>}
                >
                  <Input type="text" id="Cost" className="" placeholder="$0" />
                  <span className="main-input__add-txt">per quarter tank</span>
                </Form.Item>
              </Col>
              <Col md={11} xl={14}>
                <p className="mb-16 mt-md-20">
                  It is the responsibility of the renter to return the fuel tanks with the same
                  level
                  of
                  fuel with which they were provided.
                </p>
              </Col>
              <Col md={12} xl={8}>
                <div className="main-input-wrap-addtxt d-flex align-items-center">
                  <Form.Item
                    className="flex-grow-1"
                    label={<span className="main-input__label">Excessively late drop-off fee</span>}
                  >
                    <Input type="text" id="Cost" className="" placeholder="$0" />
                    <span className="main-input__add-txt">per hour</span>
                  </Form.Item>
                  <TooltipIcon
                    className="edit-list__float-tooltip"
                    iconClass="icon-info-f"
                    phrase="some phrase"
                  />
                </div>
              </Col>
              <Col md={11} xl={14}>
                <p className="mb-16 mt-md-20">
                  If the late return interferes with another booking, the late fee is the full
                  nightly
                  rate each eight hour period the vehicle is late plus an additional $100
                  administrative
                  fee.
                </p>
              </Col>
              <Col md={12} xl={8}>
                <Form.Item
                  label={<span className="main-input__label">Toilet</span>}
                >
                  <Input type="text" id="Cost" className="" placeholder="$0" />
                  <span className="main-input__add-txt">per day</span>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </LayoutEditDeparture>
  </Modal>
);

export default RenterResponsibilities;
