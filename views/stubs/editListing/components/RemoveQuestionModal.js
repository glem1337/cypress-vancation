/* eslint-disable react/prop-types */
import { Button } from 'antd';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';
import Modal from '../../shared/Modal';

const RemoveQuestionModal = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    onClose={onClose}
    closable={false}
    className="main-modal"
  >
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title pr-24">Remove question</h2>
      </div>
      <div className="main-modal__body">
        <p>Are you sure you want to delete this question?</p>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button type="text" size="large" onClick={onClose}>
          Cancel
        </Button>
        <MainBtnGradient
          className="min-w-140 ml-16"
          text="Remove"
          size="large"
        />
      </div>
    </div>
  </Modal>
);

export default RemoveQuestionModal;
