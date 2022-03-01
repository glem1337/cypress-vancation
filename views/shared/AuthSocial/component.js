import React from 'react';
import { Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import { SOCIAL_LIST } from 'constants';
import GoogleBtn from './GoogleBtn';

const AuthSocialComponent = ({
  handlerFacebook,
  handlerGoogle,
}) => (
  <>
    <Col span={24} md={12}>
      <GoogleLogin
        clientId={SOCIAL_LIST.GOOGLE.APP_KEY}
        buttonText={<FormattedMessage id="auth.continueWithGoogle" />}
        onSuccess={handlerGoogle}
        className="auth-main-social-btn auth-main-social-btn--google-btn"
        cookiePolicy="single_host_origin"
        render={GoogleBtn}
      />
    </Col>
    <Col span={24} md={12}>
      <FacebookLogin
        appId={SOCIAL_LIST.FACEBOOK.APP_KEY}
        fields="name,email,picture"
        callback={handlerFacebook}
        textButton={<FormattedMessage id="auth.continueWithFacebook" />}
        cssClass="auth-main-social-btn"
        icon={<img className="mr-12" src="/images/Facebook.svg" alt="logo Facebook" />}
      />
    </Col>
  </>
);

AuthSocialComponent.propTypes = {
  handlerFacebook: PropTypes.func.isRequired,
  handlerGoogle: PropTypes.func.isRequired,
};

export default AuthSocialComponent;
