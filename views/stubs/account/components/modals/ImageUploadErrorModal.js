import { Button } from 'antd';
import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const ImageUploadErrorModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Image upload error
        </h2>
      </div>
      <div className="main-modal__body text-align-center">
        <img
          className="mb-md-24"
          src="/images/Error.svg"
          alt=""
        />
        <p>
          Please use JPG or PNG image smaller than 10 MB.
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large">
            Cancel
          </Button>
          <MainBtnGradient
            className="min-w-160 ml-16"
            text="Select other image"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default ImageUploadErrorModal;
