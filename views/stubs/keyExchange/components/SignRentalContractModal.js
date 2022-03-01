import React from 'react';
import { Button } from 'antd';

import Modal from 'views/stubs/shared/Modal';
import GradientButton from 'views/shared/GradientButton';

const SignRentalContractModal = () => (
  <Modal
    className="main-modal main-modal--full-screen main-modal--sign-rental"
    closable={false}
  >
    <div className="main-modal__container">
      <div className="main-modal__header">
        <div className="container d-flex align-items-center justify-content-space-between">
          <h2 className="main-modal__title">Sign rental contract</h2>
          <Button
            type="secondary"
            shape="circle"
            size="large"
            icon={<i className="icon icon-cross" />}
          />
        </div>
      </div>
      <div className="main-modal__body">
        <div className="container h-100">
          <iframe
            className="w-100 h-100"
            title="pdf"
            src="http://www.africau.edu/images/default/sample.pdf"
            frameBorder="0"
          />
        </div>
      </div>
      <div className="main-modal__footer">
        <div className="container d-flex w-100">
          <GradientButton
            className="min-w-140 ml-auto"
            text="Sign"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

export default SignRentalContractModal;
