import React from 'react';

import UserDropdownComponent from './component';

class UserDropdown extends React.Component {
  getPopupContainer = () => document.getElementById('main-account-header__user');

  render() {
    return (
      <UserDropdownComponent
        {...this.props}
        getPopupContainer={this.getPopupContainer}
      />
    );
  }
}

export default UserDropdown;
