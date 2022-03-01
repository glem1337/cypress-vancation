import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { APP_HOST } from 'constants';
import { CAMPER_INCLUSION } from 'constants/camper';
import isPresent from 'utils/isPresent';
import isMobileView from 'utils/breakpoints/isMobileView';
import { createCamperDetailsRoute } from 'utils/createRouteHelper';
import {
  setCurrentCoordinates as setCurrentCoordinatesAction,
  setOpenGraphData as setOpenGraphDataAction,
} from 'state/app/actions';
import { fetchCamper, fetchCamperFacilities, setCamperPricingAndFeesId } from 'state/concepts/camper/actions';
import { clearSearchDestinationParams as clearSearchDestinationParamsAction } from 'state/concepts/search-destinations/actions';
import { currentUserSelector } from 'state/concepts/session/selectors';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import { camperSelector, isCamperExistSelector } from 'state/concepts/camper/selectors';
import getMainPhoto from 'utils/camper/getMainPhoto';

import CamperDetailsComponent from './component';

class CamperDetails extends React.Component {
  static propTypes = {
    router: PropTypes.shape().isRequired,
    setCurrentCoordinates: PropTypes.func.isRequired,
    searchDestinationParams: PropTypes.shape().isRequired,
    clearSearchDestinationParams: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    navigator.geolocation.getCurrentPosition(
      this.currentLocationSuccess,
      this.currentLocationError,
    );

    this.destinationsInputRef = React.createRef();

    this.headerRef = React.createRef();

    this.state = {
      isStartInputVisible: false,
      isChooseDestinationSmallVisible: false,
      scrolled: true,
    };
  }

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;
    const { model } = ctx.query;

    const inclusions = [
      CAMPER_INCLUSION.SPECIFICATIONS_DETAILS,
      CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_MILEAGE,
      CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_GENERATOR,
      CAMPER_INCLUSION.TRIP_FEE.CUSTOM_FEES,
      CAMPER_INCLUSION.CAMPER_PHOTOS,
      CAMPER_INCLUSION.DELIVERY_INFORMATION,
      CAMPER_INCLUSION.CAMPER_RULE,
    ];

    ctx.store.dispatch(setCamperPricingAndFeesId(null));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(fetchCamperFacilities(camperId));

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    await ctx.store.logicMiddleware.whenComplete();

    const camper = camperSelector(ctx.store.getState(), camperId);

    const camperPhoto = getMainPhoto(camper, 'photoUrl1100', true);

    const route = createCamperDetailsRoute({ model, id: camperId });

    ctx.store.dispatch(setOpenGraphDataAction({
      openGraph: {
        url: `${APP_HOST}/${route}`,
        title: 'Rent your campervan',
        type: 'website',
        image: camperPhoto,
        siteName: 'Vancation',
        description: `Check out this great campervan, ${camper.name}, on Vancation`,
      },
      twitter: {
        card: 'summary',
        image: camperPhoto,
      },
    }));

    return { camperId, camperPhoto };
  };

  componentDidMount() {
    const { clearSearchDestinationParams } = this.props;

    window.addEventListener('scroll', this.scrollHandler);

    this.scrollHandler();
    clearSearchDestinationParams();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  currentLocationSuccess = ({ coords }) => {
    const { setCurrentCoordinates } = this.props;

    setCurrentCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  get isDestinationParamsFilled() {
    const { searchDestinationParams } = this.props;

    return (
      isPresent(searchDestinationParams.dateRange)
      || isPresent(searchDestinationParams.location)
      || isPresent(searchDestinationParams.locationIntent)
    );
  }

  scrollHandler = () => {
    const { scrolled } = this.state;
    const isMobileViewDetected = isMobileView();

    const WINDOW_Y_OFFSET = window.innerWidth * 0.47;

    if (window.pageYOffset > WINDOW_Y_OFFSET && !scrolled) {
      const smallInputName = this.isDestinationParamsFilled || isMobileViewDetected
          ? 'isChooseDestinationSmallVisible'
          : 'isStartInputVisible';

      this.setState({
        [smallInputName]: true,
        scrolled: true,
      });

      if (this.headerRef.current) {
        this.headerRef.current.setMenuGroupVisibility(true);
      }
    }

    if (window.pageYOffset <= WINDOW_Y_OFFSET && scrolled) {
      this.setState({
        isChooseDestinationSmallVisible:
          this.isDestinationParamsFilled || isMobileViewDetected,
        isStartInputVisible:
          !this.isDestinationParamsFilled && !isMobileViewDetected,
        scrolled: false,
      });

      if (this.headerRef.current && !this.isDestinationParamsFilled) {
        this.headerRef.current.setMenuGroupVisibility(false);
      }
    }
  };

  onStartInputFocus = () => {
    this.setState(
      {
        isStartInputVisible: false,
        isChooseDestinationSmallVisible: true,
      },
      this.focusDestinationsInput,
    );

    if (this.headerRef.current) {
      this.headerRef.current.setMenuGroupVisibility(true);
    }
  };

  currentLocationError = () => {
    const { setCurrentCoordinates } = this.props;

    setCurrentCoordinates({
      latitude: null,
      longitude: null,
    });
  };

  get getActive() {
    const { router } = this.props;
    const splitUrl = router.pathname.split('/');

    return splitUrl[splitUrl.length - 1];
  }

  focusDestinationsInput = () => {
    if (this.isDestinationParamsFilled) {
      return false;
    }

    if (!isPresent(this.destinationsInputRef.current)) {
      return false;
    }

    this.destinationsInputRef.current.focus();

    return true;
  };

  render() {
    return (
      <CamperDetailsComponent
        {...this.props}
        {...this.state}
        active={this.getActive}
        onStartInputFocus={this.onStartInputFocus}
        destinationsInputRef={this.destinationsInputRef}
        isDestinationParamsFilled={this.isDestinationParamsFilled}
        headerRef={this.headerRef}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: currentUserSelector(state),
  searchDestinationParams: searchDestinationParamsSelector(state),
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  setCurrentCoordinates: setCurrentCoordinatesAction,
  clearSearchDestinationParams: clearSearchDestinationParamsAction,
};

export { CamperDetails as CamperDetailsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl,
)(CamperDetails);
