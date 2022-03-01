import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountTab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
        iconClass,
      },
    } = this;

    let className = 'main-account__tabs-item';

    if (activeTab === label) {
      className += ' main-account__tabs-item--active';
    }

    return (
      <div
        className={className}
        onClick={onClick}
        role="button"
      >
        <i className={`icon mr-8 font-20 ${iconClass}`} />
        {label}
      </div>
    );
  }
}

export default AccountTab;
