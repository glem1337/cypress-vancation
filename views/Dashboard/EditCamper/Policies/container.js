import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import * as R from 'ramda';

import {
  CAMPER_INCLUSION,
  POLICIES_FORM_DEFAULT_VALUES,
  POLICIES_FORM_VALUES,
} from 'constants/camper';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { leavePagePrepare } from 'utils/camper/leavePageHelper';

import {
  fetchCamper,
  updateCamperPolicies,
} from 'state/concepts/camper/actions';
import {
  camperPoliciesSelector,
  isCamperExistSelector,
  camperSelector,
} from 'state/concepts/camper/selectors';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import { dataDeleteEntity } from 'state/data/actions';

import { loadingSelector } from 'state/data/selectors';
import { updateCamperPolicesEndpoint } from 'state/concepts/camper/endpoints';

import PoliciesComponent from './component';

class Policies extends React.Component {
  static defaultProps = {
    camper: null,
  };

  static propTypes = {
    camper: PropTypes.shape(),
    handleSubmit: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setFormikState: PropTypes.func.isRequired,
    values: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
    touched: PropTypes.shape().isRequired,
    router: PropTypes.shape().isRequired,
  };

  leavePage = (withSaving, redirectRoute) => async () => {
    const { hideModal, setFieldValue, router } = this.props;

    if (withSaving) {
      await setFieldValue('redirectRoute', redirectRoute);

      await this.onSaveClickHandler();
    } else {
      router.push(redirectRoute);
      hideModal();
    }
  };

  leavePagePrepare = leavePagePrepare.bind(this);

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    ctx.store.dispatch(
      dataDeleteEntity({
        kind: 'camperRule',
      }),
    );

    const inclusions = [
      CAMPER_INCLUSION.OWNER,
      CAMPER_INCLUSION.CAMPER_RULE,
      // Have to add (this) due to backend has changed architecture of pricing info
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    return { camperId };
  };

  requestNoticeChangeHandler = (isChecked) => {
    const { setFieldValue } = this.props;

    if (!isChecked) {
      setFieldValue(
        'autoBlockedDays',
        POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
      );
    }
  };

  onReviewSelectHandler = () => {
    const { setFormikState, values, errors, touched } = this.props;

    const formikState = {
      errors,
      touched,
      values: {
        ...values,
        autoBlockedDays: POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
        requestNotice: POLICIES_FORM_DEFAULT_VALUES.REQUEST_NOTICE,
      },
    };

    setFormikState(formikState);
  };

  onReviewClickHandler = async () => {
    const { handleSubmit, hideModal, setFieldValue } = this.props;

    await setFieldValue('bookingApprovalPolicy', POLICIES_FORM_VALUES.REVIEW);

    hideModal();

    handleSubmit();
  };

  onSaveClickHandler = async () => {
    const { handleSubmit, showModal, values, camper } = this.props;

    const isUserVerified = R.compose(
      R.pathOr(false, ['owner', 'idVerified']),
      R.defaultTo({}),
    )(camper);

    if (
      values.bookingApprovalPolicy === POLICIES_FORM_VALUES.INSTANT_BOOK
      && !isUserVerified
    ) {
      showModal({
        modalType: 'EDIT_POLICIES_ID_VERIFICATION_MODAL',
        modalProps: {
          onReview: this.onReviewClickHandler,
        },
      });

      return;
    }

    handleSubmit();
  };

  render = () => (
    <PoliciesComponent
      {...this.props}
      submitHandler={this.onSaveClickHandler}
      requestNoticeChangeHandler={this.requestNoticeChangeHandler}
      onReviewSelectHandler={this.onReviewSelectHandler}
      leavePagePrepare={this.leavePagePrepare}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  camperPolicy: camperPoliciesSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updateCamperPolicesEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateCamperPolicies,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { Policies as PoliciesContainer };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ camperPolicy }) => ({
      bookingApprovalPolicy: camperPolicy.bookingApprovalPolicy,
      cancellationPolicy: camperPolicy.cancellationPolicy,
      requestNotice: camperPolicy.requestNotice,
      autoBlockedDays: camperPolicy.autoBlockedDays,
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  injectIntl,
  withRouter,
)(Policies);
