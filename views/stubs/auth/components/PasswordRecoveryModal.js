import { Button } from 'antd';
import Modal from '../../shared/Modal';

const PasswordRecoveryModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Confirm your email
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="mt-24 mb-24 text-align-center">
          <img src="/images/auth/Reset_Password_Link.svg" alt="" />
        </div>
        <p className="mb-8">
          We sent a password recovery link to your email address:
        </p>
        <a href="" className="main-link d-inline-block mb-16 in-black font-600">
          rodney.harmon@gmail.com
        </a>
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Didn't receive the email? Check your junk mail or request another one.
        </p>
      </div>
      <div className="main-modal__footer justify-content-space-between">
        <Button
          type="link"
          className="p-0"
        >
          Go to Log in
        </Button>
        <Button
          type="secondary"
          size="large"
        >
          Resend recovery link
        </Button>
      </div>
    </div>
  </Modal>
);

export default PasswordRecoveryModal;
