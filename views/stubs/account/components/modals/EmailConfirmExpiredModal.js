import Modal from '../../../shared/Modal';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const EmailConfirmExpiredModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Email confirmation link has expired
        </h2>
      </div>
      <div className="main-modal__body">
        <div className="mt-24 mb-24 text-align-center">
          <img src="/images/auth/Email_Confirmation_Link_Expired.svg" alt="" />
        </div>
        <p>
          Unfortunately, your confirmation link has expired.
          Please change your email once again and remember
          you have 24 hours to confirm your email.
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <MainBtnGradient
            className="min-w-140"
            secondary
            text="Change email"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default EmailConfirmExpiredModal;
