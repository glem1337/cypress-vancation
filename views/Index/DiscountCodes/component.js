import { FormattedMessage } from 'react-intl';
import { Col, Input, Row } from 'antd';
import Link from 'next/link';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import BtnGradient from 'views/shared/BtnGradient';
import InputField from 'views/shared/InputField/container';

const DiscountCodes = ({
  handleSubmit,
  isLoading,
}) => (
  <div className="home-discount-code-wrap">
    <div className="container">
      <h2 className="home-title-sec">
        <FormattedMessage id="homePage.discountCodes.title" />
      </h2>
      <div className="mb-20">
        <Row justify="center">
          <Col xl={12}>
            <Input.Group>
              <Row>
                <Col span={17} md={19} xl={17}>
                  <Field
                    className="main-input-group--left"
                    name="email"
                    type="email"
                    component={InputField}
                    autoComplete="email"
                    placeholder={{ id: 'shared.emailPlaceholder' }}
                  />
                </Col>
                <Col span={7} md={5} xl={7}>
                  <BtnGradient
                    onClick={handleSubmit}
                    className="w-100 main-input-group--right pl-0 pr-0"
                    size="large"
                    text={<FormattedMessage id="shared.getStarted" />}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </Col>
              </Row>
            </Input.Group>
          </Col>
        </Row>
      </div>
      <Row justify="center">
        <Col xl={14}>
          <p className="home-discount-code__txt">
            <FormattedMessage id="homePage.discountCodes.footer" />
            {' '}
            <Link href="/privacy-policy">
              <a>
                <FormattedMessage id="shared.privacyPolicy" />
              </a>
            </Link>
          </p>
        </Col>
      </Row>
    </div>
  </div>
);

DiscountCodes.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DiscountCodes;
