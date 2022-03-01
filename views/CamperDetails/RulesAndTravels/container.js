import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import withIntersectionObserver from 'utils/hocs/withIntersectionObserver';

import {
  DEFAULT_VISIBLE_RESTRICTIONS_COUNT,
  DEFAULT_VISIBLE_RULES_COUNT,
  RULES_CONFIG,
  TRAVELS_CONFIG,
  ROADS_CONFIG,
} from 'constants/camperDetails/rules';

import { fetchCamperTravelAssertions } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { fetchCamperTravelAssertionsEndpoint } from 'state/concepts/camper/endpoints';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import RulesAndTravelsComponent from './component';

class RulesAndTravels extends React.Component {
  static defaultProps = {
    isVisible: undefined,
    camper: null,
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    fetchTravelAssertions: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    isCamperExist: PropTypes.bool.isRequired,
    camper: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      allRulesVisible: false,
      allLocationsVisible: false,
      allRoadsVisible: false,
    };
  }

  componentDidUpdate() {
    const { isVisible, fetchTravelAssertions, camperId, isCamperExist } = this.props;
    const { initialized } = this.state;

    if (isVisible && !initialized && isCamperExist) {
      fetchTravelAssertions(camperId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        initialized: true,
      });
    }
  }

  filterRules = (rules) => (key) => rules[key] && key !== 'id';

  getRuleConfigByKey = (key) => RULES_CONFIG[key];

  get rules() {
    const { camper } = this.props;

    const rules = R.pathOr(
      {
        allowPets: false,
        smoking: false,
        festivalApproved: false,
      },
      ['camperAddition', 'restrictionRule'],
      camper,
    );

    const rulesArray = R.pipe(
      R.keys,
      R.filter(this.filterRules(rules)),
      R.map(this.getRuleConfigByKey),
    )(rules);

    const customRules = R.pipe(
      R.pathOr([], ['camperAddition', 'customRestrictionRules']),
      R.filter((rule) => rule.active),
      R.map((rule) => ({
        id: rule.id,
        title: rule.name,
        available: true,
      })),
    )(camper);

    return [...rulesArray, ...customRules];
  }

  get visibleRules() {
    const { allRulesVisible } = this.state;
    const count = allRulesVisible
      ? this.rules.length
      : DEFAULT_VISIBLE_RULES_COUNT;

    return this.rules.slice(0, count);
  }

  toggleVisibleRules = () => {
    this.setState((prevState) => ({
      allRulesVisible: !prevState.allRulesVisible,
    }));
  };

  get locations() {
    const { camper } = this.props;

    const locations = R.pathOr(
      {
        mexico: false,
        canada: true,
        burningMan: false,
      },
      ['camperAddition', 'travelRestriction'],
      camper,
    );

    const locationsArray = R.pipe(
      R.keys,
      R.filter((key) => key !== 'id'),
      R.map((key) => ({
        ...TRAVELS_CONFIG[key],
        available: locations[key],
      })),
    )(locations);

    const customLocations = R.pipe(
      R.pathOr([], ['camperAddition', 'customTravelRestrictions']),
      R.map((location) => ({
        id: location.id,
        title: location.name,
        available: location.active,
      })),
    )(camper);

    return R.pipe(
      R.sort((a, b) => a.available - b.available),
      R.reverse,
    )([...customLocations, ...locationsArray]);
  }

  get visibleLocations() {
    const { allLocationsVisible } = this.state;
    const count = allLocationsVisible
      ? this.locations.length
      : DEFAULT_VISIBLE_RESTRICTIONS_COUNT;

    return this.locations.slice(0, count);
  }

  toggleVisibleLocations = () => {
    this.setState((prevState) => ({
      allLocationsVisible: !prevState.allLocationsVisible,
    }));
  };

  get hasAvailableLocation() {
    return this.locations.filter((location) => location.available).length > 0;
  }

  get roads() {
    const { camper } = this.props;

    const roads = R.pathOr(
      {
        fourWheelRoad: false,
        offRoad: false,
        snowAndIceRoad: false,
        dirtryRoad: true,
      },
      ['camperAddition', 'restrictionRoad'],
      camper,
    );

    const roadsArray = R.pipe(
      R.keys,
      R.filter((key) => key !== 'id'),
      R.map((key) => ({
        ...ROADS_CONFIG[key],
        available: roads[key],
      })),
    )(roads);

    const customRoads = R.pipe(
      R.pathOr([], ['camperAddition', 'customRestrictionRoads']),
      R.map((road) => ({
        id: road.id,
        title: road.name,
        available: road.active,
      })),
    )(camper);

    return R.pipe(
      R.sort((a, b) => a.available - b.available),
      R.reverse,
    )([...customRoads, ...roadsArray]);
  }

  get visibleRoads() {
    const { allRoadsVisible } = this.state;
    const count = allRoadsVisible
      ? this.roads.length
      : DEFAULT_VISIBLE_RESTRICTIONS_COUNT;

    return this.roads.slice(0, count);
  }

  toggleVisibleRoads = () => {
    this.setState((prevState) => ({
      allRoadsVisible: !prevState.allRoadsVisible,
    }));
  };

  get hasAvailableRoad() {
    return this.roads.filter((road) => road.available).length > 0;
  }

  render() {
    return (
      <RulesAndTravelsComponent
        {...this.state}
        {...this.props}
        totalRules={this.rules.length}
        visibleRules={this.visibleRules}
        toggleVisibleRules={this.toggleVisibleRules}
        totalLocations={this.locations.length}
        visibleLocations={this.visibleLocations}
        toggleVisibleLocations={this.toggleVisibleLocations}
        hasAvailableLocation={this.hasAvailableLocation}
        totalRoads={this.roads.length}
        visibleRoads={this.visibleRoads}
        toggleVisibleRoads={this.toggleVisibleRoads}
        hasAvailableRoad={this.hasAvailableRoad}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(
    state,
    fetchCamperTravelAssertionsEndpoint(ownProps?.camperId).endpoint,
  ),
});

const mapDispatchToProps = {
  fetchTravelAssertions: fetchCamperTravelAssertions,
};

export { RulesAndTravels as RulesAndTravelsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntersectionObserver(
    {
      isVisible: 0.0,
    },
    { rootMargin: '70% 0px' },
  ),
)(RulesAndTravels);
