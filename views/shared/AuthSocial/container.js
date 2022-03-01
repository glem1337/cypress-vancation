import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userAuthSocial } from 'state/concepts/session/actions';
import { SOCIAL_LIST } from 'constants';
import AuthSocialComponent from './component';

class AuthSocial extends React.Component {
  static propTypes = {
    userAuthSocial: PropTypes.func.isRequired,
    redirectRoute: PropTypes.string,
  };

  static defaultProps = {
    redirectRoute: null,
  };

  handlerGoogle = ({ tokenId }) => {
    const { redirectRoute } = this.props;

    this.props.userAuthSocial({
      token: tokenId,
      social: SOCIAL_LIST.GOOGLE.NAME,
      redirectRoute,
    });
  }

  handlerFacebook = ({ accessToken }) => {
    const { redirectRoute } = this.props;

    this.props.userAuthSocial({
      token: accessToken,
      social: SOCIAL_LIST.FACEBOOK.NAME,
      redirectRoute,
    });
  }

  render = () => (
    <AuthSocialComponent
      handlerGoogle={this.handlerGoogle}
      handlerFacebook={this.handlerFacebook}
    />
  )
}

const mapDispatchToProps = {
  userAuthSocial,
};

export { AuthSocial as AuthSocialContainer };
export default connect(null, mapDispatchToProps)(AuthSocial);
