import Modal from 'views/stubs/shared/Modal';

const ProtectionPlanModal = () => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          Owner fees and processing
        </h2>
      </div>
      <div className="main-modal__body">
        <p className="mb-8 in-black text-subheader font-400">
          Basic
        </p>
        <p className="mb-8 in-black ">
          You will pay $28/day
        </p>
        <ul className="simple-list">
          <li>
            State-minimum liability coverage
          </li>
          <li>
            Collision and comp up to $1M
          </li>
          <li>
            Deductibles from $2,000 - $4,000 depending on vehicle
          </li>
        </ul>
      </div>
    </div>
  </Modal>
);

export default ProtectionPlanModal;
