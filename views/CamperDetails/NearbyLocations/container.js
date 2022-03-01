import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';

import withIntersectionObserver from 'utils/hocs/withIntersectionObserver';

import { loadingSelector } from 'state/data/selectors';

import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import { fetchNearbyDestinations } from 'state/concepts/campervan-rental/actions';
import { nearbyDestinationsSelector } from 'state/concepts/campervan-rental/selectors';
import { fetchNearbyDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';

import NearbyLocationsComponent from './component';

class NearbyLocations extends React.Component {
  static defaultProps = {
    isVisible: undefined,
    camper: null,
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    fetchDestinations: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    isCamperExist: PropTypes.bool.isRequired,
    camper: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  componentDidUpdate() {
    const { isVisible, fetchDestinations, camper, isCamperExist } = this.props;
    const { initialized } = this.state;

    if (isVisible && !initialized && isCamperExist) {
      fetchDestinations({
        longitude: camper.longitude,
        latitude: camper.latitude,
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        initialized: true,
      });
    }
  }

  render() {
    return <NearbyLocationsComponent {...this.state} {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, fetchNearbyDestinationsEndpoint.endpoint),
  locations: nearbyDestinationsSelector(state),
});

const mapDispatchToProps = {
  fetchDestinations: fetchNearbyDestinations,
};

export { NearbyLocations as NearbyLocationsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntersectionObserver(
    {
      isVisible: 0.0,
    },
    { rootMargin: '70% 0px' },
  ),
)(NearbyLocations);
