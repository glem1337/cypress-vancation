import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { CAMPER_STATUS } from 'constants/camper';
import { MODAL_CONFIG_BY_STATUS } from 'constants/dashboardAllCampers';

import Modal from 'views/shared/Modal';
import Button from 'views/shared/Button';
import GradientButton from 'views/shared/GradientButton';

const CamperStatusModal = ({ onClose, handleSubmit, isLoading, status }) => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          <FormattedMessage {...MODAL_CONFIG_BY_STATUS[status].TITLE} />
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          <FormattedMessage {...MODAL_CONFIG_BY_STATUS[status].DESCRIPTION} />
        </p>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button
          disabled={isLoading}
          onClick={onClose}
          type="text"
          size="large"
          text={{ id: 'shared.cancel' }}
        />
        {status === CAMPER_STATUS.REMOVED ? (
          <Button
            className="min-w-140 ml-16"
            size="large"
            danger
            disabled={isLoading}
            loading={isLoading}
            text={MODAL_CONFIG_BY_STATUS[status].BUTTON}
            onClick={handleSubmit}
          />
        ) : (
          <GradientButton
            className="min-w-140 ml-16"
            size="large"
            disabled={isLoading}
            loading={isLoading}
            text={MODAL_CONFIG_BY_STATUS[status].BUTTON}
            onClick={handleSubmit}
          />
        )}
      </div>
    </div>
  </Modal>
);

CamperStatusModal.defaultProps = {
  isLoading: false,
};

CamperStatusModal.propTypes = {
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default CamperStatusModal;
