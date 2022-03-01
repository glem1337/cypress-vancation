import React from 'react';
import {
  Button, Popover, Tooltip,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FILTERS } from 'constants/searchDestinations';

import { FILTER_NAMES } from '../hooks/useOpenedState';
import useSharedValues from '../hooks/useSharedValues';
import FilterPopoverFooter from '../FilterPopoverFooter';
import useMoreFilters from '../hooks/useMoreFilters';

const MoreFilters = (props) => {
  const { openedFilterName, toggleOpenedState } = props;

  const {
    clearFilters,
    applyFilters,
    isAnyFilterApplied,
    renderStandardAmenities,
    renderLuxuryAmenities,
    renderInsideHeight,
    renderRules,
    renderRating,
    countFilterApplied,
  } = useMoreFilters(props);

  const { getPopupContainer } = useSharedValues();

  const content = (
    <div className="search-page__filters-popover--more">
      <div className="search-page__filters-popover__main">
        <div className="search-page__filters-popover__grid search-page__filters-popover__grid--more">
          <div className="search-page__filters-popover__column">
            <div className="in-black font-600">
              <FormattedMessage id="shared.standardAmenities" />
            </div>
            {renderStandardAmenities()}
          </div>
          <div className="search-page__filters-popover__column">
            <div className="in-black font-600">
              <FormattedMessage id="shared.luxuryAmenities" />
            </div>
            {renderLuxuryAmenities()}
          </div>
          <div>
            <div className="in-black font-600 mb-24">
              <FormattedMessage id="shared.insideHeight" />
              <Tooltip title={<FormattedMessage {...FILTERS.INSIDE_HEIGHT_TOOLTIP} />}>
                <i className="icon icon-info-f main-tooltip-icon font-18" />
              </Tooltip>
            </div>
            {renderInsideHeight()}
          </div>
          <div className="search-page__filters-popover__column">
            <div className="in-black font-600">
              <FormattedMessage id="shared.rules" />
            </div>
            {renderRules()}
          </div>
          <div>
            <div className="in-black font-600 mb-24">
              <FormattedMessage id="shared.minimumRating" />
            </div>
            {renderRating()}
          </div>
        </div>
      </div>
      <FilterPopoverFooter
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </div>
  );

  return (
    <Popover
      visible={openedFilterName === FILTER_NAMES.MORE}
      content={content}
      trigger="click"
      placement="bottom"
      overlayClassName="ant-popover-filters ant-popover-filters--fluid"
      getPopupContainer={getPopupContainer}
    >
      <Button
        className={
          classnames(
            'ant-btn-outline-gray',
            'search-page__filters-btn',
            { 'search-page__filters-btn--active': isAnyFilterApplied },
          )
        }
        icon={<i className="icon icon-filter mr-8" />}
        onClick={toggleOpenedState(FILTER_NAMES.MORE)}
      >
        <FormattedMessage id="shared.moreFilters" />
        {countFilterApplied > 0 && (
          <span className="main-account-header__item-counter--blue">{countFilterApplied}</span>
        )}
      </Button>
    </Popover>
  );
};

MoreFilters.propTypes = {
  openedFilterName: PropTypes.string,
  toggleOpenedState: PropTypes.func.isRequired,
};

MoreFilters.defaultProps = {
  openedFilterName: null,
};

export default MoreFilters;
