import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import deviceDetector from 'ismobilejs';
import deepEqual from 'fast-deep-equal';

import { fetchCampers as fetchCampersAction, fetchState, fetchStateLocation } from 'state/concepts/campervan-rental/actions';
import { currentUserSelector } from 'state/concepts/session/selectors';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import isPresent from 'utils/isPresent';
import { loadingSelector } from 'state/data/selectors';
import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import { fetchSearchResultData } from 'state/concepts/search-destinations/actions';

import DestinationsLandingPageComponent from './component';

class DestinationsLandingPage extends React.Component {
  /**
   * Lifecycle method.
   */
  static getInitialProps = async (ctx) => {
    const state = R.path(['query', 'state'], ctx);
    const location = R.path(['query', 'location'], ctx);
    const search = R.path(['query', 'search'], ctx);

    if (state && !location) {
      ctx.store.dispatch(fetchState({ state }));
    }

    if (state && location) {
      ctx.store.dispatch(fetchStateLocation({ state, location }));
    }

    if (search) {
      ctx.store.dispatch(fetchSearchResultData(search));
    }

    const userAgent = ctx.req?.headers?.['user-agent'];

    return {
      state,
      location,
      device: deviceDetector(userAgent),
    };
  }

  static propTypes = {
    fetchCampers: PropTypes.func.isRequired,
    device: PropTypes.shape().isRequired,
    areCampersFetching: PropTypes.bool,
    searchParams: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    areCampersFetching: undefined,
  }

