import React from 'react';
import { Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import useQuests from '../hooks/useQuests';
import { FILTER_NAMES } from '../hooks/useOpenedState';
import useSharedValues from '../hooks/useSharedValues';
import FilterPopoverFooter from '../FilterPopoverFooter';

const Guests = (props) => {
  const { openedFilterName, toggleOpenedState } = props;

  const {
    badge,
    clearFilters,
    applyFilters,
    renderQuestsWidget,
  } = useQuests(props);

  const { getPopupContainer } = useSharedValues();

  const content = (
    <div className="search-page__filters-popover--guests">
      <div className="search-page__filters-popover__main">
        {renderQuestsWidget()}
      </div>
      <FilterPopoverFooter
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </div>
  );

  return (
    <Popover
      visible={openedFilterName === FILTER_NAMES.GUESTS}
      content={content}
      trigger="click"
      placement="bottomLeft"
      overlayClassName="ant-popover-filters"
      getPopupContainer={getPopupContainer}
    >
      <Button
        className={
          classnames(
            'ant-btn-outline-gray',
            'search-page__filters-btn',
            { 'search-page__filters-btn--active': badge > 0 },
          )
        }
        icon={<i className="icon icon-group mr-8" />}
        onClick={toggleOpenedState(FILTER_NAMES.GUESTS)}
      >
        <FormattedMessage id="shared.guests" />
        {badge > 0 && (
          <span className="main-account-header__item-counter--blue">{badge}</span>
        )}
      </Button>
    </Popover>
  );
};

Guests.propTypes = {
  openedFilterName: PropTypes.string,
  toggleOpenedState: PropTypes.func.isRequired,
};

Guests.defaultProps = {
  openedFilterName: null,
};

export default Guests;
