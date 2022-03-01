import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import Modal from 'views/shared/Modal';
import GradientButton from 'views/shared/GradientButton';

const RemoveCustomAddonModal = ({ onClose, submitHandler, isLoading }) => (
  <Modal onClose={onClose} className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title pr-24">
          <FormattedMessage id="dashboard.editCamper.addons.custom.modal.title" />
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          <FormattedMessage id="dashboard.editCamper.addons.custom.modal.description" />
        </p>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button disabled={isLoading} type="text" size="large" onClick={onClose}>
          <FormattedMessage id="shared.cancel" />
        </Button>
        <GradientButton
          className="min-w-140 ml-16"
          disabled={isLoading}
          onClick={submitHandler}
          size="large"
          text={{
            id: 'shared.ok',
          }}
          loading={isLoading}
        />
      </div>
    </div>
  </Modal>
);

RemoveCustomAddonModal.defaultProps = {
  isLoading: false,
};

RemoveCustomAddonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default RemoveCustomAddonModal;
