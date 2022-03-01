import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import yup from 'lib/yupLocalised';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';

import { CUSTOM_RULE_MAX_NAME_LENGTH } from 'constants/dashboardRulesAndTravels';
import { CAMPER_INCLUSION } from 'constants/camper';

import {
  fetchCamper,
  createCamperRestrictions,
  deleteCamperCustomRestrictions,
} from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { createCamperRestrictionsEndpoint } from 'state/concepts/camper/endpoints';
import { camperSelector, isCamperExistSelector } from 'state/concepts/camper/selectors';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';

import RulesAndTravelsComponent from './component';

class RulesAndTravels extends React.Component {
  static propTypes = {
    camperId: PropTypes.string.isRequired,
    values: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    deleteCustomRestrictions: PropTypes.func.isRequired,
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    const inclusions = [
      CAMPER_INCLUSION.CAMPER_ADDITION.RESTRICTION_RULE,
      CAMPER_INCLUSION.CAMPER_ADDITION.TRAVEL_RESTRICTION,
      CAMPER_INCLUSION.CAMPER_ADDITION.RESTRICTION_ROAD,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_RESTRICTION_RULES,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_TRAVEL_RESTRICTIONS,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_RESTRICTION_ROADS,
    ];

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    return { camperId };
  };

  onAddCustomRule = (keyProp) => () => {
    const { setFieldValue, values } = this.props;

    const rules = [
      ...values[keyProp],
      {
        listId: uuid(),
        id: null,
        name: '',
        active: false,
      },
    ];

    setFieldValue(keyProp, rules);
  };

  onRemoveCustomRule =
    ({ id, index, keyProp }) => () => {
      const { setFieldValue, values, camperId, deleteCustomRestrictions } = this.props;

      if (id) {
        deleteCustomRestrictions({
          id,
          camperId,
          customRestrictionType: keyProp,
        });
      } else {
        const rules = values[keyProp].filter((_, idx) => idx !== index);

        setFieldValue(keyProp, rules);
      }
    };

  render() {
    return (
      <RulesAndTravelsComponent
        {...this.props}
        onAddCustomRule={this.onAddCustomRule}
        onRemoveCustomRule={this.onRemoveCustomRule}
        leavePagePrepare={this.leavePagePrepare}
      />
    );
  }
}

const customRulesValidate = (field) => yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .max(CUSTOM_RULE_MAX_NAME_LENGTH, {
          id: 'validations.max',
          values: {
            pref: `${field} name`,
            value: CUSTOM_RULE_MAX_NAME_LENGTH,
          },
        })
        .required({
          id: 'validations.cantBeBlank',
          values: { pref: `${field} name` },
        }),
    }),
  );

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createCamperRestrictionsEndpoint.endpoint),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  onSubmit: createCamperRestrictions,
  deleteCustomRestrictions: deleteCamperCustomRestrictions,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { RulesAndTravels as RulesAndTravelsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ camper }) => ({
      restrictionRule: {
        allowPets: R.pathOr(
          false,
          ['camperAddition', 'restrictionRule', 'allowPets'],
          camper,
        ),
        smoking: R.pathOr(
          false,
          ['camperAddition', 'restrictionRule', 'smoking'],
          camper,
        ),
        festivalApproved: R.pathOr(
          false,
          ['camperAddition', 'restrictionRule', 'festivalApproved'],
          camper,
        ),
      },
      travelRestriction: {
        mexico: R.pathOr(
          false,
          ['camperAddition', 'travelRestriction', 'mexico'],
          camper,
        ),
        canada: R.pathOr(
          true,
          ['camperAddition', 'travelRestriction', 'canada'],
          camper,
        ),
        burningMan: R.pathOr(
          false,
          ['camperAddition', 'travelRestriction', 'burningMan'],
          camper,
        ),
      },
      restrictionRoad: {
        fourWheelRoad: R.pathOr(
          false,
          ['camperAddition', 'restrictionRoad', 'fourWheelRoad'],
          camper,
        ),
        offRoad: R.pathOr(
          false,
          ['camperAddition', 'restrictionRoad', 'offRoad'],
          camper,
        ),
        snowAndIceRoad: R.pathOr(
          false,
          ['camperAddition', 'restrictionRoad', 'snowAndIceRoad'],
          camper,
        ),
        dirtyRoad: R.pathOr(
          true,
          ['camperAddition', 'restrictionRoad', 'dirtryRoad'],
          camper,
        ),
      },
      customRestrictionRules: R.pathOr(
        [],
        ['camperAddition', 'customRestrictionRules'],
        camper,
      ),
      customTravelRestrictions: R.pathOr(
        [],
        ['camperAddition', 'customTravelRestrictions'],
        camper,
      ),
      customRestrictionRoads: R.pathOr(
        [],
        ['camperAddition', 'customRestrictionRoads'],
        camper,
      ),
    }),
    validationSchema: yup.object().shape({
      customRestrictionRules: customRulesValidate('Rule'),
      customTravelRestrictions: customRulesValidate('Location'),
      customRestrictionRoads: customRulesValidate('Road'),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
)(RulesAndTravels);
