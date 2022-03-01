/* eslint-disable react/prop-types */
import { Divider, Space, Tooltip } from 'antd';
import Modal from '../../shared/Modal';

const FeesModal = ({ visible, onClose }) => (
  <Modal visible={visible} onClose={onClose} className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title pr-24">Owner fees and processing</h2>
      </div>
      <div className="main-modal__body">
        <Space className="w-100" direction="vertical" size={16}>
          <div className="d-flex justify-content-space-between">
            <span>Cleaning fee</span>
            <span>$100.00</span>
          </div>
          <div className="d-flex justify-content-space-between">
            <div className="d-flex align-items-center">
              <span>150 miles per day</span>
              <Tooltip title="Overage charge - $0.50 per mile">
                <i className="icon icon-info-f main-tooltip-icon font-18" />
              </Tooltip>
            </div>
            <span>Free</span>
          </div>
          <div className="d-flex justify-content-space-between">
            <span>Unlimited generator hours</span>
            <span>Free</span>
          </div>
          <div className="d-flex justify-content-space-between">
            <span>Service fee</span>
            <span>$250.00</span>
          </div>
        </Space>
        <Divider className="mt-16 mb-16" />
        <div className="d-flex justify-content-space-between">
          <span className="text-subheader font-700">Est. Total</span>
          <span className="text-subheader font-700">$537.30</span>
        </div>
      </div>
    </div>
  </Modal>
);

export default FeesModal;
