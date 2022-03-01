import Modal from '../../shared/Modal';

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
        <p className="mb-8">
          Unfortunately, your confirmation link has expired.
          Please sign up once again and remember you have 24 hours to confirm your email.
        </p>
      </div>
    </div>
  </Modal>
);

export default EmailConfirmExpiredModal;
