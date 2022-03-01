import { Divider } from 'antd';
import Modal from 'views/stubs/shared/Modal';

const AddOnsModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Add-ons
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>1x Toilet</p>
          <p className="in-black">$5.00</p>
        </div>
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>1x Tent</p>
          <p className="in-black">$10.00</p>
        </div>
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>4x Camping Chair</p>
          <p className="in-black">$80.00</p>
        </div>
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          <p>Cooler</p>
          <p className="in-black">$20.00</p>
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

export default AddOnsModal;
