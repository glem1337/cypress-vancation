import Modal from 'views/stubs/shared/Modal';

const CancellationPolicyModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Cancellation policy
        </h2>
      </div>
      <div className="main-modal__body">
        <p className="mb-8 in-black text-subheader font-400">
          Easy Going
        </p>
        <p>
          Travelers who cancel at least 14 days before check-in will get back
          100% of the amount paid. If you cancel between 7 and 14 days before
          check-in, you&lsquo;ll get back 50%. Otherwise, you won&lsquo;t get a refund.
        </p>
      </div>
    </div>
  </Modal>
);

export default CancellationPolicyModal;
