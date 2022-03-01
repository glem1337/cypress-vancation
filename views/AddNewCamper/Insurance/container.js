import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { camperCompletenessSelector, isCamperExistSelector } from 'state/concepts/camper/selectors';
import {
  checkPreviousStepCompleteness,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
  createInsuranceInfo as createInsuranceInfoAction,
} from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import { createInsuranceInfoEndpoint } from 'state/concepts/camper/endpoints';

import InsuranceComponent from './component';

class Insurance extends React.Component {
  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(fetchCamper(camperId, 'insurance_info'));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(checkPreviousStepCompleteness({
      key: ROUTES.ADD_NEW_CAMPER.INSURANCE.KEY,
      camperId,
      ctx,
    }));

    return { camperId };
  }

  static propTypes = {
    router: PropTypes.shape().isRequired,
    camperId: PropTypes.string.isRequired,
    setLeavePageMethod: PropTypes.func.isRequired,
    createInsuranceInfo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
  }

  constructor(props) {
    super(props);

    props.setLeavePageMethod(null);
  }

  onBackButtonClick = () => {
    const { router, camperId } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.AMENITIES.PATH, camperId);

    router.push(route);
  };

  onSaveButtonClick = () => {
    const { createInsuranceInfo, camperId } = this.props;

    createInsuranceInfo(camperId);
  };

  render = () => (
    <InsuranceComponent
      {...this.props}
      onBackButtonClick={this.onBackButtonClick}
      onSaveButtonClick={this.onSaveButtonClick}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createInsuranceInfoEndpoint.endpoint),
});

const mapDispatchToProps = {
  setLeavePageMethod: setLeavePageMethodAction,
  createInsuranceInfo: createInsuranceInfoAction,
};

export { Insurance as InsuranceContainer };
export default compose(
  attachLayout(AddNewCamperLayout),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Insurance);
