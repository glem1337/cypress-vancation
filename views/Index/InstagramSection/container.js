import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import deepEqual from 'fast-deep-equal';
import * as R from 'ramda';

import { fetchInstagramPhotos as fetchInstagramPhotosAction } from 'state/concepts/home/actions';
import {
  instagramPhotosSelector,
  instagramPhotosPageSelector,
  instagramPhotosTotalSelector,
} from 'state/concepts/home/selectors';
import { fetchInstagramPhotosEndpoint } from 'state/concepts/home/endpoints';
import { dataDeleteEntity as dataDeleteEntityAction } from 'state/data/actions';
import { loadingSelector } from 'state/data/selectors';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import isPresent from 'utils/isPresent';

import InstagramSectionComponent from './component';

const DESKTOP_SLIDES_COUNT = 4;
const INTERSECTION_OFFSET = 700;

class InstagramSection extends React.Component {
  static propTypes = {
    fetchInstagramPhotos: PropTypes.func.isRequired,
    dataDeleteEntity: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    arePhotosFetching: PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    arePhotosFetching: false,
    photos: [],
  }

  constructor(props) {
    super(props);

    this.isDataRequested = false;

    this.activeSlideIndex = null;

    this.swiperRef = React.createRef();

    this.sliderWrapperRef = React.createRef();

    this.containerRef = React.createRef();

    this.state = {
      swiperProps: {
        watchOverflow: true,
        loop: props.total === props.photos?.length,
        loopFillGroupWithBlank: true,
        slidesPerView: DESKTOP_SLIDES_COUNT,
        slidesPerGroup: DESKTOP_SLIDES_COUNT,
        spaceBetween: 24,
        lazy: {
          loadPrevNext: true,
        },
        pagination: {
          type: 'fraction',
        },
      },
      isMobileOptions: undefined,
      showPagination: true,
      swiperLayoutKey: uuid(),
      allowTouchMove: true,
    };
  }

  /**
   * Lifecycle method.
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    this.observer = new IntersectionObserver(this.handleIntersect, {
      rootMargin: `${INTERSECTION_OFFSET}px`,
    });
    this.observer.observe(this.containerRef.current);
  }

  /**
   * Lifecycle method.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.observer.unobserve(this.containerRef.current);
  }

  /**
   * Lifecycle method.
   */
  componentDidUpdate(prevProps, prevState) {
    const { arePhotosFetching, photos } = this.props;

    if (!deepEqual(prevState, this.state) && this.swiperRef?.current?.swiper?.update) {
      this.swiperRef.current.swiper.update();
    }

    if (prevProps.arePhotosFetching && !arePhotosFetching) {
      if (this.sliderWrapperRef.current) {
        const spins = document.querySelectorAll('.home-insta__img .search-page__spin');
        // eslint-disable-next-line no-param-reassign
        spins.forEach(item => { item.style.zIndex = 10; });

        this.sliderWrapperRef.current.classList.remove('instagram_slider_wrapper--disabled');
      }

      if (this.swiperRef.current?.swiper?.update) {
        this.swiperRef.current?.swiper.update();
      }

      if (isPresent(photos)) {
        this.isDataRequested = true;
      }

      this.handleResize();
      this.createSwiperLoop();
    }
  }

  /**
   * Handle intersect.
   */
  handleIntersect = (entries) => {
    const { fetchInstagramPhotos } = this.props;

    const isIntersecting = R.path(['0', 'isIntersecting'], entries);

    if (isIntersecting && !this.isDataRequested) {
      fetchInstagramPhotos();
    }
  }

  /**
   * Handle resize event.
   */
   handleResize = () => {
    const { photos, total } = this.props;

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
          loop: total === photos.length,
          lazy: {
            loadPrevNext: true,
          },
          pagination: {
            type: 'fraction',
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
          loop: total === photos.length,
          loopFillGroupWithBlank: true,
          slidesPerView: DESKTOP_SLIDES_COUNT,
          slidesPerGroup: DESKTOP_SLIDES_COUNT,
          spaceBetween: 24,
          lazy: {
            loadPrevNext: true,
          },
          pagination: {
            type: 'fraction',
          },
        },
        isMobileOptions: false,
        showPagination: photos?.length > DESKTOP_SLIDES_COUNT,
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

  /**
   * Amount slides
   */
  get amountSlides() {
    const { total } = this.props;

    const { isMobileOptions } = this.state;

    const batch = isMobileOptions
      ? 1
      : DESKTOP_SLIDES_COUNT;

    return parseInt(total / batch, 10);
  }

  /**
   * On swiper init
   */
  onSwiperInit = (swiper) => {
    // eslint-disable-next-line no-param-reassign
    swiper.params.pagination.formatFractionTotal = () => this.amountSlides;
    swiper.pagination.update();
  }

  /**
   * Can move left
   */
  get canMoveLeft() {
    const { total, photos } = this.props;

    return photos.length === total;
  }

  /**
   * Create swiper loop
   */
  createSwiperLoop = () => {
    const { total, photos } = this.props;

    const { swiperProps } = this.state;

    if (!this.swiperRef.current?.swiper || total !== photos.length) {
      return false;
    }

    this.setState({
      swiperProps: {
        ...swiperProps,
        loop: true,
      },
    });

    return true;
  }

  /**
   * On reach end
   */
  onReachEnd = () => {
    const {
      photos,
      fetchInstagramPhotos,
      page,
      total,
    } = this.props;

    if (photos.length === total) {
      return false;
    }

    if (this.sliderWrapperRef.current) {
      this.sliderWrapperRef.current.classList.add('instagram_slider_wrapper--disabled');

      const spins = document.querySelectorAll('.home-insta__img .search-page__spin');
      // eslint-disable-next-line no-param-reassign
      spins.forEach(item => { item.style.zIndex = 12; });
    }

    fetchInstagramPhotos({ page: page + 1 });

    return true;
  }

  render() {
    return (
      <InstagramSectionComponent
        {...this.props}
        {...this.state}
        moveLeft={this.moveLeft}
        moveRight={this.moveRight}
        swiperRef={this.swiperRef}
        onSwiperInit={this.onSwiperInit}
        canMoveLeft={this.canMoveLeft}
        onReachEnd={this.onReachEnd}
        sliderWrapperRef={this.sliderWrapperRef}
        containerRef={this.containerRef}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  photos: instagramPhotosSelector(state),
  page: instagramPhotosPageSelector(state),
  total: instagramPhotosTotalSelector(state),
  arePhotosFetching: loadingSelector(state, fetchInstagramPhotosEndpoint.endpoint),
});

const mapDispatchToProps = {
  fetchInstagramPhotos: fetchInstagramPhotosAction,
  dataDeleteEntity: dataDeleteEntityAction,
};

export { InstagramSection as InstagramSectionContainer };
export default connect(mapStateToProps, mapDispatchToProps)(InstagramSection);
