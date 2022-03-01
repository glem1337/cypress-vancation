import React from 'react';
import {
  Col, Row, Divider,
} from 'antd';
import Modal from 'views/stubs/shared/Modal';
import LayoutListing from '../keyExchange/LayoutKeyExchange';

const DepartureAgreement = () => (
  <Modal className="main-modal main-modal--full-screen" closeIcon={false}>
    <LayoutListing>
      <Row gutter={24}>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            Do the inspection
          </h1>
          <p className="mb-24">
            Inspect the vehicle exterior and interior. Photograph any damage.
          </p>
        </Col>
        <Col span={24}>
          {/* TODO: To FRONT_END  here must be this component
           views/AddNewCamper/Photos/component.js
           */}
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
        <Col span={24}>
          <div className="mb-24 text-subheader">
            Photos from owner
          </div>
          <div>
            <Row gutter={24}>
              <Col span={12} md={8} xl={6}>
                <img className="photo-wrap" src="https://bit.ly/3iGoHBI" alt="" />
              </Col>
              <Col span={12} md={8} xl={6}>
                <img className="photo-wrap" src="https://bit.ly/3iGoHBI" alt="" />
              </Col>
              <Col span={12} md={8} xl={6}>
                <img className="photo-wrap" src="https://bit.ly/3iGoHBI" alt="" />
              </Col>
              <Col span={12} md={8} xl={6}>
                <img className="photo-wrap" src="https://bit.ly/3iGoHBI" alt="" />
              </Col>
              <Col span={12} md={8} xl={6}>
                <img className="photo-wrap" src="https://bit.ly/3iGoHBI" alt="" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </LayoutListing>
  </Modal>
);

export default DepartureAgreement;
