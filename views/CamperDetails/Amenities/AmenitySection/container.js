import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';

import AmenitySectionComponent from './component';

class AmenitySection extends React.Component {
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

  prepareSubAmenities = (subAmenities = [], config = []) => {
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
    )(config);

    return allItemsVisible ? items : items.filter((item) => item.available);
  };

  get subAmenities() {
    const {
      amenity: { subAmenities, configurationAmenity },
    } = this.props;

    return this.prepareSubAmenities(
      subAmenities,
      configurationAmenity.configurationSubAmenities,
    );
  }

  get options() {
    const {
      amenity: { amenityOptions, configurationAmenity },
    } = this.props;
    const { allItemsVisible } = this.state;

    const items = R.pipe(
      R.map((item) => {
        const selected = R.find(
          R.pipe(R.prop('configurationAmenityOption'), R.propEq('id', item.id)),
        )(amenityOptions);

        return {
          id: item.id,
          iconUrl: item.iconUrl,
          title: item.title,
          tooltip: item.tooltip,
          subAmenities: this.prepareSubAmenities(
            selected?.subAmenities,
            selected?.configurationAmenityOption.configurationSubAmenities,
          ),
          available: isPresent(selected),
        };
      }),
      R.sort(this.sortByAvailability),
      R.reverse,
    )(configurationAmenity.configurationAmenityOptions);

    return allItemsVisible ? items : items.filter((item) => item.available);
  }

  render() {
    return (
      <AmenitySectionComponent
        {...this.state}
        {...this.props}
        subAmenities={this.subAmenities}
        options={this.options}
        toggleVisibility={this.toggleVisibility}
      />
    );
  }
}

export default AmenitySection;
