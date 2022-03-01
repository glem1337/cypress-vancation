import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import BtnGradient from 'views/shared/BtnGradient';

const LeavePageModal = ({
  discard,
  save,
  intl: { formatMessage },
}) => (
  <Modal
    className="main-modal"
    closeIcon={null}
    visible
    footer={null}
    maskClosable={false}
  >
    <div className="main-modal__container">
      <div className="main-modal__header main-modal__header-extended">
        <h2 className="main-modal__title">
          <FormattedMessage id="shared.leavePage" />
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          <FormattedMessage id="shared.leavePageConfirmation" />
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large" onClick={discard}>
            <FormattedMessage id="shared.discard" />
          </Button>
          <BtnGradient
            onClick={save}
            className="min-w-140 ml-16"
            text={formatMessage({ id: 'shared.save' })}
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

LeavePageModal.propTypes = {
  discard: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  intl: PropTypes.shape().isRequired,
};

export default LeavePageModal;
