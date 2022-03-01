import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Field } from 'formik';
import { Col, Form, Row } from 'antd';

import { FormattedMessage } from 'react-intl';
import PasswordInputField from 'views/shared/PasswordInputField/container';
import Alert from 'views/shared/Alert';
import GradientButton from 'views/shared/GradientButton';
import BackBtn from 'views/shared/BackBtn';
import Button from 'views/shared/Button';
import ROUTES from 'constants/routes';

const CreateNewPassword = ({
  status,
  isFormValid,
  isSubmitting,
  handleSubmit,
}) => (
  <>
    <Row justify="center">
      <Col md={23} lg={12}>
        <div className="text-align-center">
          <h1 className="main-title">
            <FormattedMessage id="createNewPassword.title" />
          </h1>
          <p className="mb-24 mb-md-40">
            <FormattedMessage id="createNewPassword.description" />
          </p>
        </div>
      </Col>
    </Row>
    <Row justify="center">
      <Col md={14} lg={8}>
        {status && status.emailToken && status.emailToken.length && (
          <Alert
            type="error"
            message={status.emailToken}
            showIcon
            icon={<i className="icon icon-info" />}
          />
        )}
        <Form layout="vertical">
          <Row gutter={24}>
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
              <div className="d-flex align-items-center justify-content-space-between">
                <Link href={ROUTES.LOGIN.PATH}>
                  <a>
                    <BackBtn
                      text={<FormattedMessage id="shared.backToLogin" />}
                    />
                  </a>
                </Link>
                {isFormValid ? (
                  <GradientButton
                    size="large"
                    className="min-w-160"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    text={{ id: 'shared.submit' }}
                  />
                ) : (
                  <Button
                    size="large"
                    className="min-w-160"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    text={{ id: 'shared.submit' }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </>
);

CreateNewPassword.defaultProps = {
  status: undefined,
};

CreateNewPassword.propTypes = {
  status: PropTypes.shape({
    emailToken: PropTypes.string,
  }),
  isFormValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CreateNewPassword;
