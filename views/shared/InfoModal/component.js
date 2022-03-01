import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import BtnGradient from 'views/shared/BtnGradient';

const InfoModal = ({
  title,
  subTitle,
  hideModal,
  iconData,
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
        <i className={`icon ${iconData.color} ${iconData.view} main-modal__header-icon `} />
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
          <BtnGradient
            onClick={hideModal}
            className="min-w-140"
            text="Ok"
            size="large"
          />
        </div>
      </div>
    </div>
  </Modal>
);

InfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  iconData: PropTypes.shape().isRequired,
};

export default InfoModal;
