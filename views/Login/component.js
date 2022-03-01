import PropTypes from 'prop-types';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import {
  Button, Form, Row, Col, Divider, Alert,
} from 'antd';
import Link from 'next/link';

import { LOGIN_NOTIFICATIONS_CONTEXT } from 'state/notifications/notificationsContexts';
import ROUTES from 'constants/routes';

import NotificationsDock from 'views/NotificationsDock';
import InputField from 'views/shared/InputField';
import GradientButton from 'views/shared/GradientButton';
import Logo from 'views/shared/Logo';
import PasswordInputField from 'views/shared/PasswordInputField';
import AuthSocial from '../shared/AuthSocial';

const LoginComponent = ({
  isFormValid,
  isSubmitting,
  handleSubmit,
  status,
  redirectRoute,
}) => (
  <Row data-testid="auth" justify="center">
    <Col span={24} md={22} lg={24}>
      <div className="auth-main__header">
        <Logo
          bigLogoClassName="d-lg-none"
          isLink
        />
        <p className="mr-8 ml-auto">
          <FormattedMessage id="login.dontHaveAnAccountYet" />
        </p>
        <Link href="/sign_up">
          <Button type="secondary" size="small">
            <FormattedMessage id="shared.signUp" />
          </Button>
        </Link>
      </div>
    </Col>
    <Col span={24} md={22} lg={16}>
      <div>
        <h1 className="main-title">
          <FormattedMessage id="login.welcomeBack" />
        </h1>
        <p className="mb-24 mb-md-40">
          <FormattedMessage id="login.itsTimeForAnotherRoadTrip" />
        </p>
        {
          status && status.base && status.base.length && (
            <Alert
              type="error"
              message={status.base}
              showIcon
              icon={<i className="icon icon-info" />}
            />
          )
        }
        <NotificationsDock context={LOGIN_NOTIFICATIONS_CONTEXT} />
        <Form layout="vertical">
          <Row gutter={24}>
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
              <Field
                name="password"
                component={PasswordInputField}
                label={{ id: 'shared.password' }}
                autoComplete="current-password"
                additionalLabelContent={(
                  <Link href={ROUTES.RESET_PASSWORD.PATH}>
                    <a className="main-input__label-forgot-pass">
                      <FormattedMessage id="login.forgotPassword" />
                    </a>
                  </Link>
                )}
              />
            </Col>
            <Col span={24}>
              <div className="auth-main__btn-wrap">
                { isFormValid ? (
                  <GradientButton
                    size="large"
                    className="min-w-180 main-btn--sm-100"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    text={{ id: 'shared.logIn' }}
                  />
                ) : (
                  <Button
                    size="large"
                    className="min-w-180 main-btn--sm-100"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    <FormattedMessage id="shared.logIn" />
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
            <AuthSocial redirectRoute={redirectRoute} />
          </Row>
        </div>
      </div>
    </Col>
  </Row>
);

LoginComponent.defaultProps = {
  status: undefined,
};

LoginComponent.propTypes = {
  isFormValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  status: PropTypes.shape({
    base: PropTypes.string,
  }),
  redirectRoute: PropTypes.string,
};

LoginComponent.defaultProps = {
  redirectRoute: null,
};

export default LoginComponent;
