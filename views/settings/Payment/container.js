import React from 'react';

import attachLayout from 'views/layouts/attachLayout';
import SettingsLayout from 'views/layouts/Settings';
import AccountComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class Payment extends React.PureComponent {
  render = () => (
    <AccountComponent
      {...this.props}
    />
  );
}

export { Payment as PaymentContainer };
export default attachLayout(SettingsLayout)(Payment);
