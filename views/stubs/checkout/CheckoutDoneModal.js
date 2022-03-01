import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import Modal from '../shared/Modal';

const CheckoutDoneModal = () => (
  <Modal className="main-modal main-modal--big" closable={false}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img className="mb-md-24" src="/images/listing/Success.svg" alt="" />
        <h2 className="text-headline font-700 mb-16">
          Verify Driver’s License.
        </h2>
        <p>
          You successfully created your booking. Please verify your driver’s
          license to proceed to your rental. You have 48 hours after booking
          confirmation to verify your driver’s license otherwise your booking
          will be cancelled.
        </p>
        <div className="d-flex justify-content-center mt-48 mt-md-24">
          <MainBtnGradient
            text="Verify driver's license"
            size="large"
            className="min-w-180"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default CheckoutDoneModal;
