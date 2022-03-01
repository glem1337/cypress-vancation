import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { DEFAULT_VISIBLE_ADDONS } from 'constants/camperDetails/addons';

import withIntersectionObserver from 'utils/hocs/withIntersectionObserver';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

import { loadingSelector } from 'state/data/selectors';

import { fetchCamperTravelExtention } from 'state/concepts/camper/actions';
import { fetchCamperTravelExtentionEndpoint } from 'state/concepts/camper/endpoints';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import { fetchTravelAccessoriesConfig } from 'state/concepts/travel-accessories/actions';
import { travelAccessoriesSelector } from 'state/concepts/travel-accessories/selectors';

import AddonsComponent from './component';

class Addons extends React.Component {
  static defaultProps = {
    isVisible: undefined,
    camper: null,
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    fetchAddons: PropTypes.func.isRequired,
    fetchAddonsConfig: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    isCamperExist: PropTypes.bool.isRequired,
    camper: PropTypes.shape(),
    addons: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      allItemsVisible: false,
    };
  }

  componentDidUpdate() {
    const {
      isVisible,
      fetchAddonsConfig,
      fetchAddons,
      camperId,
      isCamperExist,
    } = this.props;
    const { initialized } = this.state;

    if (isVisible && !initialized && isCamperExist) {
      fetchAddonsConfig();
      fetchAddons(camperId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        initialized: true,
      });
    }
  }

  toggleVisibleItems = () => {
    this.setState((prevState) => ({
      allItemsVisible: !prevState.allItemsVisible,
    }));
  };

  get items() {
    const { addons, camper } = this.props;

    const customAddons = R.pathOr(
      [],
      ['camperAddition', 'customTravelAccessories'],
      camper,
    );

    return [...addons, ...customAddons].filter((item) => item.active);
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultVisibleCount() {
    const isDesktop = !isMobileView() && !isTabletView();

    return isDesktop
      ? DEFAULT_VISIBLE_ADDONS.DESKTOP
      : DEFAULT_VISIBLE_ADDONS.MOBILE;
  }

  get visibleItems() {
    const { allItemsVisible } = this.state;

    return allItemsVisible
      ? this.items
      : this.items.slice(0, this.defaultVisibleCount);
  }

  render() {
    return (
      <AddonsComponent
        {...this.state}
        {...this.props}
        toggleVisibleItems={this.toggleVisibleItems}
        items={this.visibleItems}
        totalItems={this.items.length}
        defaultVisibleCount={this.defaultVisibleCount}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  addons: travelAccessoriesSelector(state, ownProps?.camperId),
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(
    state,
    fetchCamperTravelExtentionEndpoint(ownProps?.camperId).endpoint,
  ),
});

const mapDispatchToProps = {
  fetchAddons: fetchCamperTravelExtention,
  fetchAddonsConfig: fetchTravelAccessoriesConfig,
};

export { Addons as AddonsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntersectionObserver(
    {
      isVisible: 0.0,
    },
    { rootMargin: '70% 0px' },
  ),
)(Addons);
