import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { DEFAULT_VISIBLE_RULES_COUNT } from 'constants/camperDetails/rules';

import { loadingSelector } from 'state/data/selectors';
import { fetchCamperTravelAssertionsEndpoint } from 'state/concepts/camper/endpoints';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import HealthAndSafetyComponent from './component';

class HealthAndSafety extends React.Component {
  static defaultProps = {
    camper: undefined,
  };

  static propTypes = {
    camper: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      allItemsVisible: false,
    };
  }

  get items() {
    const { camper } = this.props;

    return R.pipe(
      R.pathOr([], ['camperAddition', 'amenityHealthSafetyItems']),
      R.map(({ healthSafety }) => ({
        id: healthSafety?.id,
        icon: healthSafety?.iconUrl,
        title: healthSafety?.name,
        available: true,
      })),
    )(camper);
  }

  get visibleItems() {
    const { allItemsVisible } = this.state;
    const count = allItemsVisible
      ? this.items.length
      : DEFAULT_VISIBLE_RULES_COUNT;

    return this.items.slice(0, count);
  }

  toggleVisibleItems = () => {
    this.setState((prevState) => ({
      allItemsVisible: !prevState.allItemsVisible,
    }));
  };

  render() {
    return (
      <HealthAndSafetyComponent
        {...this.state}
        {...this.props}
        total={this.items.length}
        items={this.visibleItems}
        onToggle={this.toggleVisibleItems}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: loadingSelector(
    state,
    fetchCamperTravelAssertionsEndpoint(ownProps?.camperId).endpoint,
  ),
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

export { HealthAndSafety as HealthAndSafetyContainer };
export default connect(mapStateToProps)(HealthAndSafety);
