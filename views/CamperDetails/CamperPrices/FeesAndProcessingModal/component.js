import React from 'react';
import { Modal, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import TooltipIcon from 'views/shared/TooltipIcon';

import useContainer from './hook';

const FeesAndProcessingModal = (props) => {
  const {
    closeModal,
    cleaningFee,
    mileage,
    generator,
    serviceFee,
    estTotal,
    customFees,
  } = useContainer(props);

  return (
    <Modal
      className="main-modal camper-fees-processing-modal"
      closable={false}
      visible
      title={null}
      footer={null}
    >
      <div className="main-modal__container">
        <div className="main-modal__header">
          <h2 className="main-modal__title">
            <FormattedMessage id="shared.ownerFeesAndProcessing" />
          </h2>
          <div
            className="camper-fees-processing-modal__close-icon-wrapper"
            role="button"
            onClick={closeModal}
          >
            <CloseOutlined className="camper-fees-processing-modal__close-icon" />
          </div>
        </div>
        <div className="main-modal__body">
          <div className="d-flex align-items-center justify-content-space-between mb-16">
            <p>
              <FormattedMessage id="shared.cleaningFee" />
            </p>
            <p className="in-black">{cleaningFee}</p>
          </div>
          {!mileage.isUnlimited && (
            <div className="d-flex align-items-center justify-content-space-between mb-16">
              <p>
                <FormattedMessage
                  id="camperDetails.book.modal.milesPerPeriod"
                  values={{ value: mileage.milesPerDay }}
                />
                <TooltipIcon
                  phrase={(
                    <FormattedMessage
                      id="camperDetails.book.modal.milesOverageCharge"
                      values={{ value: mileage.milesOverage }}
                    />
                )}
                  iconClass="icon-info-f"
                />
              </p>
              <p className="in-black">
                <FormattedMessage id="shared.free" />
              </p>
            </div>
          )}
          {mileage.isUnlimited && (
            <div className="d-flex align-items-center justify-content-space-between mb-16">
              <p>
                <FormattedMessage id="camperDetails.tripFees.miles.unlimited" />
              </p>
            </div>
          )}
          {!generator.isUnlimited && (
            <div className="d-flex align-items-center justify-content-space-between mb-16">
              <p>
                <FormattedMessage
                  id="camperDetails.book.modal.generatorHoursPerPeriod"
                  values={{ value: generator.generatorHours }}
                />
                <TooltipIcon
                  phrase={(
                    <FormattedMessage
                      id="camperDetails.book.modal.generatorOverageCharge"
                      values={{ value: generator.generatorOverage }}
                    />
                )}
                  iconClass="icon-info-f"
                />
              </p>
              <p className="in-black">
                <FormattedMessage id="shared.free" />
              </p>
            </div>
          )}
          {generator.isUnlimited && (
            <div className="d-flex align-items-center justify-content-space-between mb-16">
              <p>
                <FormattedMessage id="camperDetails.tripFees.generator.unlimited" />
              </p>
            </div>
          )}
          {customFees.map(fee => (
            <div
              className="d-flex align-items-center justify-content-space-between mb-16"
              key={fee.id}
            >
              <p>
                {fee.name}
              </p>
              <p className="in-black">{fee.price}</p>
            </div>
          ))}
          <div className="d-flex align-items-center justify-content-space-between mb-16">
            <p>
              <FormattedMessage id="shared.serviceFee" />
            </p>
            <p className="in-black">{serviceFee}</p>
          </div>
          <Divider className="mt-0 mb-16" />
          <div className="d-flex align-items-center justify-content-space-between">
            <p className="text-subheader">
              <FormattedMessage id="shared.estTotal" />
            </p>
            <p className="text-subheader">
              {estTotal}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeesAndProcessingModal;
