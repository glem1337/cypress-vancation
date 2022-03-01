/* eslint-disable react/prop-types */
import { Button } from 'antd';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';

const Footer = ({ detailsToggle, showBackBtn, continueBtnText }) => (
  <footer className="checkout__footer">
    <div className="checkout__footer-top">
      <div className="container">
        <div className="d-flex align-items-center justify-content-space-between">
          <span className="text-title">Est. Total: $1,662.30</span>
          <Button className="ant-btn-main-link" onClick={detailsToggle}>
            View details
          </Button>
        </div>
      </div>
    </div>
    <div className="checkout__footer-bottom">
      <div className="container">
        <div className="d-flex align-items-center">
          {showBackBtn && (
            <Button
              className="ant-btn-link ant-btn-flat pl-0 pr-0"
              icon={<i className="icon icon-left-edge" />}
            >
              Back
            </Button>
          )}
          {/* Change to Button when form is unfilled */}
          <MainBtnGradient
            text={continueBtnText}
            size="large"
            className="min-w-140 ml-auto"
          />
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
