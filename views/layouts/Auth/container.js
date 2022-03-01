import React from 'react';

import authenticate from 'lib/authenticate';

import { USERS_STATUS } from 'constants';

import AuthLayoutComponent from './component';

class AuthLayout extends React.PureComponent {
  static getInitialProps = (ctx) => {
    authenticate(USERS_STATUS.GUSTS, ctx);
  };

  render = () => <AuthLayoutComponent {...this.props} />;
}

export default AuthLayout;
