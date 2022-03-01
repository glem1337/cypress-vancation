import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'views/shared/Button';
import Modal from 'views/shared/Modal';

const RemoveModal = ({ onClose, handleSubmit, isLoading }) => (
  <Modal className="main-modal" closeIcon={null}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          <FormattedMessage id="calendar.remove.modalTitle" />
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          <FormattedMessage id="calendar.remove.modalDescription" />
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
        <Button
          className="min-w-140 ml-16"
          size="large"
          danger
          disabled={isLoading}
          loading={isLoading}
          text={{ id: 'shared.remove' }}
          onClick={handleSubmit}
        />
      </div>
    </div>
  </Modal>
);

RemoveModal.defaultProps = {
  isLoading: false,
};

RemoveModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default RemoveModal;
