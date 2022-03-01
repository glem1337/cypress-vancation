import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';

import BtnGradient from 'views/shared/BtnGradient';

const UploadErrorModal = ({ hideModal }) => (
  <Modal
    className="main-modal"
    closeIcon={null}
    visible
    footer={null}
    maskClosable={false}
  >
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          <FormattedMessage id="addNewCamper.photo.uploadError.title" />
        </h2>
      </div>
      <div className="main-modal__body text-align-center">
        <img
          className="mb-md-24"
          src="/images/Error.svg"
          alt=""
        />
        <p>
          <FormattedMessage id="addNewCamper.photo.uploadError.subTitle" />
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <BtnGradient
            className="min-w-160 ml-16"
            text={<FormattedMessage id="shared.ok" />}
            size="large"
            onClick={hideModal}
          />
        </div>
      </div>
    </div>
  </Modal>
);

UploadErrorModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default UploadErrorModal;
