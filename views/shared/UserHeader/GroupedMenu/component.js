import React from 'react';
import { Dropdown } from 'antd';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import MenuContent from './MenuContent';
import useContainer from './hook';

const GroupedMenu = ({ showOwnersDashboard }) => {
  const isUserLoggedIn = useContainer();

  return (
    <div
      id="main-account-header__grouped-menu"
      className="main-account-header__grouped-menu"
    >
      <Dropdown
        overlay={(
          <MenuContent
            isUserLoggedIn={isUserLoggedIn}
            showOwnersDashboard={showOwnersDashboard}
          />
        )}
        placement="bottomRight"
        getPopupContainer={() => document.getElementById('main-account-header__grouped-menu')}
        overlayClassName="main-account-header__grouped-overlay"
      >
        <div>
          <span className="main-account-header__item-txt">
            <FormattedMessage id="shared.groupedMenu" />
          </span>
          <i className="icon icon-down in-black font-16" />
        </div>
      </Dropdown>
    </div>
  );
};

GroupedMenu.propTypes = {
  showOwnersDashboard: PropTypes.bool.isRequired,
};

export default GroupedMenu;
