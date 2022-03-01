import Modal from '../shared/Modal';

const LicenseFailedModal = () => (
  <Modal className="main-modal main-modal--big" closable={false}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img className="mb-md-24" src="/images/Error.svg" alt="" />
        <h2 className="text-headline font-700 mb-16">
          Driver’s License Verification Failed.
        </h2>
        <p>
          You failed to verify your driver’s license. Driver’s license
          verification is required to make a booking. Please contact support for
          further assistance.
        </p>
        <div className="d-flex flex-column flex-md-row mt-16">
          <div className="d-flex align-items-center ml-auto mr-auto mr-md-0">
            <img className="w-20" src="/images/Call.svg" alt="" />
            <span className="in-black ml-8">+1 766-732-6732</span>
          </div>
          <div className="d-flex align-items-center mt-16 mt-md-0 ml-auto ml-md-24 mr-auto">
            <img className="w-20" src="/images/Email.svg" alt="" />
            <a className="main-link ml-8" href="mailto:support@vancation.com">
              support@vancation.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export default LicenseFailedModal;
