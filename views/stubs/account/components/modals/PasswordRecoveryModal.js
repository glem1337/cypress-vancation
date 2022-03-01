import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const PasswordRecoveryModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Check your email
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
      <div className="main-modal__footer">
        <div className="ml-auto">
          <MainBtnGradient
            className="min-w-180"
            secondary
            text="Resend recovery link"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default PasswordRecoveryModal;
