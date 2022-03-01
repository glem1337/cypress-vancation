import classNames from 'classnames';
import { Button, Form } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import InputField from 'views/shared/InputField';

import Footer from '../../Footer';
import BackButton from '../../BackButton';

const BaseDiscountSingleComponent = (props) => {
  const {
    toggleOpenedState,
    weeklyDiscountPercentPrice,
    monthlyDiscountPercentPrice,
    isRange,
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

  if (isRange) {
    return null;
  }

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
            <h3 className="text-subheader mb-16">
              <FormattedMessage id="shared.baseDiscounts" />
            </h3>
            <Field
              type="number"
              name="weeklyDiscountPercent"
              component={InputField}
              label={{ id: 'shared.weeklyDiscount' }}
              tooltip={{
                id: 'addNewCamper.pricing.pricePerWeek',
                values: { price: `$${weeklyDiscountPercentPrice}` },
              }}
            >
              <span className="main-input__add-txt">%</span>
            </Field>
            <Field
              type="number"
              name="monthlyDiscountPercent"
              component={InputField}
              label={{ id: 'shared.monthlyDiscount' }}
              tooltip={{
                id: 'addNewCamper.pricing.pricePerMonth',
                values: { price: `$${monthlyDiscountPercentPrice}` },
              }}
            >
              <span className="main-input__add-txt">%</span>
            </Field>
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

BaseDiscountSingleComponent.propTypes = {
  toggleOpenedState: PropTypes.func.isRequired,
  weeklyDiscountPercentPrice: PropTypes.number.isRequired,
  monthlyDiscountPercentPrice: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isRange: PropTypes.bool.isRequired,
  isBackPopoverVisible: PropTypes.bool.isRequired,
  isDiscardPopoverVisible: PropTypes.bool.isRequired,
  showPopoverOrBack: PropTypes.func.isRequired,
  closePopover: PropTypes.func.isRequired,
  closePopoversAndBack: PropTypes.func.isRequired,
};

export default BaseDiscountSingleComponent;
