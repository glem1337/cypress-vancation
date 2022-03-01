import React from 'react';
import { Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FILTER_NAMES } from '../hooks/useOpenedState';
import useSharedValues from '../hooks/useSharedValues';
import useDelivery from '../hooks/useDelivery';
import FilterPopoverFooter from '../FilterPopoverFooter';

const Delivery = (props) => {
  const { openedFilterName, toggleOpenedState } = props;

  const {
    clearFilters,
    applyFilters,
    isFilterApplied,
    renderDeliveryWidget,
  } = useDelivery(props);

  const { getPopupContainer } = useSharedValues();

  const content = (
    <div className="search-page__filters-popover--delivery">
      <div className="search-page__filters-popover__main">
        {renderDeliveryWidget()}
      </div>
      <FilterPopoverFooter
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </div>
  );

  return (
    <Popover
      visible={openedFilterName === FILTER_NAMES.DELIVERY}
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
            { 'search-page__filters-btn--active': isFilterApplied },
          )
        }
        icon={<i className="icon icon-delivery mr-8" />}
        onClick={toggleOpenedState(FILTER_NAMES.DELIVERY)}
      >
        <FormattedMessage id="shared.delivery" />
        {isFilterApplied && (
          <span className="main-account-header__item-counter--blue">1</span>
        )}
      </Button>
    </Popover>
  );
};

Delivery.propTypes = {
  openedFilterName: PropTypes.string,
  toggleOpenedState: PropTypes.func.isRequired,
};

Delivery.defaultProps = {
  openedFilterName: null,
};

export default Delivery;
