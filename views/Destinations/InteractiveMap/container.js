import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { circle, distance } from '@turf/turf';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { ACCESS_TOKEN_MAPBOX, CAMPERVAN_RENTAL } from 'constants/mapbox';
import { campersSelector } from 'state/concepts/campervan-rental/selectors';
import { activeCamperIdSelector, searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import CamperPin from 'views/Destinations/CamperPin';
import {
  setActiveCamperId as setActiveCamperIdAction,
  toggleMobileFiltersVisibility as toggleMobileFiltersVisibilityAction,
} from 'state/concepts/search-destinations/actions';

import InteractiveMapMobileComponent from './component';

mapboxgl.accessToken = ACCESS_TOKEN_MAPBOX;

const DEBOUNCE_TIME = 400;
class InteractiveMapMobile extends React.Component {
  static propTypes = {
    createMapOnMount: PropTypes.bool,
    campers: PropTypes.arrayOf(PropTypes.shape()),
    onDragEnd: PropTypes.func,
    onZoomEnd: PropTypes.func,
    activeCamperId: PropTypes.string,
    setActiveCamperId: PropTypes.func.isRequired,
    onTouchStart: PropTypes.func,
    searchParams: PropTypes.shape(),
    toggleMobileFiltersVisibility: PropTypes.func.isRequired,
  }

  static defaultProps = {
    createMapOnMount: false,
    campers: [],
    onDragEnd: undefined,
    onZoomEnd: undefined,
    onTouchStart: undefined,
    activeCamperId: null,
    searchParams: {},
  }

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.mapContainerRef = React.createRef();

    this.searchAsMoveMap = true;

    this.markers = [];

    this.onDragEndDebounced = debounce(this.onDragEnd, DEBOUNCE_TIME);

    this.onZoomEndDebounced = debounce(this.onZoomEnd, DEBOUNCE_TIME);
  }

  componentDidMount() {
    const { createMapOnMount } = this.props;

    if (createMapOnMount) {
      this.createMap();
    }
  }

  componentWillUnmount() {
    if (this.mapRef?.current?.off) {
      this.mapRef.current.off('load', this.onMapLoadHandler);
      this.mapRef.current.off('touchstart', this.onTouchStart);
    }
  }

  componentDidUpdate(prevProps) {
    const { activeCamperId, searchParams } = this.props;

    if (prevProps.activeCamperId !== activeCamperId) {
      this.highlightCamperMarker();
    }

    if (
      searchParams?.location?.id
      && searchParams?.location?.id !== prevProps.searchParams?.location?.id
    ) {
      this.setCenter({
        latitude: searchParams?.location?.latitude,
        longitude: searchParams?.location?.longitude,
      });
    }
  }

  /**
   * Resize map.
   */
  resizeMap = () => {
    try {
      this.mapRef.current.resize();
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error: InteractiveMapMobile -> resizeMap()', true, err.message); // eslint-disable-line no-console

      if (!this.mapRef.current) {
        this.createMap();
      }
    }
  }

  /**
   * Set center.
   */
  setCenter = ({ latitude, longitude }) => {
    try {
      this.mapRef.current.flyTo({ center: [longitude, latitude] });

      this.fitMapToBounds();
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error: InteractiveMapMobile -> setCenter()', true, err.message); // eslint-disable-line no-console

      if (!this.mapRef.current) {
        this.createMap();
      }
    }
  }

  /**
   * On touch start.
   */
  onTouchStart = () => {
    if (!this.props.onTouchStart) {
      return false;
    }

    this.props.onTouchStart();

    return true;
  }

  /**
   * Get all refs.
   */
  getRefs = () => ({
    mapRef: this.mapRef,
    mapContainerRef: this.mapContainerRef,
  })

  /**
   * Fit map to bounds
   */
  fitMapToBounds = () => {
    try {
      const {
        searchParams: {
          location: {
            longitude,
            latitude,
            searchRadius,
          },
        },
      } = this.props;

      // Create search radius circle
      const circleData = circle([longitude, latitude], searchRadius, { steps: 10, units: 'miles' });

      // Detect coordinates
      const circleCoords = R.pathOr([], ['geometry', 'coordinates', '0'], circleData);

      // Detect bounds
      const circleBounds = circleCoords.reduce(
        (bounds, coords) => bounds.extend(coords),
        new mapboxgl.LngLatBounds(circleCoords[0], circleCoords[0]),
      );

      this.mapRef.current.fitBounds(circleBounds, { padding: 20, animate: false });
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error: InteractiveMapMobile -> fitMapToBounds()', true, err.message); // eslint-disable-line no-console

      if (!this.mapRef.current) {
        this.createMap();
      }
    }
  };

  /**
   * On map load handler
   */
  onMapLoadHandler = async () => {
    if (!this.mapContainerRef.current) {
      return false;
    }

    this.mapRef.current.resize();
    this.fitMapToBounds();

    const controls = this.mapContainerRef.current.querySelectorAll('.search-page__map-mob__control');
    controls.forEach(control => {
      this.mapContainerRef.current.removeChild(control);
    });

    controls.forEach(control => {
      this.mapContainerRef.current.appendChild(control);
      control.classList.remove('d-none');
    });

    this.mapRef.current.on('touchstart', this.onTouchStart);
    this.mapRef.current.on('dragend', this.onDragEndDebounced);
    this.mapRef.current.on('zoomend', this.onZoomEndDebounced);

    this.createMarkers();

    return true;
  };

  /**
   * Create map.
   */
  createMap = async () => {
    if (this.mapRef.current) {
      return false;
    }

    const latitude = R.path(['searchParams', 'location', 'latitude'], this.props);
    const longitude = R.path(['searchParams', 'location', 'longitude'], this.props);

    const controls = this.mapContainerRef.current.querySelectorAll('.search-page__map-mob__control');
    controls.forEach(control => {
      control.classList.add('d-none');
    });

    this.mapRef.current = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: CAMPERVAN_RENTAL.MAP_ZOOM,
    });

    this.mapRef.current.on('load', this.onMapLoadHandler);

    return true;
  };

  /**
   * Delete all markers.
   */
  deleteAllMarkers = () => {
    for (let i = 0; i < this.markers.length; i += 1) {
      const marker = this.markers[i];

      marker.remove();
    }

    this.markers = [];

    return true;
  }

  /**
   * Create markers.
   */
  createMarkers = async () => {
    try {
      const { campers } = this.props;

      this.deleteAllMarkers();

      for (let i = 0; i < campers.length; i += 1) {
        const camper = campers[i];

        const el = document.createElement('div');
        el.id = camper.id;

        const marker = new mapboxgl.Marker(el)
          .setLngLat([camper.longitude, camper.latitude])
          .addTo(this.mapRef.current);

        this.markers = [...this.markers, marker];

        const popover = React.createElement(
          CamperPin,
          {
            camper,
            onVisibleChange: this.onMarkerVisibleChange,
          },
        );

        ReactDOM.render(
          popover,
          document.getElementById(camper.id),
        );
      }
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error: InteractiveMapMobile -> createMarkers()', true, err.message); // eslint-disable-line no-console
    }

    return true;
  }

  /**
   * On marker active condition change
   */
  onMarkerVisibleChange = (isActive, camperId) => {
    const { setActiveCamperId } = this.props;

    if (isActive) {
      setActiveCamperId(camperId);
    }
  }

  /**
   * Search as move map
   */
  searchAsMoveMapToggled = (event) => {
    this.searchAsMoveMap = event.target?.checked;
  }

  /**
   * Get map radius in miles.
   */
  getMapRadius = () => {
    if (!this.mapRef.current || !this.mapContainerRef.current) {
      return null;
    }

    const { height, width } = this.mapContainerRef.current.getBoundingClientRect();
    const side = Math.min(height, width);

    // Point in the (top center) on the map
    const pointPX = this.mapRef.current.unproject(new mapboxgl.Point(side / 2, 0));

    // Center of the map
    const center = this.mapRef.current.getCenter();

    // Distance between point anf center.
    const distanceInMiles = distance(
      [pointPX.lng, pointPX.lat],
      [center.lng, center.lat],
      { units: 'miles' },
    );

    return distanceInMiles;
  }

  /**
   * Highlight map marker
   */
  highlightCamperMarker = async () => {
    const { activeCamperId } = this.props;

    try {
      let markersWrapper = null;

      const markers = document.querySelectorAll('.search-page__map-pin');

      markers.forEach((marker) => {
        markersWrapper = marker.parentElement.parentElement;

        if (marker.parentElement.id === activeCamperId) {
          marker.classList.add('search-page__map-pin--active');
          markersWrapper.removeChild(marker.parentElement);
          markersWrapper.appendChild(marker.parentElement);
        } else {
          marker.classList.remove('search-page__map-pin--active');
        }
      });
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error: InteractiveMapMobile -> highlightCamperMarker()', true, err.message); // eslint-disable-line no-console

      return false;
    }

    return true;
  }

  /**
   * Set visibility by width.
   */
  setVisibilityByWidth = (isVisible) => {
    try {
      if (isVisible) {
        this.mapContainerRef.current.style.setProperty('width', 0);
      } else {
        this.mapContainerRef.current.style.removeProperty('width');
      }
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error: InteractiveMapMobile -> disableWidth()', true, err.message); // eslint-disable-line no-console

      return false;
    }

    return true;
  }

  /**
   * On drag end.
   */
  onDragEnd = async () => {
    const { setActiveCamperId } = this.props;

    setActiveCamperId(null);

    if (!this.searchAsMoveMap || !this.props.onDragEnd) {
      return false;
    }

    const center = this.mapRef.current.getCenter();

    this.props.onDragEnd({
      map: this.mapRef.current,
      mapContainer: this.mapContainerRef.current,
      mapRadius: this.getMapRadius(),
      center: {
        latitude: center.lat,
        longitude: center.lng,
      },
    });

    return true;
  }

  /**
   * On drag end.
   */
  onZoomEnd = async () => {
    const { setActiveCamperId } = this.props;

    setActiveCamperId(null);

    if (!this.searchAsMoveMap || !this.props.onZoomEnd) {
      return false;
    }

    const center = this.mapRef.current.getCenter();

    this.props.onZoomEnd({
      map: this.mapRef.current,
      mapContainer: this.mapContainerRef.current,
      mapRadius: this.getMapRadius(),
      center: {
        latitude: center.lat,
        longitude: center.lng,
      },
    });

    return true;
  }

  render() {
    const { toggleMobileFiltersVisibility } = this.props;

    return (
      <InteractiveMapMobileComponent
        {...this.props}
        mapContainerRef={this.mapContainerRef}
        searchAsMoveMapToggled={this.searchAsMoveMapToggled}
        toggleMobileFiltersVisibility={toggleMobileFiltersVisibility}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  campers: campersSelector(state),
  activeCamperId: activeCamperIdSelector(state),
  searchParams: searchDestinationParamsSelector(state),
});

const mapDispatchToProps = {
  setActiveCamperId: setActiveCamperIdAction,
  toggleMobileFiltersVisibility: toggleMobileFiltersVisibilityAction,
};

export { InteractiveMapMobile as InteractiveMapMobileContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(InteractiveMapMobile);
