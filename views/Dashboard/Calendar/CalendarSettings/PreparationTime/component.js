import classNames from 'classnames';
import { Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import { CALENDAR_PREPARATION_TIME_OPTIONS } from 'constants/calendar';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';

import Footer from '../../Footer';
import BackButton from '../../BackButton';

const PreparationTimeComponent = (props) => {
  const {
    toggleOpenedState,
    isOpened,
    isBackPopoverVisible,
    isDiscardPopoverVisible,
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
        <i className="icon icon-time" />
        <span>
          <FormattedMessage id="shared.preparationTime" />
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
              <FormattedMessage id="shared.preparationTime" />
            </h3>
            <p className="mb-16">
              <FormattedMessage id="calendar.preparationTimeDescription" />
            </p>
            <Field
              name="time"
              className="main-input__field"
              optionLabelProp="label"
              component={SelectField}
              label={{ id: 'shared.days' }}
              placeholder={{ id: 'shared.select' }}
              items={CALENDAR_PREPARATION_TIME_OPTIONS}
              formItemClasses="mb-0"
            />
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
            savePrepare={showPopover({ popoverName: 'isSavePopoverVisible' })}
            saveConfirm={closePopoversAndSave({ props })}
            saveReject={closePopover({ popoverName: 'isSavePopoverVisible' })}
          />
        </Form>
      </div>
    </div>
  );
};

PreparationTimeComponent.propTypes = {
  toggleOpenedState: PropTypes.func.isRequired,
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

export default PreparationTimeComponent;
