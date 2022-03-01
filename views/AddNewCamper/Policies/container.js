import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { withRouter } from 'next/router';
import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { CAMPER_INCLUSION } from 'constants/camper';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';

import ROUTES from 'constants/routes';
import {
  createCamperPolicies,
  checkPreviousStepCompleteness,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import {
  camperPoliciesSelector,
  isCamperExistSelector,
  camperCompletenessSelector,
} from 'state/concepts/camper/selectors';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';
import { dataDeleteEntity } from 'state/data/actions';

import PoliciesComponent from './component';

class Policies extends React.PureComponent {
  static propTypes = {
    router: PropTypes.shape().isRequired,
    camperId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setLeavePageMethod: PropTypes.func.isRequired,
  };

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(dataDeleteEntity({
      kind: 'camperRule',
    }));

    const inclusions = [
      CAMPER_INCLUSION.OWNER,
      CAMPER_INCLUSION.CAMPER_RULE,
      // Have to add (this) due to backend has changed architecture of pricing info
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(checkPreviousStepCompleteness({
      key: ROUTES.ADD_NEW_CAMPER.POLICIES.KEY,
      camperId,
      ctx,
    }));

    return { camperId };
  };

  constructor(props) {
    super(props);

    props.setLeavePageMethod(this.leavePagePrepare);
  }

  goBack = () => {
    const {
      router,
      camperId,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_FEES.PATH, camperId);

    router.push(route);

    hideModal();
  }

  saveAndGoBack = async () => {
    const {
      camperId,
      handleSubmit,
      hideModal,
      setFieldValue,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_FEES.PATH, camperId);

    await setFieldValue('redirectRoute', route);

    handleSubmit();

    hideModal();
  }

  onBackButtonClick = async () => {
    await this.props.validateForm();

    const {
      dirty,
      showModal,
      isValid,
    } = this.props;

    if (dirty && isValid) {
      showModal({
        modalType: 'LEAVE_PAGE_MODAL',
        modalProps: {
          discard: this.goBack,
          save: this.saveAndGoBack,
        },
      });

      return;
    }

    this.goBack();
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  render = () => (
    <PoliciesComponent
      {...this.props}
      onBackButtonClick={this.onBackButtonClick}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camperPolicy: camperPoliciesSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  onSubmit: createCamperPolicies,
  showModal: showModalAction,
  hideModal: hideModalAction,
  setLeavePageMethod: setLeavePageMethodAction,
};

export { Policies as PoliciesContainer };
export default compose(
  attachLayout(AddNewCamperLayout),
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ camperPolicy }) => ({
      booking_approval_policy: camperPolicy.bookingApprovalPolicy,
      cancellation_policy: camperPolicy.cancellationPolicy,
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
  injectIntl,
)(Policies);
