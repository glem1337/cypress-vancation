import React from 'react';
import {
 Button, Popover,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { FILTER_NAMES } from '../hooks/useOpenedState';
import useSharedValues from '../hooks/useSharedValues';
import FilterPopoverFooter from '../FilterPopoverFooter';
import usePrice from '../hooks/usePrice';

const Price = (props) => {
  const { openedFilterName, toggleOpenedState } = props;

  const {
    clearFilters,
    applyFilters,
    priceString,
    renderPriceWidget,
  } = usePrice(props);

  const {
    getPopupContainer,
  } = useSharedValues();

  const content = (
    <div className="search-page__filters-popover--price">
      <div className="search-page__filters-popover__main">
        {renderPriceWidget()}
      </div>
      <FilterPopoverFooter
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </div>
  );

  return (
    <Popover
      visible={openedFilterName === FILTER_NAMES.PRICE}
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
            { 'search-page__filters-btn--active': priceString !== null },
          )
        }
        icon={<i className="icon icon-price mr-8" />}
        onClick={toggleOpenedState(FILTER_NAMES.PRICE)}
      >
        {priceString === null && <FormattedMessage id="shared.price" />}
        {priceString !== null && <span className="ml-0">{priceString}</span>}
      </Button>
    </Popover>
  );
};

Price.propTypes = {
  openedFilterName: PropTypes.string,
  toggleOpenedState: PropTypes.func.isRequired,
};

Price.defaultProps = {
  openedFilterName: null,
};

export default Price;
