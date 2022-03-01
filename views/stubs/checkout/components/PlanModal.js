/* eslint-disable react/prop-types */
import { Space } from 'antd';
import Modal from '../../shared/Modal';

const PlanModal = ({ visible, onClose }) => (
  <Modal visible={visible} onClose={onClose} className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title pr-24">Protection plan</h2>
      </div>
      <div className="main-modal__body">
        <div className="text-subheader font-400 mb-16">
          <span>Required Protection Plan</span>
          {' '}
          <span>
            <span className="in-gray-700">•</span>
            {' '}
            $38/Day
          </span>
        </div>
        <Space className="w-100" direction="vertical" size={16}>
          <div className="d-flex align-items-center">
            <img
              className="w-20"
              src="/images/listing/insurance/Deductible.svg"
              alt=""
            />
            <span className="ml-8">$2,000 Deductible</span>
          </div>
          <div className="d-flex align-items-center">
            <img
              className="w-20"
              src="/images/listing/insurance/Roadside_Assistance.svg"
              alt=""
            />
            <span className="ml-8">24/7 Roadside Assistance</span>
          </div>
          <div className="d-flex align-items-center">
            <img
              className="w-20"
              src="/images/listing/insurance/Insurance_Coverage.svg"
              alt=""
            />
            <span className="ml-8">$1 Million Liability Protection</span>
          </div>
          <div className="d-flex align-items-center">
            <img
              className="w-20"
              src="/images/listing/insurance/Damage_Protection.svg"
              alt=""
            />
            <span className="ml-8">Up To $200,000 Damage Protection</span>
          </div>
        </Space>
      </div>
    </div>
  </Modal>
);

export default PlanModal;
