import React from 'react';
import { Modal, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import BtnGradient from 'views/shared/BtnGradient';

const IdVerificationModal = ({
  isUserVerified,
  navigateToHomePage,
}) => (
  <Modal
    className="main-modal main-modal--big"
    closeIcon={null}
    visible
    footer={null}
    maskClosable={false}
  >
    <div className="main-modal__container">
      <div className="main-modal__body">
        <img
          className="mb-md-24"
          src="/images/listing/Success.svg"
          alt=""
        />
        <div className="mb-16 text-headline font-700">
          <FormattedMessage id="addNewCamper.idModal.title" />
        </div>
        <p className="mb-16">
          <FormattedMessage id="addNewCamper.idModal.description1" />
        </p>
        {!isUserVerified && (
          <>
            <p className="mb-48 mb-md-24">
              <FormattedMessage id="addNewCamper.idModal.description2" />
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <BtnGradient
                text={{ id: 'shared.verifyMyLicence' }}
                className="min-w-140 mr-16"
                size="large"
              />
              <Button size="large" type="link" onClick={navigateToHomePage}>
                <FormattedMessage id="shared.skipForNow" />
              </Button>
            </div>
          </>
        )}
        {isUserVerified && (
          <div className="d-flex align-items-center justify-content-center">
            <BtnGradient
              text={{ id: 'shared.continue' }}
              className="min-w-140 mr-16"
              size="large"
              onClick={navigateToHomePage}
            />
          </div>
        )}
      </div>
    </div>
  </Modal>
);

IdVerificationModal.propTypes = {
  isUserVerified: PropTypes.bool,
  navigateToHomePage: PropTypes.func.isRequired,
};

IdVerificationModal.defaultProps = {
  isUserVerified: false,
};

export default IdVerificationModal;
