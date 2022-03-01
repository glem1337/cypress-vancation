import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import Link from 'next/link';
import HeaderUser from 'views/shared/UserHeader';
import { FormattedMessage } from 'react-intl';
import { SETTING_LAYOUT_ITEMS } from 'constants/settings';
import isRouteActive from 'utils/isRouteActive';

const SettingLayoutComponent = ({
  children,
  currentUser,
  active,
}) => (
  <>
    <HeaderUser active={active} currentUser={currentUser} />
    <div className="main-account-wrap" id="main-account-wrap">
      <div className="container">
        <Row>
          <Col lg={6}>
            <div className="main-account__tabs">
              {SETTING_LAYOUT_ITEMS.map(({ icon, contentId, key, path }) => (
                <Link key={key} href={path}>
                  <a>
                    <div className={classNames('main-account__tabs-item', { 'main-account__tabs-item--active': isRouteActive({ key, active }) })}>
                      <i className={`icon mr-8 font-20 icon-${icon}`} />
                      <FormattedMessage id={contentId} />
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </Col>
          <Col lg={18}>
            <div className="main-account__inner">
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </>
);

SettingLayoutComponent.defaultProps = {
  currentUser: null,
};

SettingLayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

export default SettingLayoutComponent;
