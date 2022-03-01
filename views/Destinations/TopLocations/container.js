import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import deepEqual from 'fast-deep-equal';
import { connect } from 'react-redux';

import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

import TopLocationsComponent from './component';

const DESKTOP_SLIDES_COUNT = 3;
const TABLET_SLIDES_COUNT = 2;
const MOBILE_SLIDES_COUNT = 1;

class TopLocations extends React.Component {
  static propTypes = {
    location: PropTypes.shape(),
  }

  static defaultProps = {
    location: {},
  }

  constructor(props) {
    super(props);

    this.swiperRef = React.createRef();

    this.state = {
      swiperOptions: {
        pagination: { type: 'fraction' },
        watchOverflow: true,
        loop: props.location?.topLocationLandings?.length > DESKTOP_SLIDES_COUNT,
        loopFillGroupWithBlank: true,
        slidesPerView: DESKTOP_SLIDES_COUNT,
        slidesPerGroup: DESKTOP_SLIDES_COUNT,
        spaceBetween: 24,
      },
      isMobileOptions: false,
      showPagination: props.location?.topLocationLandings?.length > DESKTOP_SLIDES_COUNT,
      swiperLayoutKey: uuid(),
    };
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Lifecycle method.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Lifecycle method.
   */
  componentDidUpdate(_, prevState) {
    if (!deepEqual(prevState, this.state) && this.swiperRef?.current?.swiper?.update) {
      this.swiperRef.current.swiper.update();
    }
  }

  /**
   * Handle resize event.
   */
  handleResize = () => {
    const { location } = this.props;

    const { isMobileOptions } = this.state;

    const isMobile = isMobileView();
    const isTablet = isTabletView();
    const isDesktop = !isMobile && !isTablet;

    if (isMobile && !isMobileOptions) {
      this.setState({
        swiperOptions: {
          pagination: { type: 'fraction' },
          slidesPerView: 'auto',
          loop: location?.topLocationLandings?.length > MOBILE_SLIDES_COUNT,
          watchOverflow: true,
          freeMode: true,
          freeModeSticky: true,
        },
        isMobileOptions: true,
        showPagination: false,
        swiperLayoutKey: uuid(),
      });

      return;
    }

    if (isTablet && !isMobileOptions) {
      this.setState({
        swiperOptions: {
          pagination: { type: 'fraction' },
          slidesPerView: 'auto',
          loop: location?.topLocationLandings?.length > TABLET_SLIDES_COUNT,
          watchOverflow: true,
          freeMode: true,
          freeModeSticky: true,
        },
        isMobileOptions: true,
        showPagination: false,
        swiperLayoutKey: uuid(),
      });

      return;
    }

    if (isDesktop && isMobileOptions) {
      this.setState({
        swiperOptions: {
          pagination: { type: 'fraction' },
          watchOverflow: true,
          loop: location?.topLocationLandings?.length > DESKTOP_SLIDES_COUNT,
          loopFillGroupWithBlank: true,
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 24,
        },
        isMobileOptions: false,
        showPagination: location?.topLocationLandings?.length > DESKTOP_SLIDES_COUNT,
        swiperLayoutKey: uuid(),
      });
    }
  }

  /**
   * Move swiper left
   */
  moveLeft = () => {
    if (!this.swiperRef?.current?.swiper?.slidePrev) {
      return false;
    }

    this.swiperRef.current.swiper.slidePrev();

    return true;
  };

  /**
   * Move swiper right
   */
  moveRight = () => {
    if (!this.swiperRef?.current?.swiper?.slideNext) {
      return false;
    }

    this.swiperRef.current.swiper.slideNext();

    return true;
  }

  get componentData() {
    const { location } = this.props;

    return {
      title: location?.topCityTitle,
      locations: location?.topLocationLandings,
      stateSlug: location?.slug,
    };
  }

  render() {
    return (
      <TopLocationsComponent
        {...this.props}
        {...this.state}
        moveLeft={this.moveLeft}
        moveRight={this.moveRight}
        swiperRef={this.swiperRef}
        componentData={this.componentData}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  location: searchDestinationParamsSelector(state)?.location,
});

export { TopLocations as TopLocationsContainer };
export default connect(mapStateToProps)(TopLocations);
