import React from 'react';
import * as R from 'ramda';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import yup from 'lib/yupLocalised';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { MODAL_DESCRIPTION } from 'constants/camperDetails/owner';

import { handleSubmitWithProps } from 'utils/form/handleSubmit';

import { loadingSelector } from 'state/data/selectors';

import { camperBlockedPeriodsSelector } from 'state/concepts/calendar/selectors';
import { fetchCamperCalendar as fetchCamperCalendarAction } from 'state/concepts/camper/actions';

import { createCamperBookingInquiry } from 'state/concepts/booking/actions';
import { createCamperBookingInquiryEndpoint } from 'state/concepts/booking/endpoints';

import AskQuestionModalComponent from './component';

class AskQuestionModal extends React.Component {
  static propTypes = {
    fetchCamperCalendar: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    values: PropTypes.shape().isRequired,
  };

  onActiveStartDateChange = ({ activeStartDate }) => {
    const { fetchCamperCalendar, camperId } = this.props;

    fetchCamperCalendar({
      camperId,
      startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).startDate,
      endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).endDate,
    });
  };

  get isFormValid() {
    const { isValid, values } = this.props;

    if (R.isNil(values.dateRange)) {
      return false;
    }

    return isValid;
  }

  render() {
    return (
      <AskQuestionModalComponent
        {...this.props}
        onActiveStartDateChange={this.onActiveStartDateChange}
        isFormValid={this.isFormValid}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  blockedPeriods: camperBlockedPeriodsSelector(state),
  isLoading: loadingSelector(
    state,
    createCamperBookingInquiryEndpoint.endpoint,
  ),
});

const mapDispatchToProps = {
  fetchCamperCalendar: fetchCamperCalendarAction,
  onSubmit: createCamperBookingInquiry,
};

export { AskQuestionModal as AskQuestionModalContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      dateRange: null,
      description: '',
    }),
    validationSchema: yup.object().shape({
      dateRange: yup.mixed().required(),
      description: yup
        .string()
        .min(MODAL_DESCRIPTION.MIN, {
          id: 'yup.string.min',
          values: {
            min: MODAL_DESCRIPTION.MIN,
          },
        })
        .max(MODAL_DESCRIPTION.MAX, {
          id: 'addNewCamper.form.listingDescription.length',
        })
        .required(),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(AskQuestionModal);
