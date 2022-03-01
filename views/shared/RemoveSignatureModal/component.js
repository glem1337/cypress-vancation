import React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const RemoveSignatureComponent = ({
  title,
  subTitle,
  cancel,
  remove,
  isLoading,
}) => (
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
          {title}
        </h2>
      </div>
      <div className="main-modal__body">
        <p>
          {subTitle}
        </p>
      </div>
      <div className="main-modal__footer">
        <div className="ml-auto">
          <Button type="text" size="large" onClick={cancel}>
            <FormattedMessage id="shared.cancel" />
          </Button>
          <Button
            type="danger"
            size="large"
            className="min-w-140 ml-16"
            onClick={remove}
            loading={isLoading}
            disabled={isLoading}
          >
            <FormattedMessage id="shared.remove" />
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

RemoveSignatureComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  cancel: PropTypes.func,
  remove: PropTypes.func,
  isLoading: PropTypes.bool,
};

RemoveSignatureComponent.defaultProps = {
  cancel: undefined,
  remove: undefined,
  isLoading: false,
};

export default RemoveSignatureComponent;
