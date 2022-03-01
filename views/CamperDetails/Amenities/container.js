import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';

import {
  GLAMPER_ITEM_CONFIG,
  GLAMPER_CONFIG_ITEM_ID,
} from 'constants/camperDetails/amenities';

import isPresent from 'utils/isPresent';

import { fetchCamperFacilitiesEndpoint } from 'state/concepts/camper/endpoints';
import { fetchCamperFacilities } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import AmenitiesComponent from './component';

class Amenities extends React.Component {
  static defaultProps = {
    camper: null,
  };

  static propTypes = {
    fetchAmenities: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    isCamperExist: PropTypes.bool.isRequired,
    camper: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      allPanelsActive: false,
      activePanelIds: [GLAMPER_CONFIG_ITEM_ID],
    };
  }

  get glamper() {
    const { camper } = this.props;
    const glamperConfig = [];
    const glamperSubAmenities = [];

    camper?.amenities.forEach((amenity) => {
      const configSubAmenities = R.pathOr(
        [],
        ['configurationAmenity', 'configurationSubAmenities'],
        amenity,
      );

      configSubAmenities.forEach((subAmenity) => {
        if (subAmenity.glamperSubAmenity) {
          glamperConfig.push(subAmenity);
        }
      });

      const configOptions = R.pathOr(
        [],
        ['configurationAmenity', 'configurationAmenityOptions'],
        amenity,
      );

      configOptions.forEach(({ configurationSubAmenities }) => {
        configurationSubAmenities.forEach((subAmenity) => {
          if (subAmenity.glamperSubAmenity) {
            glamperConfig.push(subAmenity);
          }
        });
      });

      const subAmenities = R.pathOr([], ['subAmenities'], amenity);

      subAmenities.forEach((subAmenity) => {
        const { configurationSubAmenity } = subAmenity;
        if (configurationSubAmenity.glamperSubAmenity) {
          glamperSubAmenities.push(subAmenity);
        }
      });

      const options = R.pathOr([], ['amenityOptions'], amenity);

      options.forEach((option) => {
        // eslint-disable-next-line no-shadow
        const { subAmenities } = option;

        subAmenities.forEach((subAmenity) => {
          const { configurationSubAmenity } = subAmenity;
          if (configurationSubAmenity.glamperSubAmenity) {
            glamperSubAmenities.push(subAmenity);
          }
        });
      });
    });

    return {
      configurationAmenity: {
        ...GLAMPER_ITEM_CONFIG,
        configurationSubAmenities: glamperConfig,
        configurationAmenityOptions: [],
      },
      subAmenities: glamperSubAmenities,
    };
  }

  get items() {
    const { camper } = this.props;

    return camper?.amenities.filter(
      (item) => isPresent(item.subAmenities) || isPresent(item.amenityOptions),
    );
  }

  togglePanels = () => {
    this.setState((prevState) => ({
      allPanelsActive: !prevState.allPanelsActive,
      activePanelIds: !prevState.allPanelsActive
        ? [this.glamper, ...this.items].map(
            ({ configurationAmenity }) => configurationAmenity.id,
          )
        : [],
    }));
  };

  onCollapseChangeHandler = (ids) => {
    this.setState({
      allPanelsActive: [this.glamper, ...this.items].length === ids.length,
      activePanelIds: ids,
    });
  };

  render() {
    return (
      <AmenitiesComponent
        {...this.state}
        {...this.props}
        items={this.items}
        togglePanels={this.togglePanels}
        onCollapseChangeHandler={this.onCollapseChangeHandler}
        glamper={this.glamper}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: loadingSelector(
    state,
    fetchCamperFacilitiesEndpoint(ownProps?.camperId).endpoint,
  ),
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  fetchAmenities: fetchCamperFacilities,
};

export { Amenities as AmenitiesContainer };
export default connect(mapStateToProps, mapDispatchToProps)(Amenities);
