import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withRouter } from 'next/router';

import { fetchOwnerCampersEndpoint } from 'state/concepts/camper/endpoints';
import { DASHBOARD_CAMPER_MASTER_VIEW_ITEM } from 'constants/dashboard';
import ROUTES, { EDIT_CAMPER_PATH_PREFIX } from 'constants/routes';
import isPresent from 'utils/isPresent';
import { fetchOwnerCampers as fetchOwnerCampersAction } from 'state/concepts/camper/actions';
import { setMobileMenuVisibility as setMobileMenuVisibilityAction } from 'state/concepts/dashboard/actions';
import { loadingSelector } from 'state/data/selectors';
import {
  ownerCampersFirstPortionSelector,
  hasOneLastCamperEditSelector,
  ownerCampersFirstPortionIdsSelector,
  camperSelector,
} from 'state/concepts/camper/selectors';

import getMainPhoto from 'utils/camper/getMainPhoto';
import getListingTitle from 'utils/camper/getListingTitle';

import DropdownCampersComponent from './component';
import ListCampersMobileComponent from './component.mobile';

class DropdownCampers extends React.Component {
  constructor(props) {
    super(props);

    if (!props.isMobileMode) {
      props.fetchOwnerCampers(true);
    }

    this.state = {
      activeKey: [],
    };
  }

  get currentCamperId() {
    const { router } = this.props;
    const query = router.query?.camper;

    return isPresent(query) ? query : 'master-view';
  }

  get currentCamper() {
    if (!this.currentCamperId || this.currentCamperId === DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id) {
      return null;
    }

    const { currentCamper } = this.props;

    return currentCamper
      ? {
        id: currentCamper.id,
        img: getMainPhoto(currentCamper),
        label: getListingTitle(currentCamper),
        subtitle: currentCamper.publicId,
      } : null;
  }

  get hasCurrentCamper() {
    const { ownerCampersFirstPortionIds } = this.props;

    if (
      this.currentCamperId === DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id
      || !Array.isArray(ownerCampersFirstPortionIds)
    ) {
      return true;
    }

    return ownerCampersFirstPortionIds.includes(this.currentCamperId);
  }

  get items() {
    const { ownerCampersFirstPortion } = this.props;

    return !this.hasCurrentCamper && this.currentCamper
      ? [
        ...ownerCampersFirstPortion,
        this.currentCamper,
      ] : ownerCampersFirstPortion;
  }

  handlerSelect = (val) => {
    const { router } = this.props;

    if (
      this.currentCamperId !== val
      && val !== DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id
    ) {
      router.push(
        { query: { camper: val } },
        undefined,
        { shallow: true },
      );
    }

    if (val === DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id) {
      if (router.pathname.includes(EDIT_CAMPER_PATH_PREFIX)) {
        router.push(
          { pathname: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH },
          undefined,
          { shallow: true },
        );

        return;
      }

      router.push({ pathname: router.pathname }, undefined, { shallow: true });
    }
  }

  handlerClick = (key) => () => {
    const { setMobileMenuVisibility, router } = this.props;

    if (key === DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id) {
      if (router.pathname.includes(EDIT_CAMPER_PATH_PREFIX)) {
        router.push(
          { pathname: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH },
          undefined,
          { shallow: true },
        );

        return;
      }

      router.push({ pathname: router.pathname }, undefined, { shallow: true });
    } else {
      router.push(
        { query: { camper: key } },
        undefined,
        { shallow: true },
      );
    }

    setMobileMenuVisibility(false);
    this.setState({
      activeKey: [],
    });
  }

  componentDidUpdate() {
    const {
      hasOneLastCamperEdit,
      ownerCampersFirstPortionIds,
      router,
      isMobileMode,
    } = this.props;

    // It is necessary for the case when we have one "Last Camper Edit",
    // we need to install it by default, as "Master View" will not be in the list
    if (
      !isMobileMode
      && hasOneLastCamperEdit
      && (this.currentCamperId !== ownerCampersFirstPortionIds[0])
    ) {
      router.push(
        { query: { camper: ownerCampersFirstPortionIds[0] } },
        undefined,
        { shallow: true },
      );
    }
  }

  get selectedCamper() {
     return this.items.filter((item) => item.id === this.currentCamperId)[0];
  }

  get itemsMobile() {
    return this.items.filter((item) => item.id !== this.currentCamperId);
  }

  onCollapseChangeHandler = (id) => {
    this.setState({
      activeKey: id,
    });
  };

  render() {
    const { isMobileMode } = this.props;

    return isMobileMode ? (
      <ListCampersMobileComponent
        {...this.state}
        {...this.props}
        selectedCamper={this.selectedCamper}
        currentCamperId={this.currentCamperId}
        items={this.itemsMobile}
        handlerClick={this.handlerClick}
        onCollapseChangeHandler={this.onCollapseChangeHandler}
      />
    ) : (
      <DropdownCampersComponent
        {...this.props}
        currentCamperId={this.currentCamperId}
        items={this.items}
        handlerSelect={this.handlerSelect}
      />
    );
  }
}

DropdownCampers.defaultProps = {
  currentCamper: null,
  isMobileMode: false,
};

DropdownCampers.propTypes = {
  isMobileMode: PropTypes.bool,
  hasOneLastCamperEdit: PropTypes.bool.isRequired,
  setMobileMenuVisibility: PropTypes.func.isRequired,
  fetchOwnerCampers: PropTypes.func.isRequired,
  currentCamper: PropTypes.shape(),
  ownerCampersFirstPortion: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  ownerCampersFirstPortionIds: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
    query: PropTypes.shape(),
    pathname: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ownerCampersFirstPortion: ownerCampersFirstPortionSelector(state),
  hasOneLastCamperEdit: hasOneLastCamperEditSelector(state),
  isLoading: loadingSelector(state, fetchOwnerCampersEndpoint.endpoint),
  currentCamper: camperSelector(state, ownProps.router.query?.camper || 'id'),
  ownerCampersFirstPortionIds: ownerCampersFirstPortionIdsSelector(state),
});

const mapDispatchToProps = {
  fetchOwnerCampers: fetchOwnerCampersAction,
  setMobileMenuVisibility: setMobileMenuVisibilityAction,
};

export { DropdownCampers as DropdownCampersContainer };
export default R.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(DropdownCampers);
