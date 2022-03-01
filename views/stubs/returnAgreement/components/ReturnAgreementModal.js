import React from 'react';
import { Button } from 'antd';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Modal from 'views/stubs/shared/Modal';

const ReturnAgreementModal = () => (
  <Modal className="main-modal main-modal--big" closable={false}>
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img
          className="mb-md-24"
          src="/images/listing/Success.svg"
          alt=""
        />
        <div className="mb-16 text-headline font-700">
          Return completed.
        </div>
        <p className="mb-16">
          You have completed the rental return, now check out some trip highlights and leave the
          renter a review so they can go on another adventure.
        </p>
        <div className="main-modal__inner-gray">
          <p className="mb-8 text-subheader font-700">
            Important information:
          </p>
          <p className="mb-24">
            After the unit has been returned, the owner has up to 48 hours to request any claims
            against the security deposit or request additional charges be made to the renter (i.e.
            excess mileage, fuel refill, etc.).
          </p>
          <div className="mb-24">
            <p>
              In order to file a claim, you will need:
            </p>
            <p>
              •
              {' '}
              Pre-trip and post-trip photos
            </p>
            <p>
              •
              {' '}
              90-day inspection forms
            </p>
            <p>
              •
              {' '}
              Signed RV departure form
            </p>
            <p>
              •
              {' '}
              Signed RV Return form
            </p>
          </div>
          <p className="mb-24">
            The renter has up to 48 hours to pay the additional fees or dispute the claims. Settled
            claims in excess of the security deposit may be charged to the primary renter’s credit
            card on file with Vancation.
          </p>
          <p>
            Note that all security deposit claims and additional charges are subject to a 2.95%
            credit card processing fee.
          </p>
        </div>
        <div className="text-center">
          <Button
            size="large"
            className="min-w-140 mr-16"
            type="secondary"
          >
            Leave a review
          </Button>
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

export default ReturnAgreementModal;
