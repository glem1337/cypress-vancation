import ReactMapGL, { Layer, Source, Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { MAIN_STYLE_MAPBOX, ACCESS_TOKEN_MAPBOX } from 'constants/mapbox';

const Map = ({
  viewport,
  handlerViewport,
  circle,
  popup,
  radius,
  camperCoordinate,
  camper,
  hide,
}) => (
  <div
    span={24}
    className={Classnames(
      'main-listing-delivery__mapbox__wrapper-extended',
      { 'main-listing-delivery__mapbox__wrapper-extended--hidden': hide },
    )}
  >
    <ReactMapGL
      {...viewport}
      transitionDuration={300}
      mapStyle={MAIN_STYLE_MAPBOX}
      mapboxApiAccessToken={ACCESS_TOKEN_MAPBOX}
      onViewportChange={handlerViewport}
    >
      <Marker
        {...camperCoordinate}
        offsetLeft={-32}
        offsetTop={-32}
      >
        <div className="main-listing-delivery__mapbox__marker ">
          <img
            width={30}
            src={camper?.vehicleTypeIconUrl || ''}
            alt="camper-type"
          />
        </div>
      </Marker>
      <Source id="delivery-camper" type="geojson" data={circle}>
        <Layer
          id="delivery-camper-layer"
          type="fill"
          paint={{
            'fill-color': 'rgba(0,165,181,0.38)',
          }}
        />
      </Source>
      <Popup
        {...popup}
        className="main-listing-delivery__mapbox__popup"
        closeButton={false}
        closeOnClick={false}
      >
        <FormattedMessage
          id="addNewCamper.delivery.deliveryMiles"
          values={{ radius }}
        />
      </Popup>
    </ReactMapGL>
  </div>
);

Map.defaultProps = {
  camper: null,
};

Map.propTypes = {
  viewport: PropTypes.shape({
    height: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    bearing: PropTypes.number.isRequired,
  }).isRequired,
  handlerViewport: PropTypes.func.isRequired,
  circle: PropTypes.shape().isRequired,
  popup: PropTypes.shape().isRequired,
  radius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  camperCoordinate: PropTypes.shape().isRequired,
  hide: PropTypes.bool.isRequired,
  camper: PropTypes.shape(),
};

export default Map;
