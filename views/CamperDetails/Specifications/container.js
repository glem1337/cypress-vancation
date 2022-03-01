import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';

import {
  DETAILS_CONFIG,
  MAX_DESCRIPTION_VISIBLE_SYMBOLS,
  DEFAULT_VISIBLE_DETAILS,
} from 'constants/camperDetails';

import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import SpecificationsComponent from './component';

class Specifications extends React.Component {
  static defaultProps = {
    camper: null,
  };

  static propTypes = {
    camper: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      allDescriptionVisible: false,
      allDetailsVisible: false,
    };
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      allDescriptionVisible: !prevState.allDescriptionVisible,
    }));
  };

  get description() {
    const { camper } = this.props;
    const { allDescriptionVisible } = this.state;

    const description = R.pathOr('', ['description'], camper);

    if (
      allDescriptionVisible
      || description.length <= MAX_DESCRIPTION_VISIBLE_SYMBOLS
    ) {
      return description;
    }

    return `${description.substring(0, MAX_DESCRIPTION_VISIBLE_SYMBOLS)}...`;
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      allDetailsVisible: !prevState.allDetailsVisible,
    }));
  };

  get detailsConfig() {
    const { allDetailsVisible } = this.state;

    const isDesktop = !isMobileView() && !isTabletView();
    const itemsCount = isDesktop
      ? DEFAULT_VISIBLE_DETAILS.DESKTOP
      : DEFAULT_VISIBLE_DETAILS.MOBILE;

    return allDetailsVisible
      ? DETAILS_CONFIG
      : DETAILS_CONFIG.slice(0, itemsCount);
  }

  render() {
    return (
      <SpecificationsComponent
        {...this.state}
        {...this.props}
        toggleDescription={this.toggleDescription}
        description={this.description}
        detailsConfig={this.detailsConfig}
        toggleDetails={this.toggleDetails}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

export { Specifications as SpecificationsContainer };
export default connect(mapStateToProps)(Specifications);
