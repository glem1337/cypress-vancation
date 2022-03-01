import classNames from 'classnames';
import { Button, Form, Switch } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import InputField from 'views/shared/InputField';

import Footer from '../../Footer';
import BackButton from '../../BackButton';

const BaseDiscountComponent = (props) => {
  const {
    toggleOpenedState,
    weeklyDiscountPercentPrice,
    monthlyDiscountPercentPrice,
    isOpened,
    isBackPopoverVisible,
    isDiscardPopoverVisible,
    values: {
      monthlyDiscount,
      weeklyDiscount,
    },
    onWeeklyDiscountChange,
    onMonthlyDiscountChange,
    isLoading,
    isValid,
    submitForm,
    isSavePopoverVisible,
    showPopoverOrBack,
    closePopover,
    showPopover,
    closePopoversAndBack,
    closePopoversAndSave,
  } = props;

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleOpenedState}>
        <i className="icon icon-discount" />
        <span>
          <FormattedMessage id="shared.baseDiscounts" />
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
            <h3 className="text-subheader mb-8">
              <FormattedMessage id="shared.baseDiscounts" />
            </h3>
            <p className="mb-16">
              <FormattedMessage id="addNewCamper.pricing.baseDiscountsSubTitle" />
            </p>
            <div className="mb-16">
              <div className="d-flex align-items-center mb-8">
                <Switch
                  checked={weeklyDiscount}
                  onChange={onWeeklyDiscountChange}
                />
                <span className="ml-8">
                  <FormattedMessage id="addNewCamper.pricing.offerWeeklyTitle" />
                </span>
              </div>
              <p className="text-caption">
                <FormattedMessage id="addNewCamper.pricing.offerWeeklySubTitle" />
              </p>
            </div>
            {weeklyDiscount && (
              <Field
                type="number"
                name="weeklyDiscountPercent"
                component={InputField}
                tooltip={{
                  id: 'addNewCamper.pricing.pricePerWeek',
                  values: { price: `$${weeklyDiscountPercentPrice}` },
                }}
              >
                <span className="main-input__add-txt">%</span>
              </Field>
            )}
            <div className={classNames(monthlyDiscount && 'mb-16')}>
              <div className="d-flex align-items-center mb-8">
                <Switch
                  checked={monthlyDiscount}
                  onChange={onMonthlyDiscountChange}
                />
                <span className="ml-8">
                  <FormattedMessage id="addNewCamper.pricing.offerMonthlyTitle" />
                </span>
              </div>
              <p className="text-caption">
                <FormattedMessage id="addNewCamper.pricing.offer28MonthlySubTitle" />
              </p>
            </div>
            {monthlyDiscount && (
              <Field
                type="number"
                name="monthlyDiscountPercent"
                component={InputField}
                tooltip={{
                  id: 'addNewCamper.pricing.pricePerMonth',
                  values: { price: `$${monthlyDiscountPercentPrice}` },
                }}
                formItemClasses="mb-0"
              >
                <span className="main-input__add-txt">%</span>
              </Field>
            )}
          </div>
          <Footer
            submitBtnText={{ id: 'shared.save' }}
            submit={submitForm}
            isLoading={isLoading}
            canSubmit={isValid}
            isSavePopoverVisible={isSavePopoverVisible}
            isDiscardPopoverVisible={isDiscardPopoverVisible}
            discardPrepare={showPopoverOrBack({
              popoverName: 'isDiscardPopoverVisible',
              props,
            })}
            discardConfirm={closePopoversAndBack({ props })}
            discardReject={closePopover({ popoverName: 'isDiscardPopoverVisible' })}
            withSavePopover
            withSavePopoverWarning
            savePrepare={showPopover({ popoverName: 'isSavePopoverVisible' })}
            saveConfirm={closePopoversAndSave({ props })}
            saveReject={closePopover({ popoverName: 'isSavePopoverVisible' })}
          />
        </Form>
      </div>
    </div>
  );
};

BaseDiscountComponent.propTypes = {
  toggleOpenedState: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  weeklyDiscountPercentPrice: PropTypes.number.isRequired,
  monthlyDiscountPercentPrice: PropTypes.number.isRequired,
  onWeeklyDiscountChange: PropTypes.func.isRequired,
  onMonthlyDiscountChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpened: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isBackPopoverVisible: PropTypes.bool.isRequired,
  isDiscardPopoverVisible: PropTypes.bool.isRequired,
  isSavePopoverVisible: PropTypes.bool.isRequired,
  showPopoverOrBack: PropTypes.func.isRequired,
  closePopover: PropTypes.func.isRequired,
  showPopover: PropTypes.func.isRequired,
  closePopoversAndBack: PropTypes.func.isRequired,
  closePopoversAndSave: PropTypes.func.isRequired,
};

export default BaseDiscountComponent;
