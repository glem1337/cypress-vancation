import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as R from 'ramda';
import {
  Button, Tooltip, Input,
 } from 'antd';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';

import { FILTERS } from 'constants/searchDestinations';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { setFilterBatchValue, setFilterValue } from 'state/concepts/search-destinations/actions';

export const DECREASE_INCREASE_ACTIONS = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
};

function useContainer(props) {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  /**
   * State
   */
  const [filters, setFilters] = useState({
    sleeps: persistedFilters.sleeps || 0,
    seats: persistedFilters.seats || 0,
  });

  /**
   * Persisted handlers.
   */
  const handlers = useRef({
    /**
     * Immediately Apply filters.
     */
    applyFiltersImmediately: debounce(({ name, value }) => {
      const formatted = value === 0
        ? null
        : value;

      dispatch(setFilterValue({
        name,
        value: formatted,
      }));
    }, FILTERS.DEBOUNCE_TIME),
  });

  /**
   * On increase or decrease.
   */
  const onIncreaseDecrease = (filterName, action) => () => {
    const existingValue = filters[filterName];

    const MIN = 0;
    const MAX = 20;

    const actionFunc = action === DECREASE_INCREASE_ACTIONS.INCREASE
      ? R.inc
      : R.dec;

    const newValue = R.compose(
      R.min(MAX),
      R.max(MIN),
      actionFunc,
    )(existingValue);

    if (newValue === existingValue) {
      return false;
    }

    setFilters(prev => ({
      ...prev,
      [filterName]: newValue,
    }));

    if (props.immediatelyApply) {
      handlers.current.applyFiltersImmediately({
        name: filterName,
        value: newValue,
      });
    }

    return true;
  };

  /**
   * Clear filters.
   */
  const clearFilters = () => {
    dispatch(setFilterBatchValue([
      {
        name: 'sleeps',
        value: null,
      },
      {
        name: 'seats',
        value: null,
      },
    ]));

    props.toggleOpenedState(null)();
  };

  /**
   * Apply filters.
   */
  const applyFilters = () => {
    dispatch(setFilterBatchValue([
      {
        name: 'sleeps',
        value: filters.sleeps,
      },
      {
        name: 'seats',
        value: filters.seats,
      },
    ]));

    props.toggleOpenedState(null)();

    return filters;
  };

  /**
   * Get badge.
   */
  const getBadge = () => {
    let badge = 0;

    if (persistedFilters.seats > 0) {
      badge += 1;
    }

    if (persistedFilters.sleeps > 0) {
      badge += 1;
    }

    return badge;
  };

  /**
   * Render quests widget
   */
  const renderQuestsWidget = () => (
    <>
      {Object.values(FILTERS.GUESTS).map((item, index) => {
        const className = index === 0
          ? 'd-flex justify-content-space-between mb-24'
          : 'd-flex justify-content-space-between';

        return (
          <div className={className} key={item.name}>
            <div className="d-flex align-items-center">
              <i className="icon icon-bed in-gray-500" />
              <span className="font-600 in-black ml-16">
                <FormattedMessage {...item.title} />
              </span>
              <Tooltip title={<FormattedMessage {...item.tooltip} />}>
                <i className="icon icon-info-f main-tooltip-icon font-18" />
              </Tooltip>
            </div>
            <div className="main-input-numeric">
              <Input
                type="number"
                className="mb-0"
                readOnly
                value={filters[item.name]}
              />
              <Button
                shape="circle"
                type="secondary"
                className="main-input-numeric__control main-input-numeric__control--minus"
                icon={<i className="icon icon-minus font-20" />}
                onClick={onIncreaseDecrease(item.name, DECREASE_INCREASE_ACTIONS.DECREASE)}
              />
              <Button
                shape="circle"
                type="secondary"
                className="main-input-numeric__control main-input-numeric__control--plus"
                icon={<i className="icon icon-plus font-20" />}
                onClick={onIncreaseDecrease(item.name, DECREASE_INCREASE_ACTIONS.INCREASE)}
              />
            </div>
          </div>
        );
      })}
    </>
  );

  /**
   * Check filter updates
   */
  const checkFilterUpdates = () => {
    if (!persistedFilters.uuid) {
      return false;
    }

    setFilters({
      sleeps: persistedFilters.sleeps || 0,
      seats: persistedFilters.seats || 0,
    });

    return true;
  };

  /**
   * Updating
   */
  useEffect(() => {
    checkFilterUpdates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedFilters.uuid]);

  /**
   * Updating
   */
  useEffect(() => {
    checkFilterUpdates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openedFilterName]);

  return {
    filters,
    badge: getBadge(),
    onIncreaseDecrease,
    clearFilters,
    applyFilters,
    renderQuestsWidget,
    checkFilterUpdates,
  };
}

export default useContainer;
