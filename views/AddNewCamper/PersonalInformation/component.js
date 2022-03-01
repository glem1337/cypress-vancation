import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import {
  Form, Row, Col, Button, Divider,
} from 'antd';
import PropTypes from 'prop-types';

import ROUTES from 'constants/routes';
import InputField from 'views/shared/InputField';
import PasswordInputField from 'views/shared/PasswordInputField';
import PhoneInputField from 'views/shared/PhoneInputField';
import ProgressBar from 'views/shared/ProgressBar';
import AuthSocial from 'views/shared/AuthSocial';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const PersonalInformation = ({
  isSubmitting,
  handleSubmit,
  isFormValid,
}) => (
  <>
    <div className="main-listing-container">
      <div className="mb-16 mb-md-24">
        <ProgressBar
          content={<FormattedMessage id="addNewCamper.ProgressBar" />}
          percent={0}
        />
      </div>
      <div className="d-md-flex align-items-flex-start mb-16">
        <div className="mb-16 mb-md-0">
          <h1 className="text-headline mb-8">
            <FormattedMessage id="shared.letsGetStarted" />
          </h1>
          <p>
            <FormattedMessage id="addNewCamper.personal.fillIn" />
          </p>
        </div>
        <div className="d-flex align-items-center ml-md-auto">
          <p className="mr-8">
            <FormattedMessage id="signUp.alreadyHaveAccount" />
          </p>
          <Link
            href={{
              pathname: ROUTES.LOGIN.PATH,
              query: { redirectRoute: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id') },
            }}
          >
            <Button type="secondary" size="small">
              <FormattedMessage id="shared.logIn" />
            </Button>
          </Link>
        </div>
      </div>
      <Row>
        <Col lg={16}>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col md={12}>
                <Field
                  name="firstName"
                  component={InputField}
                  label={{ id: 'signUp.firstName' }}
                  autoComplete="given-name"
                  placeholder="Cory"
                />
              </Col>
              <Col md={12}>
                <Field
                  name="lastName"
                  component={InputField}
                  label={{ id: 'signUp.lastName' }}
                  autoComplete="family-name"
                  placeholder="Hubbard"
                />
              </Col>
              <Col md={12}>
                <Field
                  name="email"
                  type="email"
                  component={InputField}
                  label={{ id: 'shared.email' }}
                  autoComplete="email"
                  placeholder={{ id: 'shared.emailPlaceholder' }}
                />
              </Col>
              <Col md={12}>
                <div className="d-flex align-items-center">
                  <Field
                    name="phoneNumber"
                    component={PhoneInputField}
                    label={{ id: 'signUp.phoneNumber' }}
                  />
                </div>
              </Col>
              <Col md={12}>
                <Field
                  name="password"
                  component={PasswordInputField}
                  label={{ id: 'shared.password' }}
                  autoComplete="new-password"
                  withPasswordStrength
                />
              </Col>
              <Col span={24}>
                <Divider
                  className="mt-0"
                  plain
                >
                  <FormattedMessage id="auth.or" />
                </Divider>
              </Col>
              <AuthSocial
                redirectRoute={createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id')}
              />
              <Col span={24}>
                <div className="mt-20 mb-20 text-align-left">
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
                      <a className="main-link" target="_blank" rel="noreferrer">
                        <FormattedMessage id="signUp.privacyPolicy" />
                      </a>
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
    <AddNewCamperBtnForm
      onSaveClick={handleSubmit}
      canSave={isFormValid && !isSubmitting}
      isSubmitting={isSubmitting}
      withBackBtn={false}
      showGradientButton={isFormValid}
    />
  </>
);

PersonalInformation.propTypes = {
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  isFormValid: PropTypes.bool,
};

PersonalInformation.defaultProps = {
  isSubmitting: false,
  handleSubmit: false,
  isFormValid: false,
};

export default PersonalInformation;
