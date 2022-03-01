import React from 'react';
import { Button, Popover, Skeleton } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import isPresent from 'utils/isPresent';

import { FILTER_NAMES } from '../hooks/useOpenedState';
import useSharedValues from '../hooks/useSharedValues';
import FilterPopoverFooter from '../FilterPopoverFooter';
import useVehicles from '../hooks/useVehicles';

const Vehicle = (props) => {
  const { openedFilterName, toggleOpenedState } = props;

  const {
    clearFilters,
    applyFilters,
    vehicleTypes,
    badge,
    renderVehiclesWidget,
  } = useVehicles(props);

  const { getPopupContainer } = useSharedValues();

  const content = isPresent(vehicleTypes)
  ? (
    <div className="search-page__filters-popover--vehicle">
      <div className="search-page__filters-popover__main">
        <div className="search-page__filters-popover__grid search-page__filters-popover__grid--vehicle">
          {renderVehiclesWidget()}
        </div>
      </div>
      <FilterPopoverFooter
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </div>
  )
    : <Skeleton active />;

  return (
    <Popover
      visible={openedFilterName === FILTER_NAMES.VEHICLE}
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
        icon={<i className="icon icon-camper mr-8" />}
        onClick={toggleOpenedState(FILTER_NAMES.VEHICLE)}
      >
        <FormattedMessage id="addNewCamper.camperDetails.form.vehicleType" />
        {badge > 0 && (
          <span className="main-account-header__item-counter--blue">{badge}</span>
        )}
      </Button>
    </Popover>
  );
};

Vehicle.propTypes = {
  openedFilterName: PropTypes.string,
  toggleOpenedState: PropTypes.func.isRequired,
};

Vehicle.defaultProps = {
  openedFilterName: null,
};

export default Vehicle;
