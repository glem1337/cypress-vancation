import { Button } from 'antd';
import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const ChangeDefaultSettings = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">Change default pricing settings</h2>
      </div>
      <div className="main-modal__body">
        <p>
          Are you sure you want to change default pricing settings? All existing
          custom prices will be reset to default.
        </p>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button type="text" size="large">
          Cancel
        </Button>
        <MainBtnGradient
          className="min-w-140 ml-16"
          text="Change"
          size="large"
        />
      </div>
    </div>
  </Modal>
);

export default ChangeDefaultSettings;
