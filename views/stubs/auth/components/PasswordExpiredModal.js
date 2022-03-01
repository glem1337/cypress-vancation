import { Button } from 'antd';
import Modal from '../../shared/Modal';

const PasswordExpiredModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Password recovery link has expired
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="mt-24 mb-24 text-align-center">
          <img src="/images/auth/Reset_Password_Link_Expired.svg" alt="" />
        </div>
        <p>
          Unfortunately, your password recovery link has expired.
          Please try to restore the password once again and keep in mind
          that you have 24 hours to follow the link from your email.
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button
            type="secondary"
            size="large"
          >
            Reset password
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

export default PasswordExpiredModal;
