import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import BtnGradient from 'views/shared/BtnGradient';

const Footer = ({ showBackBtn, btnText, price, onBack }) => (
  <footer className="checkout__footer">
    <div className="checkout__footer-top">
      <div className="container">
        <div className="d-flex align-items-center justify-content-space-between">
          <span className="text-title">
            <FormattedMessage id="shared.estTotal" />
            {`: $${price}`}
          </span>
          <Button className="ant-btn-main-link">
            <FormattedMessage id="shared.viewDetails" />
          </Button>
        </div>
      </div>
    </div>
    <div className="checkout__footer-bottom">
      <div className="container">
        <div className="d-flex align-items-center">
          {showBackBtn && (
            <Button
              onClick={onBack}
              className="ant-btn-link ant-btn-flat pl-0 pr-0"
              icon={<i className="icon icon-left-edge" />}
            >
              <FormattedMessage id="shared.back" />
            </Button>
          )}
          {/* Change to Button when form is unfilled */}
          <BtnGradient
            text={btnText}
            size="large"
            className="min-w-140 ml-auto"
          />
        </div>
      </div>
    </div>
  </footer>
);

Footer.defaultProps = {
  onBack: undefined,
};

Footer.propTypes = {
  btnText: PropTypes.shape().isRequired,
  price: PropTypes.number.isRequired,
  showBackBtn: PropTypes.bool.isRequired,
  onBack: PropTypes.func,
};

export default Footer;
