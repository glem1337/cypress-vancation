import { Divider } from 'antd';
import Modal from 'views/stubs/shared/Modal';
import TooltipIcon from '../TooltipIcon';

const OwnerFeesProcessingModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Owner fees and processing
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>Cleaning fee</p>
          <p className="in-black">$5.00</p>
        </div>
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>
            150 miles per day
            <TooltipIcon
              phrase="Overage charge - $0.50 per mile"
              iconClass="icon-info-f"
            />
          </p>
          <p className="in-black">Free</p>
        </div>
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>Unlimited generator hours</p>
          <p className="in-black">Free</p>
        </div>
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>Service fee</p>
          <p className="in-black">$200.00</p>
        </div>
        <Divider className="mt-0 mb-16" />
        <div className="d-flex align-items-center justify-content-space-between">
          <p className="text-subheader">Est. Total</p>
          <p className="text-subheader">$115.00</p>
        </div>
      </div>
    </div>
  </Modal>
);

export default OwnerFeesProcessingModal;