  /**
   * Lifecycle method.
   */
  constructor(props) {
    super(props);

    props.fetchCampers();

    this.componentRefs = {
      footerComponentRef: null,
      mapComponentRef: null,
      intentComponentRef: null,
      viewMapButtonComponentRef: null,
    };

    this.state = {
      isTabletMapVisible: false,
      isMobile: props.device.phone,
      isTablet: props.device.tablet,
      isDesktop: !props.device.phone && !props.device.tablet,
    };

    window.history.scrollRestoration = 'manual';
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    this.prepareMobileCondition();
    this.handleResize();

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.onScrollHandler);
  }

  /**
   * Lifecycle method.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.onScrollHandler);
  }

  /**
   * Lifecycle method.
   */
  componentDidUpdate(prevProps, prevState) {
    const { areCampersFetching } = this.props;

    if (!deepEqual(this.state, prevState)) {
      this.prepareMobileCondition();
    }

    if (areCampersFetching === false && prevProps?.areCampersFetching === true) {
      this.rebuildMapMarkers();
    }
  }

  /**
   * Prepare mobile condition
   */
  prepareMobileCondition = () => {
    const { device } = this.props;

    if (!device?.phone) {
      return false;
    }

    this.correctIntentComponentHeight();
    this.setInitialScrollPosition();
    this.createMap();

    return true;
  }

  /**
   * Handle resize event.
   */
  handleResize = () => {
    this.correctIntentComponentHeight();
    this.resizeMap();

    const isMobile = isMobileView();
    const isTablet = isTabletView();
    const isDesktop = !isMobile && !isTablet;

    if (isMobile && !this.state.isMobile) {
      this.setState({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isTabletMapVisible: false,
      });

      return;
    }

    if (isTablet && !this.state.isTablet) {
      this.setState({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        isTabletMapVisible: false,
      });

      return;
    }

    if (isDesktop && !this.state.isDesktop) {
      this.setState({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTabletMapVisible: false,
      });
    }
  }

  /**
   * Set initial scroll position.
   */
  setInitialScrollPosition = () => {
    const isLandscape = window.innerHeight < window.innerWidth;

    const delta = isLandscape ? 0.3 : 0.5;

    window.scrollTo(0, window.innerHeight * delta);

    return delta;
  }

  /**
   * Correct Intent component position.
   */
  correctIntentComponentHeight = () => {
    if (this.componentRefs.intentComponentRef) {
      this.componentRefs.intentComponentRef.style.height = `${window.innerHeight - 182}px`;
      return true;
    }

    return false;
  }

  /**
   * Create map
   */
  createMap = () => {
    if (this.componentRefs.mapComponentRef) {
      this.componentRefs.mapComponentRef.createMap();
      return true;
    }

    return false;
  }

  /**
   * Resize map
   */
  resizeMap = () => {
    if (
      !this.componentRefs.intentComponentRef
      || !this.componentRefs.mapComponentRef
    ) {
      return false;
    }

    const intentRect = this.componentRefs.intentComponentRef.getBoundingClientRect();

    // Resize map
    const MIN_MAP_HEIGHT = 370;
    if (window.pageYOffset < MIN_MAP_HEIGHT && this.componentRefs.mapComponentRef) {
      const { mapContainerRef } = this.componentRefs.mapComponentRef.getRefs();
      mapContainerRef.current.style.height = `${intentRect.height - window.pageYOffset + 10}px`;

      this.componentRefs.mapComponentRef.resizeMap();
    }

    return true;
  }

  /**
   * Toggle mobile map
   */
  toggleTabletMap = () => {
    const { isTabletMapVisible } = this.state;

    this.setState({ isTabletMapVisible: !isTabletMapVisible });
  }

  /**
   * On Container scroll handler.
   */
  onScrollHandlerMobile = async () => {
    const { isMobile } = this.state;

    if (!isMobile) {
      return false;
    }

    // Resize map
    this.resizeMap();

    // Control view map button visibility
    const viewMapButton = document.getElementById('search-page__map-btn');
    const SCROLL_TOP_OFFSET = 218;
    if (window.pageYOffset < SCROLL_TOP_OFFSET && viewMapButton) {
      viewMapButton.classList.add('d-none');
    }

    if (window.pageYOffset > SCROLL_TOP_OFFSET && viewMapButton) {
      viewMapButton.classList.remove('d-none');
    }

    const rect = this.componentRefs?.footerComponentRef?.getBoundingClientRect();
    if (rect?.y <= window.innerHeight && viewMapButton) {
      viewMapButton.classList.add('d-none');
    }

    return true;
  }

  /**
   * On Container scroll handler (Tablet).
   */
  onScrollHandlerTablet = async () => {
    const { isTablet } = this.state;

    if (!isTablet) {
      return false;
    }

    const rect = this.componentRefs.footerComponentRef.getBoundingClientRect();
    const viewMapButton = document.getElementById('search-page__map-btn');

    if (rect.y <= window.innerHeight && viewMapButton) {
      viewMapButton.classList.add('d-none');
    } else {
      viewMapButton.classList.remove('d-none');
    }

    return true;
  }

  /**
   * Create ref.
   */
  createRef = (refName) => (ref) => {
    this.componentRefs[refName] = ref;
  }

  /**
   * Show mobile map
   */
  showMobileMap = () => {
    window.scrollTo(0, 0);
  }

  /**
   * When user interacts with map.
   */
  onMapInteractions = ({ mapRadius, center }) => {
    const { fetchCampers } = this.props;

    fetchCampers({
      radius: mapRadius,
      latitude: center.latitude,
      longitude: center.longitude,
    });
  }

  /**
   * Rebuild map markers.
   */
  rebuildMapMarkers = () => {
    if (!this.componentRefs.mapComponentRef) {
      return false;
    }

    this.componentRefs.mapComponentRef.deleteAllMarkers();
    this.componentRefs.mapComponentRef.createMarkers();

    return true;
  }

  /**
   * Should show skeleton
   */
  get shouldShowSkeleton() {
    const { searchParams } = this.props;

    return !isPresent(searchParams.location);
  }

  /**
   * On scroll handler.
   */
  get onScrollHandler() {
    const { isMobile, isTablet } = this.state;

    if (isMobile) {
      return this.onScrollHandlerMobile;
    }

    if (isTablet) {
      return this.onScrollHandlerTablet;
    }

    return undefined;
  }

  /**
   * Lifecycle method.
   */
  render() {
    return (
      <DestinationsLandingPageComponent
        {...this.props}
        {...this.state}
        toggleTabletMap={this.toggleTabletMap}
        createRef={this.createRef}
        componentRefs={this.componentRefs}
        showMobileMap={this.showMobileMap}
        shouldShowSkeleton={this.shouldShowSkeleton}
        onDragEnd={this.onMapInteractions}
        onZoomEnd={this.onMapInteractions}
        onTouchStart={this.showMobileMap}
        toggleDesktopMapVisibility={this.toggleDesktopMapVisibility}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
  areCampersFetching: loadingSelector(state, fetchCampersEndpoint.endpoint),
  searchParams: searchDestinationParamsSelector(state),
});

const mapDispatchToProps = {
  fetchCampers: fetchCampersAction,
};

export { DestinationsLandingPage as DestinationsLandingPageContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
)(DestinationsLandingPage);
