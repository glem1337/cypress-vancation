import classNames from 'classnames';
import { Button, Form } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import { MINIMAL_NIGHT_STAY_OPTIONS } from 'constants/camperPricing';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';

import Footer from '../../Footer';
import BackButton from '../../BackButton';

const MinNightStayComponent = (props) => {
  const {
    toggleOpenedState,
    isOpened,
    isLoading,
    isBackPopoverVisible,
    isDiscardPopoverVisible,
    isValid,
    submitForm,
    showPopoverOrBack,
    closePopover,
    closePopoversAndBack,
  } = props;

  return (
    <div className="calendar-listing__side-main-item">
      <Button className="ant-btn-slideout" onClick={toggleOpenedState}>
        <i className="icon icon-moon" />
        <span>
          <FormattedMessage id="shared.minimumNightStay" />
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
              <FormattedMessage id="calendar.minimumNightStay" />
            </h3>
            <Field
              name="minimalNightStay"
              className="main-input__field"
              optionLabelProp="label"
              component={SelectField}
              label={{ id: 'addNewCamper.pricing.nights' }}
              placeholder={{ id: 'shared.select' }}
              items={MINIMAL_NIGHT_STAY_OPTIONS}
            />
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

MinNightStayComponent.propTypes = {
  toggleOpenedState: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isBackPopoverVisible: PropTypes.bool.isRequired,
  isDiscardPopoverVisible: PropTypes.bool.isRequired,
  showPopoverOrBack: PropTypes.func.isRequired,
  closePopover: PropTypes.func.isRequired,
  closePopoversAndBack: PropTypes.func.isRequired,
};

export default MinNightStayComponent;
