import React from 'react';

import UserHeaderComponent from './component';

class UserHeader extends React.PureComponent {
  state = { visible: false };

  toggleAccountWidget = visible => this.setState({ visible });

  render = () => (
    <UserHeaderComponent
      isAccountWidgetVisible={this.state.visible}
      onAccountWidgetToggle={this.toggleAccountWidget}
      {...this.props}
    />
  );
}

export default UserHeader;
