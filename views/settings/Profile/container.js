import React from 'react';

import attachLayout from 'views/layouts/attachLayout';
import SettingsLayout from 'views/layouts/Settings';
import ProfileComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends React.PureComponent {
  render = () => (
    <ProfileComponent
      {...this.props}
    />
  );
}

export { Profile as ProfileContainer };
export default attachLayout(SettingsLayout)(Profile);
