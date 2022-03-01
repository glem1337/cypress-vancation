import React from 'react';
import PropTypes from 'prop-types';

import SmallSwitchCardComponent from './component';

class SmallSwitchCard extends React.Component {
  static defaultProps = {
    disabled: false,
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
  };

  onCardClickHandler = () => {
    const { checked, onChange, disabled } = this.props;

    if (disabled) return;

    onChange(!checked);
  };

  render() {
    return (
      <SmallSwitchCardComponent
        {...this.props}
        onCardClick={this.onCardClickHandler}
      />
    );
  }
}

export default SmallSwitchCard;
