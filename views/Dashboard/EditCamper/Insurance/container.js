import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import yup from 'lib/yupLocalised';
import { withFormik } from 'formik';
import { withRouter } from 'next/router';

import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';
import isPresent from 'utils/isPresent';

import { CAMPER_INCLUSION } from 'constants/camper';
import {
  INSURANCE_VALIDATION,
  INSURANCE_STATUS,
} from 'constants/camperInsurance';

import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import {
  fetchCamper,
  updateInsuranceInfo,
} from 'state/concepts/camper/actions';
import { updateInsuranceInfoEndpoint } from 'state/concepts/camper/endpoints';
import { loadingSelector } from 'state/data/selectors';
import {
  hideModal as hideModalAction,
  showModal as showModalAction,
} from 'state/modal/actions';

import InsuranceComponent from './component';

class Insurance extends React.Component {
  static defaultProps = {
    camper: null,
  };

  static propTypes = {
    camper: PropTypes.shape(),
    isValid: PropTypes.bool.isRequired,
    values: PropTypes.shape().isRequired,
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    ctx.store.dispatch(fetchCamper(camperId, CAMPER_INCLUSION.INSURANCE_INFO));

    return { camperId };
  };

  get insuranceStatus() {
    const { camper } = this.props;

    switch (camper?.insuranceInfo?.status) {
      case INSURANCE_STATUS.APPROVED:
        return INSURANCE_STATUS.APPROVED;
      default:
        return INSURANCE_STATUS.PENDING;
    }
  }

  get canSave() {
    const { values, isValid } = this.props;

    if (!isPresent(values.stateRegistered)) {
      return false;
    }

    return isValid;
  }

  render = () => (
    <InsuranceComponent
      {...this.props}
      insuranceStatus={this.insuranceStatus}
      leavePagePrepare={this.leavePagePrepare}
      canSave={this.canSave}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updateInsuranceInfoEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateInsuranceInfo,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { Insurance as InsuranceContainer };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ camper }) => ({
      actualCashValue: camper?.actualCashValue || '',
      vinNumber: camper?.insuranceInfo?.vinNumber || '',
      stateRegistered: camper?.insuranceInfo?.stateRegistred || '',
      licensePlate: camper?.insuranceInfo?.licencePlate || '',
      inclusions: CAMPER_INCLUSION.INSURANCE_INFO,
    }),
    validationSchema: yup.object().shape({
      actualCashValue: yup
        .number()
        .min(INSURANCE_VALIDATION.MIN_ACTUAL_CASH_VALUE, {
          id: 'validations.min',
          values: {
            pref: 'Actual cash value',
            value: `$${INSURANCE_VALIDATION.MIN_ACTUAL_CASH_VALUE}`,
          },
        })
        .max(INSURANCE_VALIDATION.MAX_ACTUAL_CASH_VALUE, {
          id: 'validations.max',
          values: {
            pref: 'Actual cash value',
            value: `$${INSURANCE_VALIDATION.MAX_ACTUAL_CASH_VALUE}`,
          },
        }),
      vinNumber: yup.string().max(INSURANCE_VALIDATION.MAX_VIN_NUMBER, {
        id: 'validations.maxCharacters',
        values: {
          pref: 'VIN number',
          value: INSURANCE_VALIDATION.MAX_VIN_NUMBER,
        },
      }),
      stateRegistered: yup.string().required({
        id: 'validations.cantBeBlank',
        values: { pref: 'State registered' },
      }),
      licensePlate: yup.string().max(INSURANCE_VALIDATION.MAX_LICENSE_PLATE, {
        id: 'validations.maxCharacters',
        values: {
          pref: 'License plate',
          value: INSURANCE_VALIDATION.MAX_LICENSE_PLATE,
        },
      }),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
)(Insurance);
