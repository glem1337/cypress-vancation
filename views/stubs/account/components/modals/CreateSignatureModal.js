import { Button } from 'antd';
import SignaturePad from 'react-signature-pad';
import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const CreateSignatureModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Create signature
        </h2>
      </div>
      <div className="main-modal__body background-gray-100">
        <SignaturePad clearButton="true" />
      </div>
      <div className="main-modal__footer">
        <Button type="link">
          Clear
        </Button>
        <div className="ml-auto">
          <Button type="text" size="large">
            Cancel
          </Button>
          <MainBtnGradient
            className="min-w-140 ml-16"
            text="Create"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default CreateSignatureModal;
