import React from 'react';

import attachLayout from 'views/layouts/attachLayout';
import SettingsLayout from 'views/layouts/Settings';
import AccountComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class Notifications extends React.PureComponent {
  render = () => (
    <AccountComponent
      {...this.props}
    />
  );
}

export { Notifications as NotificationsContainer };
export default attachLayout(SettingsLayout)(Notifications);
