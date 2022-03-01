import React from 'react';
import PropTypes from 'prop-types';

import { MAX_DESCRIPTION_VISIBLE_SYMBOLS } from 'constants/camperDetails/addons';

import AddonCardComponent from './component';

class AddonCard extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      allDescriptionVisible: false,
    };
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      allDescriptionVisible: !prevState.allDescriptionVisible,
    }));
  };

  get visibleDescription() {
    const { description } = this.props;
    const { allDescriptionVisible } = this.state;

    if (
      allDescriptionVisible
      || description.length <= MAX_DESCRIPTION_VISIBLE_SYMBOLS
    ) {
      return description;
    }

    return `${description.substring(0, MAX_DESCRIPTION_VISIBLE_SYMBOLS)}...`;
  }

  render() {
    return (
      <AddonCardComponent
        {...this.state}
        {...this.props}
        visibleDescription={this.visibleDescription}
        toggleDescription={this.toggleDescription}
      />
    );
  }
}

export default AddonCard;
