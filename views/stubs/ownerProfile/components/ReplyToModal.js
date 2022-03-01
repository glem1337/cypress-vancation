import { Button, Input } from 'antd';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';
import Modal from '../../shared/Modal';

const ReplyToModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Reply to Bruce Hammond’s review
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="main-input-textarea-wrap">
          <Input.TextArea
            rows={5}
            placeholder="Add your reply"
          />
        </div>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large">
            Cancel
          </Button>
          <MainBtnGradient
            className="min-w-140 ml-16"
            text="Confirm"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default ReplyToModal;
