import classNames from 'classnames';
import { Space } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { APP_PHONE } from 'constants';

import useContainer from 'views/Checkout/Header/hook';

const Header = ({ currentStep }) => {
  const steps = useContainer();

  return (
    <header className="checkout__header">
      <div className="container checkout__header-container">
        <div className="d-flex align-items-center">
          <img src="/images/logo/logo-circle.svg" alt="" />
          <div className="ml-16">
            <div className="text-title">
              <FormattedMessage id="shared.secureCheckout" />
            </div>
            <div className="d-lg-none in-black">
              <span className="font-700">
                <FormattedMessage
                  id="shared.stepRange"
                  values={{
                    start: currentStep + 1,
                    end: steps.length,
                  }}
                />
                {' - '}
              </span>
              <FormattedMessage {...steps[currentStep]} />
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block">
          <Space direction="horizontal" size={32}>
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={classNames(
                  'checkout__header-item',
                  currentStep < idx && 'checkout__header-item--inactive',
                  currentStep > idx && 'checkout__header-item--passed',
                )}
              >
                <div className="checkout__header-item-numb">
                  {currentStep > idx ? (
                    <i className="icon icon-checked" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <FormattedMessage {...step} />
              </div>
            ))}
          </Space>
        </div>
        <div className="checkout__header-support">
          <div className="main-listing-support-icon">
            <i className="icon icon-question-f in-blue-1000 font-20" />
          </div>
          <div>
            <p className="text-caption mb-4">
              <FormattedMessage id="addNewCamper.HelperTitle" />
            </p>
            <a href={`tel:${APP_PHONE}`} className="font-600 in-black">
              {APP_PHONE}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default Header;
