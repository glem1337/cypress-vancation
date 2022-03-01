import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ROUTES from 'constants/routes';
import { DASHBOARD_TABS } from 'constants/dashboard';

import isPresent from 'utils/isPresent';

const Tabs = ({
  activeKey,
  hideItem,
  camperId,
}) => (
  <div className="main-account-header__bottom">
    <div className="container">
      <ul className="d-flex">
        {Object.keys(DASHBOARD_TABS)
          .map(key => {
          const item = DASHBOARD_TABS[key];

          const href = {
            pathname: item.route,
          };

            if (
              isPresent(camperId)
              || item.route
                === ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.PATH
            ) {
              href.query = { camper: camperId };
            }

          return (
            <Link key={key} href={href}>
              <li
                className={classnames('main-account-header__item', {
                active: key === activeKey,
                'd-none': key === hideItem,
              })}
              >
                <span className="main-account-header__item-txt">
                  <FormattedMessage id={item.id} />
                </span>
                {item.count && (
                <span className="main-account-header__item-counter">{item.count}</span>
              )}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  </div>
);

Tabs.defaultProps = {
  camperId: null,
};

Tabs.propTypes = {
  activeKey: PropTypes.string.isRequired,
  hideItem: PropTypes.string.isRequired,
  camperId: PropTypes.string,
};

export default Tabs;
