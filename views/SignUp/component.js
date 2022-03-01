import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import ROUTES from 'constants/routes';
import InputField from 'views/shared/InputField';
import Logo from 'views/shared/Logo';
import PasswordInputField from 'views/shared/PasswordInputField';
import PhoneInputField from 'views/shared/PhoneInputField';
import {
  Form, Row, Col, Button, Divider,
} from 'antd';
import GradientButton from 'views/shared/GradientButton';
import AuthSocial from '../shared/AuthSocial';

const SignUpComponent = ({
  isFormValid,
  isSubmitting,
  handleSubmit,
}) => (
  <div className="auth-main__container">
    <Row justify="center">
      <Col span={24} md={23} lg={24}>
        <div className="auth-main__header">
          <Logo
            bigLogoClassName="d-lg-none"
            isLink
          />
          <p className="mr-8 ml-auto">
            <FormattedMessage id="signUp.alreadyHaveAccount" />
          </p>
          <Link href="/log_in">
            <Button type="secondary" size="small">
              <FormattedMessage id="shared.logIn" />
            </Button>
          </Link>
        </div>
      </Col>
      <Col span={24} md={23} lg={16}>
        <div>
          <h1 className="main-title">
            <FormattedMessage id="shared.signUp" />
          </h1>
          <p className="mb-24 mb-md-40">
            <FormattedMessage id="signUp.searchDiscoverBookCampervans" />
          </p>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={24} md={12}>
                <Field
                  name="firstName"
                  component={InputField}
                  label={{ id: 'signUp.firstName' }}
                  autoComplete="given-name"
                  placeholder="Cory"
                />
              </Col>
              <Col span={24} md={12}>
                <Field
                  name="lastName"
                  component={InputField}
                  label={{ id: 'signUp.lastName' }}
                  autoComplete="family-name"
                  placeholder="Hubbard"
                />
              </Col>
              <Col span={24}>
                <Field
                  name="email"
                  type="email"
                  component={InputField}
                  label={{ id: 'shared.email' }}
                  autoComplete="email"
                  placeholder={{ id: 'shared.emailPlaceholder' }}
                />
              </Col>
              <Col span={24}>
                <div className="d-flex align-items-center">
                  <Field
                    name="phoneNumber"
                    component={PhoneInputField}
                    label={{ id: 'signUp.phoneNumber' }}
                  />
                </div>
              </Col>
              <Col span={24}>
                <Field
                  name="password"
                  component={PasswordInputField}
                  label={{ id: 'shared.password' }}
                  autoComplete="new-password"
                  withPasswordStrength
                />
              </Col>
              <Col span={24}>
                <div className="auth-main__btn-wrap">
                  { isFormValid ? (
                    <GradientButton
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      onClick={handleSubmit}
                      size="large"
                      className="min-w-180 main-btn--sm-100"
                      text={{ id: 'signUp.createAccount' }}
                    />
                  ) : (
                    <Button
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      onClick={handleSubmit}
                      size="large"
                      className="min-w-180 main-btn--sm-100"
                    >
                      <FormattedMessage id="signUp.createAccount" />
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
          <div className="mb-24">
            <Row gutter={24}>
              <Col span={24}>
                <Divider
                  className="mt-0"
                  plain
                >
                  <FormattedMessage id="auth.or" />
                </Divider>
              </Col>
              <AuthSocial />
            </Row>
          </div>
        </div>
      </Col>
    </Row>
    <div className="mt-auto text-align-center">
      <p>
        <FormattedMessage id="signUp.bySigningUpAgree" />
        {' '}
        <Link href={ROUTES.TERMS_OF_SERVICE.PATH}>
          <a target="_blank" className="main-link" rel="noreferrer">
            <FormattedMessage id="signUp.vancationTermsOfService" />
          </a>
        </Link>
        {' '}
        <FormattedMessage id="signUp.and" />
        {' '}
        <Link href={ROUTES.PRIVACY_POLICY.PATH}>
          <a target="_blank" className="main-link" rel="noreferrer">
            <FormattedMessage id="signUp.privacyPolicy" />
          </a>
        </Link>
      </p>
    </div>
  </div>
);

SignUpComponent.propTypes = {
  isFormValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SignUpComponent;
