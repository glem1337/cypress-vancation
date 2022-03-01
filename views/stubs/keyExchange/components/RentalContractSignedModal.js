import React from 'react';
import Modal from 'views/stubs/shared/Modal';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';

const RentalContractSignedModal = () => (
  <Modal className="main-modal main-modal--big" closeIcon={false}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img
          className="mb-md-24"
          src="/images/listing/Success.svg"
          alt=""
        />
        <div className="mb-16 text-headline font-700">
          Rental contract signed.
        </div>
        <p className="mb-16">
          Begin the key exchange process when you meet with the renter.
        </p>
        <div className="main-modal__inner-gray">
          <p className="mb-8 text-subheader font-700">
            Next steps:
          </p>
          <p className="mb-8">
            •
            {' '}
            Make sure the renter signs the rental contract
          </p>
          <p>
            •
            {' '}
            Do a walkthrough with the renter before they hit the road
          </p>
        </div>
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

export default RentalContractSignedModal;
