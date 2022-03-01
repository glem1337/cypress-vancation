import { Button } from 'antd';
import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const UnpublishCamper = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Unpublish camper
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          Are you sure you want to unpublish this camper?
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large">
            Cancel
          </Button>
          <MainBtnGradient
            className="min-w-140 ml-16"
            text="Unpublish"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default UnpublishCamper;
