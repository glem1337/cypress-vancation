import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Modal from 'views/stubs/shared/Modal';

const AgreementSignedModal = () => (
  <Modal className="main-modal main-modal--big" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img
          className="mb-md-24"
          src="/images/listing/Success.svg"
          alt=""
        />
        <div className="mb-16 text-headline font-700">
          Departure agreement signed.
        </div>
        <p className="mb-24">
          Inform the renter that you signed all documents.
        </p>
        <div className="text-center">
          <MainBtnGradient
            text="Continue"
            className="min-w-140"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default AgreementSignedModal;
