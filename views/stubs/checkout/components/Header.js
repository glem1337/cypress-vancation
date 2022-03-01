/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { Space } from 'antd';

const Header = ({ currentStep }) => {
  const steps = [
    'Personal Information',
    'Trip Info & Extras',
    'Protection Plan',
    'Payment',
  ];

  return (
    <header className="checkout__header">
      <div className="container checkout__header-container">
        <div className="d-flex align-items-center">
          <img src="/images/logo/logo-circle.svg" alt="" />
          <div className="ml-16">
            <div className="text-title">Secure Checkout</div>
            <div className="d-lg-none in-black">
              <span className="font-700">
                Step
                {' '}
                {currentStep}
              </span>
              {' '}
              of
              {' '}
              {steps.length}
              {' '}
              -
              {' '}
              {steps[currentStep - 1]}
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block">
          <Space direction="horizontal" size={32}>
            {steps.map((step, i) => (
              <div
                className={classNames(
                  'checkout__header-item',
                  currentStep < i + 1 && 'checkout__header-item--inactive',
                  currentStep > i + 1 && 'checkout__header-item--passed',
                )}
              >
                <div className="checkout__header-item-numb">
                  {currentStep > i + 1 ? (
                    <i className="icon icon-checked" />
                  ) : (
                    i + 1
                  )}
                </div>
                {step}
              </div>
            ))}
          </Space>
        </div>
        <div className="checkout__header-support">
          <div className="main-listing-support-icon">
            <i className="icon icon-question-f in-blue-1000 font-20" />
          </div>
          <div>
            <p className="text-caption mb-4">Need help? Contact support</p>
            <a href="tel:+17667326732" className="font-600 in-black">
              +1 766-732-6732
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
