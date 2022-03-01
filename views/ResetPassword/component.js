import PropTypes from 'prop-types';
import Link from 'next/link';
import { Field } from 'formik';
import { Col, Form, Row } from 'antd';
import { FormattedMessage } from 'react-intl';

import InputField from 'views/shared/InputField/container';
import Alert from 'views/shared/Alert';
import GradientButton from 'views/shared/GradientButton';
import BackBtn from 'views/shared/BackBtn';
import Button from 'views/shared/Button';
import ROUTES from 'constants/routes';

const ResetPassword = ({ status, isFormValid, isSubmitting, handleSubmit }) => (
  <>
    <Row justify="center">
      <Col md={23} lg={12}>
        <div className="text-align-center">
          <h1 className="main-title">
            <FormattedMessage id="resetPassword.title" />
          </h1>
          <p className="mb-24 mb-md-40">
            <FormattedMessage id="resetPassword.description" />
          </p>
        </div>
      </Col>
    </Row>
    <Row justify="center">
      <Col md={14} lg={8}>
        {status && status.base && status.base.length && (
          <Alert
            type="error"
            message={status.base}
            showIcon
            icon={<i className="icon icon-info" />}
          />
        )}
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
                    text={{ id: 'resetPassword.btnSend' }}
                  />
                ) : (
                  <Button
                    size="large"
                    className="min-w-160"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={handleSubmit}
                    text={{ id: 'resetPassword.btnSend' }}
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

ResetPassword.defaultProps = {
  status: undefined,
};

ResetPassword.propTypes = {
  status: PropTypes.shape({
    base: PropTypes.string,
  }),
  isFormValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ResetPassword;
