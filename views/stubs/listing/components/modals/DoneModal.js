import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Modal from 'views/stubs/shared/Modal';

const DoneModal = () => (
  <Modal className="main-modal main-modal--big" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img
          className="mb-md-24"
          src="/images/listing/Success.svg"
          alt=""
        />
        <div className="mb-16 text-headline font-700">
          Congrats! Your listing is now being reviewed.
        </div>
        <p className="mb-48 mb-md-24">
          The listing will automatically be published on Vancation after
          moderation is completed. Go to your owner dashboard to add additional
          details or sync your rental calendar with other rental sites.
        </p>
        <div className="d-flex align-items-center justify-content-center">
          <MainBtnGradient
            text="Continue"
            className="min-w-140 mr-16"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default DoneModal;
