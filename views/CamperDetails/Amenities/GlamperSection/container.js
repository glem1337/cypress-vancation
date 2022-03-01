import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { GLAMPER_DEFAULT_VISIBLE_ITEMS } from 'constants/camperDetails/amenities';

import isPresent from 'utils/isPresent';

import GlamperSectionComponent from './component';

class GlamperSection extends React.Component {
  static propTypes = {
    amenity: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      allItemsVisible: false,
    };
  }

  toggleVisibility = () => {
    this.setState((prevState) => ({
      allItemsVisible: !prevState.allItemsVisible,
    }));
  };

  sortByAvailability = (a, b) => a.available - b.available;

  get subAmenities() {
    const {
      amenity: { subAmenities, configurationAmenity },
    } = this.props;
    const { allItemsVisible } = this.state;

    const items = R.pipe(
      R.map((item) => {
        const selected = R.find(
          R.pipe(R.prop('configurationSubAmenity'), R.propEq('id', item.id)),
        )(subAmenities);

        return {
          id: item.id,
          iconUrl: item.iconUrl,
          title: item.title,
          tooltip: item.tooltip,
          available: isPresent(selected),
          quantity: selected?.quantity || 0,
        };
      }),
      R.sort(this.sortByAvailability),
      R.reverse,
    )(configurationAmenity.configurationSubAmenities);

    return allItemsVisible
      ? items
      : items
          .filter((item) => item.available)
          .slice(0, GLAMPER_DEFAULT_VISIBLE_ITEMS);
  }

  render() {
    return (
      <GlamperSectionComponent
        {...this.state}
        {...this.props}
        subAmenities={this.subAmenities}
        toggleVisibility={this.toggleVisibility}
      />
    );
  }
}

export default GlamperSection;
