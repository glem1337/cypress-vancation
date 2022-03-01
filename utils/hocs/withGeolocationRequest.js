import React from 'react';
import { ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrentCoordinates } from 'state/app/actions';
import getDisplayName from 'utils/getDisplayName';

const withGeolocationRequest = (Component) => {
  class WithGeolocationRequest extends React.Component {
    static displayName = `withGeolocationRequest(${getDisplayName(Component)})`;

    static contextType = ReactReduxContext;

    static contextTypes = {
      store: PropTypes.shape(),
    };

    constructor(props) {
      super(props);

      navigator.geolocation.getCurrentPosition(
        this.currentLocationSuccess,
        this.currentLocationError,
      );
    }

    currentLocationSuccess = ({ coords }) => {
      const { store } = this.context;

      store.dispatch(setCurrentCoordinates({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    }

    currentLocationError = () => {
      const { store } = this.context;

      store.dispatch(setCurrentCoordinates({
        latitude: null,
        longitude: null,
      }));
    }

    render() {
      return (
        <Component
          {...this.props}
          currentLocationSuccess={this.currentLocationSuccess}
          currentLocationError={this.currentLocationError}
        />
      );
    }
  }

  return WithGeolocationRequest;
};

export default withGeolocationRequest;
