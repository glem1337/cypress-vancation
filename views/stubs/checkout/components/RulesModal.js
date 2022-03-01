/* eslint-disable react/prop-types */
import {
 Row, Col, Button, Divider, Tooltip, Space,
} from 'antd';
import Modal from '../../shared/Modal';

const RulesModal = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    onClose={onClose}
    className="main-modal main-modal--mob-full"
  >
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title pr-24">
          Rules, Travel Restrictions, Policies, Health &#38; Safety
        </h2>
      </div>
      <div className="main-modal__body">
        <div>
          <h3 className="text-subheader mb-16">Rules</h3>
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <div className="d-flex align-items-center in-black">
                <img src="/images/edit_listing/rules/Pets-Allowed.svg" alt="" />
                <span className="ml-8">Pets Allowed</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-center in-black">
                <img
                  src="/images/edit_listing/rules/Smoking-Allowed.svg"
                  alt=""
                />
                <span className="ml-8">Smoking Allowed</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-center in-black">
                <img
                  src="/images/edit_listing/rules/Festival-Approved.svg"
                  alt=""
                />
                <span className="ml-8">Festival Approved</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-center in-black">
                <img
                  src="/images/edit_listing/rules/Allow-Unlimited-Miles.svg"
                  alt=""
                />
                <span className="ml-8">Allow Unlimited Miles</span>
              </div>
            </Col>
          </Row>
          <div className="mt-16">
            <Button className="ant-btn-main-link">Show all (6)</Button>
          </div>
        </div>
        <Divider className="mt-24 mb-24" />
        <div>
          <h3 className="text-subheader mb-16">Travel Restrictions</h3>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div className="mb-16">Location</div>
              <Row gutter={[24, 16]}>
                <Col span={12}>
                  <div className="d-flex align-items-center in-black checkout__inactive-item">
                    <img src="/images/edit_listing/rules/Mexico.svg" alt="" />
                    <span className="ml-8">Mexico</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="d-flex align-items-center in-black">
                    <img src="/images/edit_listing/rules/Canada.svg" alt="" />
                    <span className="ml-8">Canada</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="d-flex align-items-center in-black checkout__inactive-item">
                    <img
                      src="/images/edit_listing/rules/Burning-Man.svg"
                      alt=""
                    />
                    <span className="ml-8">Burning Man</span>
                  </div>
                </Col>
              </Row>
              <div className="mt-16">
                <Button className="ant-btn-main-link">Show all (4)</Button>
              </div>
            </Col>
            <Col span={24}>
              <div className="mb-16">Roads</div>
              <Row gutter={[24, 16]}>
                <Col span={12}>
                  <div className="d-flex align-items-center in-black checkout__inactive-item">
                    <img
                      src="/images/edit_listing/rules/4x4-Only-Roads.svg"
                      alt=""
                    />
                    <span className="ml-8">4x4 Only Roads</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="d-flex align-items-center in-black">
                    <img src="/images/edit_listing/rules/Off-Road.svg" alt="" />
                    <span className="ml-8">Off Road</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="d-flex align-items-center in-black checkout__inactive-item">
                    <img
                      src="/images/edit_listing/rules/Snow-Icy-Road-Conditions.svg"
                      alt=""
                    />
                    <span className="ml-8">Snow / Icy Road Conditions</span>
                  </div>
                </Col>
              </Row>
              <div className="mt-16">
                <Button className="ant-btn-main-link">Show all (6)</Button>
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="mt-24 mb-24" />
        <div>
          <h3 className="text-subheader mb-16">Policies</h3>
          <div className="mb-8">Cancellation policy</div>
          <div className="text-subheader font-400 mb-8">Easy Going</div>
          <p className="mb-24">
            Travelers who cancel at least 14 days before check-in will get back
            100% of the amount paid. If you cancel between 7 and 14 days before
            check-in, you&apos;ll get back 50%. Otherwise, you won&apos;t get a
            refund.
          </p>
          <Row gutter={24}>
            <Col span={12}>
              <div className="mb-8">Minimum stay</div>
              <div className="text-subheader">2 nights</div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-flex-start mb-8">
                <span>Refundable security deposit</span>
                <Tooltip title="Some info">
                  <i className="icon icon-info-f main-tooltip-icon" />
                </Tooltip>
              </div>
              <div className="text-subheader">$2,000.00</div>
            </Col>
          </Row>
        </div>
        <Divider className="mt-24 mb-24" />
        <div>
          <h3 className="text-subheader mb-16">Health &#38; Safety</h3>
          <Space direction="vertical" size={16}>
            <div className="d-flex align-items-flex-start in-black">
              <img
                src="/images/edit_listing/health_safety/Social-Distancing.svg"
                alt=""
              />
              <span className="ml-8">
                Social-distancing and other COVID-19-related guidelines apply
              </span>
            </div>
            <div className="d-flex align-items-center in-black">
              <img src="/images/edit_listing/health_safety/Camera.svg" alt="" />
              <span className="ml-8">Security Camera / Recording Device</span>
            </div>
            <div className="d-flex align-items-center in-black">
              <img src="/images/edit_listing/health_safety/Alarm.svg" alt="" />
              <span className="ml-8">Carbon Monoxide Alarm</span>
            </div>
            <div className="d-flex align-items-center in-black">
              <img
                src="/images/edit_listing/health_safety/Smoke-Alarm.svg"
                alt=""
              />
              <span className="ml-8">Smoke Alarm</span>
            </div>
          </Space>
          <div className="mt-16">
            <Button className="ant-btn-main-link">Show all (6)</Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export default RulesModal;
