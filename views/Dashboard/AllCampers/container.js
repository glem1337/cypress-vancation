import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import * as R from 'ramda';
import { withFormik } from 'formik';

import isPresent from 'utils/isPresent';
import getMainPhoto from 'utils/camper/getMainPhoto';
import getListingTitle from 'utils/camper/getListingTitle';
import getListingPlace from 'utils/camper/getListingPlace';
import getListingDescription from 'utils/camper/getListingDescription';

import {
  isUserLoggedInSelector,
  currentUserSelector,
} from 'state/concepts/session/selectors';
import {
  ownerCampersPaginationSelector,
  ownerCampersCardSelector,
  camperSelector,
  ownerCampersFilterSelector,
} from 'state/concepts/camper/selectors';
import {
  setOwnerCampersPage as setOwnerCampersPageAction,
  fetchOwnerCampers as fetchOwnerCampersAction,
  setOwnerCampersStatusFilter,
  setOwnerCampersSearch,
} from 'state/concepts/camper/actions';
import { fetchSelf } from 'state/concepts/users/actions';
import { loadingSelector } from 'state/data/selectors';
import { fetchOwnerCampersEndpoint } from 'state/concepts/camper/endpoints';

import DashboardAllCampersComponent from './component';

class DashboardAllCampers extends React.Component {
  static defaultProps = {
    currentUser: null,
    selectedCamper: null,
  };

  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.shape(),
    }).isRequired,
    setOwnerCampersPage: PropTypes.func.isRequired,
    fetchOwnerCampers: PropTypes.func.isRequired,
    setFilterStatus: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    currentUser: PropTypes.shape(),
    selectedCamper: PropTypes.shape(),
    ownerCampersCard: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    ownerCampersPagination: PropTypes.shape({
      number: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
  };

  static getInitialProps = async (ctx) => {
    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchSelf());
    }

    return { isUserLoggedIn };
  };

  get specificCamperIsPresent() {
    const { router } = this.props;

    return isPresent(router.query?.camper);
  }

  get campers() {
    const { ownerCampersCard, selectedCamper } = this.props;

    return this.specificCamperIsPresent && isPresent(selectedCamper)
      ? [
          {
            id: selectedCamper.id,
            publicId: selectedCamper.publicId,
            status: selectedCamper.status,
            rating: selectedCamper.raiting,
            modelNaming: R.pathOr(
              'camper',
              ['specificationDetail', 'modelNaming'],
              selectedCamper,
            ),
            img: getMainPhoto(selectedCamper),
            title: getListingTitle(selectedCamper),
            place: getListingPlace(selectedCamper),
            description: getListingDescription(selectedCamper),
            insurance: selectedCamper.insuranceInfo?.status,
          },
        ]
      : ownerCampersCard;
  }

  handlerPagination = (page) => {
    const { ownerCampersPagination, setOwnerCampersPage, fetchOwnerCampers } = this.props;

    if (ownerCampersPagination.number !== page) {
      setOwnerCampersPage(page);
      fetchOwnerCampers();
    }
  };

  onStatusChangeHandler = ({ target: { value } }) => {
    const { setFilterStatus, setOwnerCampersPage, fetchOwnerCampers } = this.props;

    setFilterStatus(value);
    setOwnerCampersPage(1);
    fetchOwnerCampers();
  };

  onSearchChangeHandler = debounce(({ target: { value } }) => {
    const { setSearch, setOwnerCampersPage, fetchOwnerCampers } = this.props;

    setSearch(value);
    setOwnerCampersPage(1);
    fetchOwnerCampers();
  }, 300);

  render = () => (
    <DashboardAllCampersComponent
      {...this.props}
      campers={this.campers}
      handlerPagination={this.handlerPagination}
      onStatusChange={this.onStatusChangeHandler}
      onSearchChange={this.onSearchChangeHandler}
      specificCamperIsPresent={this.specificCamperIsPresent}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: currentUserSelector(state),
  ownerCampersPagination: ownerCampersPaginationSelector(state),
  ownerCampersCard: ownerCampersCardSelector(state),
  selectedCamper: camperSelector(
    state,
    ownProps?.router?.query?.camper || 'id',
  ),
  isLoading: loadingSelector(state, fetchOwnerCampersEndpoint.endpoint),
  filters: ownerCampersFilterSelector(state),
});
const mapDispatchToProps = {
  setOwnerCampersPage: setOwnerCampersPageAction,
  fetchOwnerCampers: fetchOwnerCampersAction,
  setFilterStatus: setOwnerCampersStatusFilter,
  setSearch: setOwnerCampersSearch,
};

export { DashboardAllCampers as DashboardAllCampersContainer };
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ filters }) => ({
      status: filters.status,
      search: filters.search,
    }),
  }),
)(DashboardAllCampers);
