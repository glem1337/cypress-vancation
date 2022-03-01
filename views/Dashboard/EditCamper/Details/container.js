import React from 'react';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import yup from 'lib/yupLocalised';

import isPresent from 'utils/isPresent';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';

import { CAMPER_INCLUSION, FORM_VALIDATION } from 'constants/camper';

import { updateNameAndDescriptionEndpoint } from 'state/concepts/camper/endpoints';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import { loadingSelector } from 'state/data/selectors';

import {
  updateNameAndDescription,
  fetchCamper,
} from 'state/concepts/camper/actions';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';

import DetailsComponent from './component';

class Details extends React.Component {
  static defaultProps = {
    isLoading: false,
  };

  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    values: PropTypes.shape().isRequired,
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    ctx.store.dispatch(
      fetchCamper(camperId, CAMPER_INCLUSION.DELIVERY_INFORMATION),
    );

    return { camperId };
  };

  get canSaveAndContinue() {
    const { values, isLoading, isValid } = this.props;

    if (isLoading || !isPresent(values.listingName)) {
      return false;
    }

    return isValid;
  }

  render() {
    return (
      <DetailsComponent
        {...this.props}
        canSaveAndContinue={this.canSaveAndContinue}
        leavePagePrepare={this.leavePagePrepare}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camper: camperSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updateNameAndDescriptionEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateNameAndDescription,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { Details as DetailsContainer };
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => ({
      listingName: props.camper?.name || '',
      listingDescription: props.camper?.description || '',
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
    validationSchema: yup.object().shape({
      listingName: yup
        .string()
        .max(FORM_VALIDATION.MAX_LISTING_NAME, {
          id: 'addNewCamper.form.listingName.length',
        })
        .required(),
      listingDescription: yup
        .string()
        .max(FORM_VALIDATION.MAX_LISTING_DESCRIPTION, {
          id: 'addNewCamper.form.listingDescription.length',
        }),
    }),
  }),
)(Details);
