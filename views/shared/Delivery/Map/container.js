import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { circle } from '@turf/turf';

import { DEFAULT_COORDINATES_MAPBOX, OPTIONS_CIRCLE_DELIVERY } from 'constants/mapbox';
import MapComponent from './component';

class Map extends React.PureComponent {
  state = {
    viewport: {
      height: 400,
      zoom: 10,
      pitch: 0,
      bearing: 0,
      ...this.camperCoordinate,
    },
  }

  get camperCoordinate() {
    const { camper } = this.props;
    const { longitude, latitude } = camper || DEFAULT_COORDINATES_MAPBOX;

    return { longitude, latitude };
  }

  get circle() {
    const { radius } = this.props;
    const { longitude, latitude } = this.camperCoordinate;

    return circle([longitude, latitude], radius, OPTIONS_CIRCLE_DELIVERY);
  }

  get popup() {
    const coefficientIndentFromCircle = 0.005;

    const [longitude, latitude] = R.compose(
      R.prop(0),
      R.takeLast(1),
      R.prop(0),
    )(this.circle.geometry.coordinates);

    return {
      latitude: latitude + coefficientIndentFromCircle,
      longitude,
    };
  }

  handlerViewport = nextViewport => {
    this.setState({ viewport: nextViewport });
  }

  render() {
    const { viewport } = this.state;

    return (
      <MapComponent
        {...this.props}
        circle={this.circle}
        popup={this.popup}
        camperCoordinate={this.camperCoordinate}
        handlerViewport={this.handlerViewport}
        viewport={viewport}
      />
    );
  }
}

Map.defaultProps = {
  camper: null,
};

Map.propTypes = {
  radius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  camper: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
};

export default Map;
