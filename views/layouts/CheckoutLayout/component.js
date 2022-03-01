import classNames from 'classnames';
import { Row, Col, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import BtnGradient from 'views/shared/BtnGradient';
import Footer from './Footer';

import useContainer from './hook';

const CheckoutLayout = ({
  currentStep,
  price,
  showBackBtn,
  btnText,
  children,
  onBack,
  header,
}) => {
  useContainer(currentStep);

  return (
    <Form layout="vertical">
      <div className="checkout__wrap">
        {header}
        <main className="checkout__main">
          <div className="container">
            <Row gutter={24}>
              <Col lg={16}>
                <div className="checkout__form">
                  {children}
                  <div className="d-none d-lg-flex align-items-center justify-content-space-between mt-48">
                    {showBackBtn && (
                      <Button
                        onClick={onBack}
                        className="ant-btn-link ant-btn-flat pl-0 pr-0"
                        icon={<i className="icon icon-left-edge" />}
                      >
                        <FormattedMessage id="shared.back" />
                      </Button>
                    )}
                    <BtnGradient
                      text={btnText}
                      size="large"
                      className={classNames('min-w-140', {
                        'ml-auto': !showBackBtn,
                      })}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </main>
        <Footer
          price={price}
          showBackBtn={showBackBtn}
          btnText={btnText}
          onBack={onBack}
        />
      </div>
    </Form>
  );
};

CheckoutLayout.defaultProps = {
  showBackBtn: false,
  onBack: undefined,
};

CheckoutLayout.propTypes = {
  currentStep: PropTypes.number.isRequired,
  btnText: PropTypes.shape().isRequired,
  price: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  showBackBtn: PropTypes.bool,
  onBack: PropTypes.func,
};

export default CheckoutLayout;
