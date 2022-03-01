import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { FEATURED_LOCATION_SECTION } from 'constants/home';
import { MOBILE_DEVICE_WIDTH } from 'constants';
import { loadingSelector } from 'state/data/selectors';
import {
  fetchFavoriteDestinationsAction,
  setSlideFavoriteDestinationsAction,
} from 'state/concepts/campervan-rental/actions';
import { dataDeleteEntity as dataDeleteEntityAction } from 'state/data/actions';
import {
  locationLandingsSelector,
  favoriteCurrentSlideSelector,
  favoriteTotalSelector,
} from 'state/concepts/campervan-rental/selectors';
import { favoriteDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import deepEqual from 'fast-deep-equal';

import FavoriteDestinationsComponent from './component';

class FavoriteDestinations extends React.Component {
  constructor(props) {
    super(props);

    this.swiperRef = React.createRef();

    const { location, dataDeleteEntity } = props;

    if (location && location.length) {
      dataDeleteEntity({ kind: 'locationLanding' });
      dataDeleteEntity({ kind: 'stateLanding' });
    }

    this.state = {
      swiperProps: {
        watchOverflow: true,
        loop: true,
        spaceBetween: 24,
        lazy: {
          loadPrevNext: true,
        },
      },
      isMobileOptions: undefined,
      showPagination: true,
      swiperLayoutKey: uuid(),
      currentSnapIndex: 1,
    };
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    const { fetchFavoriteDestinations } = this.props;

    fetchFavoriteDestinations({
      pageNumber: 1,
      pageSize: FEATURED_LOCATION_SECTION.FETCH_FIRST_ITEMS,
    });

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
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
   componentDidUpdate(prevProps, prevState) {
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

    if ((isTablet || isMobile) && isMobileOptions !== true) {
      this.setState({
        swiperProps: {
          slidesPerView: 'auto',
          watchOverflow: true,
          freeMode: true,
          freeModeSticky: true,
          loop: true,
          lazy: {
            loadPrevNext: true,
          },
        },
        isMobileOptions: true,
        showPagination: false,
        swiperLayoutKey: uuid(),
      });

      return;
    }

    if (isDesktop && isMobileOptions !== false) {
      this.setState({
        swiperProps: {
          watchOverflow: true,
          loop: true,
          spaceBetween: 24,
          lazy: {
            loadPrevNext: true,
          },
        },
        isMobileOptions: false,
        showPagination: location?.length > 5,
        swiperLayoutKey: uuid(),
      });
    }
  }

  /**
   * If width screen is less than 768 slide will consist of 4 locations else consist 1 location
   */
  // eslint-disable-next-line class-methods-use-this
  get amountLocationOnSlide() {
    return window.innerWidth < MOBILE_DEVICE_WIDTH
      ? FEATURED_LOCATION_SECTION.SLIDE_ITEMS_MOBILE
      : FEATURED_LOCATION_SECTION.SLIDE_ITEMS;
  }

  get amountLocation() {
    const { location } = this.props;

    return location ? location.length : 0;
  }

  get isFetchingAllLocations() {
    const { favoriteTotal } = this.props;

    return this.amountLocation < favoriteTotal;
  }

  get amountSlides() {
    const { favoriteTotal } = this.props;

    return Math.ceil(favoriteTotal / this.amountLocationOnSlide);
  }

  get currentSlide() {
    const realIndex = this.swiperRef.current?.swiper?.realIndex || 0;

    return realIndex + 1;
  }

  /**
   * Build slide of 4 locations for desktop and 1 location for mobile
   */
  get builtSlides() {
    const { location } = this.props;
    let interimIndex = 0;
    let interimArray = [];
    const slides = [];

    if (!Array.isArray(location)) {
      return [];
    }

    location.forEach((elem, index) => {
      const prepareItem = {
        id: elem.id,
        img: elem.mainPhotoUrl900,
        locationName: elem.locationName,
        locationSlug: elem.slug,
        state: elem.stateLanding.state,
        stateSlug: elem.stateLanding.slug,
      };

      // Add parent id at first location of slide
      if (!interimIndex) {
        prepareItem.parentId = uuid();
      }

      // Add loading to slide
      interimArray.push(prepareItem);
      interimIndex += 1;

      // If slide loaded or this last location clear interims and add slide at list
      if (interimIndex === this.amountLocationOnSlide || (location.length - 1) === index) {
        slides.push(interimArray);
        interimArray = [];
        interimIndex = 0;
      }
    });

    return slides;
  }

  handlerPrev = () => {
    this.swiperRef.current.swiper.slidePrev();
  }

  handlerNext = () => {
    this.swiperRef.current.swiper.slideNext();
  }

  /**
   * If all locations were not retrieved and for the next slide there are no locations,
   * fetch the location and install the current page,
   * otherwise you do not fetch, and install the current page
   */
  handlerSlide = ({ activeIndex }) => {
    const { setSlideFeaturedLocation, fetchFavoriteDestinations } = this.props;
    const pageNumber = activeIndex + 1;
    const isFetchLocation = R.all(
      R.equals(true),
      ([
        (pageNumber * this.amountLocationOnSlide) > this.amountLocation,
        this.isFetchingAllLocations,
      ]),
    );

    setSlideFeaturedLocation(pageNumber);

    if (isFetchLocation) {
      fetchFavoriteDestinations({
        pageNumber,
        pageSize: this.amountLocationOnSlide,
      });
    }
  }

  render = () => (
    <FavoriteDestinationsComponent
      {...this.state}
      breakpoints={this.breakpoints}
      isLoading={this.props.isLoading}
      swiperRef={this.swiperRef}
      currentSlide={this.currentSlide}
      slides={this.builtSlides}
      amountSlides={this.amountSlides}
      amountLocation={this.amountLocation}
      isFetchingAllLocations={this.isFetchingAllLocations}
      amountLocationOnSlide={this.amountLocationOnSlide}
      handlerPrev={this.handlerPrev}
      handlerNext={this.handlerNext}
      handlerSlide={this.handlerSlide}
    />
  )
}

FavoriteDestinations.defaultProps = {
  isLoading: null,
  location: [],
};

FavoriteDestinations.propTypes = {
  fetchFavoriteDestinations: PropTypes.func.isRequired,
  setSlideFeaturedLocation: PropTypes.func.isRequired,
  dataDeleteEntity: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  currentSlide: PropTypes.number.isRequired,
  favoriteTotal: PropTypes.number.isRequired,
  location: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    mainPhotoUrl: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    stateLanding: PropTypes.shape({
      state: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  })),
};

const mapStateToProps = (state) => ({
  location: locationLandingsSelector(state),
  currentSlide: favoriteCurrentSlideSelector(state),
  isLoading: loadingSelector(state, favoriteDestinationsEndpoint.endpoint),
  favoriteTotal: favoriteTotalSelector(state),
});

const mapDispatchToProps = {
  fetchFavoriteDestinations: fetchFavoriteDestinationsAction,
  setSlideFeaturedLocation: setSlideFavoriteDestinationsAction,
  dataDeleteEntity: dataDeleteEntityAction,
};

export { FavoriteDestinations as FavoriteDestinationsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
)(FavoriteDestinations);
