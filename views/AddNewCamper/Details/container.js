import React from 'react';
import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import ROUTES from 'constants/routes';
import yup from 'lib/yupLocalised';
import { FORM_VALIDATION } from 'constants/camper';
import {
  createNameAndDescription,
  checkPreviousStepCompleteness,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import {
  camperSelector,
  isCamperExistSelector,
  camperCompletenessSelector,
} from 'state/concepts/camper/selectors';
import { createNameAndDescriptionEndpoint } from 'state/concepts/camper/endpoints';
import { loadingSelector } from 'state/data/selectors';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';
import isPresent from 'utils/isPresent';

import CamperDetailsComponent from './component';

class ListingDetails extends React.PureComponent {
  static propTypes = {
    router: PropTypes.shape().isRequired,
    camperId: PropTypes.string.isRequired,
    dirty: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    values: PropTypes.shape().isRequired,
    setLeavePageMethod: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
  }

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(fetchCamper(camperId, 'delivery_information'));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(checkPreviousStepCompleteness({
      key: ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.KEY,
      camperId,
      ctx,
    }));

    return { camperId };
  }

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

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH, camperId);

    router.push(route);

    hideModal();
  }

  saveAndGoBack = async () => {
    const {
      camperId,
      setFieldValue,
      handleSubmit,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH, camperId);

    await setFieldValue('redirectRoute', route);

    hideModal();

    handleSubmit();
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
  }

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  get canSaveAndContinue() {
    const { values, isLoading, isValid } = this.props;

    if (isLoading || !isPresent(values.listingName)) {
      return false;
    }

    return isValid;
  }

  render = () => (
    <CamperDetailsComponent
      {...this.props}
      onBackButtonClick={this.onBackButtonClick}
      canSaveAndContinue={this.canSaveAndContinue}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camper: camperSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createNameAndDescriptionEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: createNameAndDescription,
  showModal: showModalAction,
  hideModal: hideModalAction,
  setLeavePageMethod: setLeavePageMethodAction,
};

export { ListingDetails as ListingDetailsContainer };
export default compose(
  attachLayout(AddNewCamperLayout),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: (props) => ({
      listingName: props.camper?.name || '',
      listingDescription: props.camper?.description || '',
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
    validationSchema: yup.object().shape({
      listingName: yup
        .string()
        .max(FORM_VALIDATION.MAX_LISTING_NAME, { id: 'addNewCamper.form.listingName.length' })
        .required(),
      listingDescription: yup
        .string()
        .max(FORM_VALIDATION.MAX_LISTING_DESCRIPTION, { id: 'addNewCamper.form.listingDescription.length' }),
    }),
  }),
)(ListingDetails);
