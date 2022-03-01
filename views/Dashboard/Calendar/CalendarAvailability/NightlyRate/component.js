import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Switch, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import InputField from 'views/shared/InputField';
import { WEEK_NIGHT_PRICE_DAYS } from 'constants/camperPricing';
import BackButton from '../../BackButton';

import Footer from '../../Footer';

const NightlyRateComponent = (props) => {
  const {
    toggleOpenedState,
    toggleCustomPrice,
    values: {
      isCustomCost,
    },
    isRange,
    showOptions,
    isLoading,
    isOpened,
    isBackPopoverVisible,
    isDiscardPopoverVisible,
    isValid,
    submitForm,
    showPopoverOrBack,
    closePopover,
    closePopoversAndBack,
  } = props;

  if (!isRange) {
    return null;
  }

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleOpenedState}>
        <i className="icon icon-price" />
        <span>
          <FormattedMessage id="shared.nightlyRate" />
        </span>
        <i className="icon icon-right ml-auto" />
      </Button>
      <div
        className={classNames(
          'calendar-listing__side-slideout',
          isOpened && 'calendar-listing__side-slideout--active',
        )}
      >
        <Form layout="vertical">
          <div className="calendar-listing__side-slideout__main">
            <div className="mb-16">
              <BackButton
                isPopoverVisible={isBackPopoverVisible}
                discardPrepare={showPopoverOrBack({
                  popoverName: 'isBackPopoverVisible',
                  props,
                })}
                discardConfirm={closePopoversAndBack({ props })}
                discardReject={closePopover({ popoverName: 'isBackPopoverVisible' })}
              />
            </div>
            <h3 className="text-subheader mb-16">
              <FormattedMessage id="shared.nightlyRate" />
            </h3>
            <Field
              disabled={isCustomCost}
              type="number"
              name="costPerNight"
              component={InputField}
              prefix="$"
              label={{ id: 'addNewCamper.pricing.costPerNight' }}
              placeholder="..."
            >
              <span className="main-input__add-txt">
                <FormattedMessage id="addNewCamper.pricing.perNight" />
              </span>
            </Field>
            {showOptions && (
              <>
                <div className={classNames(
                  'd-flex align-items-center',
                  isCustomCost && 'mb-16',
                  )}
                >
                  <Switch
                    onChange={toggleCustomPrice}
                    checked={isCustomCost}
                  />
                  <span className="ml-8">
                    <FormattedMessage id="addNewCamper.pricing.customizeByNightOfTheWeek" />
                  </span>
                </div>
                {isCustomCost && WEEK_NIGHT_PRICE_DAYS.map(({ DAY, NAME }) => (
                  <Field
                    key={DAY}
                    type="number"
                    id={`weeklyPrice.${NAME}`}
                    name={`weeklyPrice.${NAME}`}
                    component={InputField}
                    prefix="$"
                    label={DAY}
                  >
                    <span className="main-input__add-txt">
                      <FormattedMessage id="addNewCamper.pricing.perNight" />
                    </span>
                  </Field>
                ))}
              </>
            )}
          </div>
          <Footer
            submit={submitForm}
            isLoading={isLoading}
            canSubmit={isValid}
            isDiscardPopoverVisible={isDiscardPopoverVisible}
            discardPrepare={showPopoverOrBack({
              popoverName: 'isDiscardPopoverVisible',
              props,
            })}
            discardConfirm={closePopoversAndBack({ props })}
            discardReject={closePopover({ popoverName: 'isDiscardPopoverVisible' })}
          />
        </Form>
      </div>
    </div>
  );
};

NightlyRateComponent.propTypes = {
  toggleOpenedState: PropTypes.func.isRequired,
  toggleCustomPrice: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  isRange: PropTypes.bool.isRequired,
  showOptions: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isBackPopoverVisible: PropTypes.bool.isRequired,
  isDiscardPopoverVisible: PropTypes.bool.isRequired,
  showPopoverOrBack: PropTypes.func.isRequired,
  closePopover: PropTypes.func.isRequired,
  closePopoversAndBack: PropTypes.func.isRequired,
};

NightlyRateComponent.defaultProps = {
  showOptions: false,
};

export default NightlyRateComponent;
