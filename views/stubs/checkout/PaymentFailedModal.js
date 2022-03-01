import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import Modal from '../shared/Modal';

const PaymentFailedModal = () => (
  <Modal className="main-modal main-modal--big" closable={false}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img className="mb-md-24" src="/images/Error.svg" alt="" />
        <h2 className="text-headline font-700 mb-16">Payment failed.</h2>
        <p>
          Please contact your bank to verify the availability of using your
          credit card.
        </p>
      </div>
      <div className="d-flex justify-content-center mt-48 mt-md-24">
        <MainBtnGradient text="OK" size="large" className="min-w-140" />
      </div>
    </div>
  </Modal>
);

export default PaymentFailedModal;
