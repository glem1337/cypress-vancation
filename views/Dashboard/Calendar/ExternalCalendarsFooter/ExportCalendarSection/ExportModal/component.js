import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { FormattedMessage } from 'react-intl';

import Modal from 'views/shared/Modal';
import BtnGradient from 'views/shared/BtnGradient';

const ExportModal = ({ url, onClose, onCopy }) => (
  <Modal className="main-modal">
    <div className="main-modal__container">
      <div className="main-modal__header">
        <h2 className="main-modal__title">
          <FormattedMessage id="calendar.export.modalTitle" />
        </h2>
      </div>
      <div className="main-modal__body">
        <span className="main-input__label mb-4">
          <FormattedMessage id="calendar.export.modalLabel" />
        </span>
        <div className="d-flex">
          <Input className="main-input-group--left flex-1 mb-0" value={url} />
          <BtnGradient
            onClick={onCopy}
            className="main-input-group--right"
            text={{ id: 'shared.copy' }}
            size="large"
          />
        </div>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button onClick={onClose} type="text" size="large">
          <FormattedMessage id="shared.cancel" />
        </Button>
        <BtnGradient
          className="min-w-140 ml-16"
          href={url}
          download={url}
          text={{ id: 'shared.download' }}
          size="large"
          icon={<i className="icon icon-download font-18" />}
        />
      </div>
    </div>
  </Modal>
);

ExportModal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

export default ExportModal;
