import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import Modal from 'views/shared/Modal';
import BtnGradient from 'views/shared/BtnGradient';

const VerificationModal = ({ onReview, onClose }) => (
  <Modal className="main-modal main-modal--big" onClose={onClose} closable>
    <div className="main-modal__container">
      <div className="d-flex pt-48 mb-48">
        <i className="font-32 mr-16 icon icon-info in-yellow-1000" />
        <div className="mb-16 text-headline font-20 font-700">
          <FormattedMessage id="dashboard.editCamper.noticeDays.warning" />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <BtnGradient
          text={{ id: 'shared.verifyMyLicence' }}
          className="min-w-140 mr-16"
          size="large"
        />
        <Button size="large" type="link" onClick={onReview}>
          <FormattedMessage id="dashboard.editCamper.verifyModal.verify.btn" />
        </Button>
      </div>
    </div>
  </Modal>
);

VerificationModal.propTypes = {
  onReview: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VerificationModal;
