import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const EmailConfirmModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Confirm your email
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="mt-24 mb-24 text-align-center">
          <img src="/images/auth/Email_Confirmation_Link.svg" alt="" />
        </div>
        <p className="mb-8">We sent a confirmation link to your email address:</p>
        <a href="" className="main-link d-inline-block mb-16 in-black font-600">rodney.harmon@gmail.com</a>
        <p>Follow this link to confirm your email.</p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <MainBtnGradient
            secondary
            text="Resend confirmation link"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default EmailConfirmModal;
