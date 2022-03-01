/* eslint-disable react/prop-types */
import { Divider, Space } from 'antd';
import Modal from '../../shared/Modal';

const AddonsModal = ({ visible, onClose }) => (
  <Modal visible={visible} onClose={onClose} className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title pr-24">Add-ons</h2>
      </div>
      <div className="main-modal__body">
        <Space className="w-100" direction="vertical" size={16}>
          <div className="d-flex justify-content-space-between">
            <span>1x Toilet</span>
            <span>$5.00</span>
          </div>
          <div className="d-flex justify-content-space-between">
            <span>1x Tent</span>
            <span>$10.00</span>
          </div>
          <div className="d-flex justify-content-space-between">
            <span>4x Camping Chair</span>
            <span>$80.00</span>
          </div>
          <div className="d-flex justify-content-space-between">
            <span>Cooler</span>
            <span>$20.00</span>
          </div>
        </Space>
        <Divider className="mt-16 mb-16" />
        <div className="d-flex justify-content-space-between">
          <span className="text-subheader font-700">Est. Total</span>
          <span className="text-subheader font-700">$115.00</span>
        </div>
      </div>
    </div>
  </Modal>
);

export default AddonsModal;
