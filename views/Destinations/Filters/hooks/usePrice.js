import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as R from 'ramda';
import { Input, Slider } from 'antd';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';

import { FILTERS } from 'constants/searchDestinations';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { setFilterBatchValue } from 'state/concepts/search-destinations/actions';

import useSharedValues from './useSharedValues';

const REGEX = /[^0-9]+/g;

function useContainer(props) {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  // Shared values.
  const { tipFormatter } = useSharedValues();

  /**
   * Prepare initial value.
   */
  const prepareInitialValue = (filterName) => {
    const filter = R.path([filterName], persistedFilters);

    if (R.isNil(filter) && filterName === 'priceStart') {
      return `$${FILTERS.PRICE_BOUNDARIES.MIN}`;
    }

    if (!R.isNil(filter) && filterName === 'priceStart' && filter >= FILTERS.PRICE_BOUNDARIES.MAX) {
      return `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    if (R.isNil(filter) && filterName === 'priceEnd') {
      return `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    if (!R.isNil(filter) && filterName === 'priceEnd' && filter >= FILTERS.PRICE_BOUNDARIES.MAX) {
      return `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    return `$${filter}`;
  };

  /**
   * Use state.
   */
  const [filters, setFilters] = useState({
    priceStart: prepareInitialValue('priceStart'),
    priceEnd: prepareInitialValue('priceEnd'),
  });

  /**
   * Clear filters.
   */
  const clearFilters = () => {
    dispatch(setFilterBatchValue([
      {
        name: 'priceStart',
        value: null,
      },
      {
        name: 'priceEnd',
        value: null,
      },
    ]));

    if (props.toggleOpenedState) {
      props.toggleOpenedState(null)();
    }
  };

  /**
   * Apply filters.
   */
  const applyFilters = (params = {}) => {
    // Prepare start price
    let priceStart = (params.priceStart || filters.priceStart).replace(REGEX, '');
    priceStart = parseInt(priceStart, 10);

    // Prepare end price
    let priceEnd = (params.priceEnd || filters.priceEnd).replace(REGEX, '');
    priceEnd = parseInt(priceEnd, 10);

    if (priceStart === FILTERS.PRICE_BOUNDARIES.MIN && priceEnd === FILTERS.PRICE_BOUNDARIES.MAX) {
      priceStart = null;
      priceEnd = null;
    }

    dispatch(setFilterBatchValue([
      {
        name: 'priceStart',
        value: priceStart,
      },
      {
        name: 'priceEnd',
        value: priceEnd,
      },
    ]));

    if (props.toggleOpenedState) {
      props.toggleOpenedState(null)();
    }

    return {
      priceStart,
      priceEnd,
    };
  };

  /**
   * Persisted handlers.
   */
  const handlers = useRef({
    /**
     * Immediately Apply filters.
     */
    applyFiltersImmediately: debounce(applyFilters, FILTERS.DEBOUNCE_TIME),
  });

  /**
   * Set range value
   */
  const onChangePriceBySlider = (range) => {
    let priceStart = R.head(range);
    let priceEnd = R.last(range);

    if (priceStart >= FILTERS.PRICE_BOUNDARIES.MAX) {
      priceStart = `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    } else {
      priceStart = `$${priceStart}`;
    }

    if (priceEnd >= FILTERS.PRICE_BOUNDARIES.MAX) {
      priceEnd = `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    } else {
      priceEnd = `$${priceEnd}`;
    }

    setFilters({
      priceStart,
      priceEnd,
    });

    if (props.immediatelyApply) {
      handlers.current.applyFiltersImmediately({
        priceStart,
        priceEnd,
      });
    }

    return {
      priceStart,
      priceEnd,
    };
  };

  /**
   * On change price
   */
  const onChangePrice = (filterName) => ({ target: { value } }) => {
    let formatted = value;

    formatted = value.replace(REGEX, '');

    if (parseInt(formatted, 10) > FILTERS.PRICE_BOUNDARIES.MAX) {
      formatted = `${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    setFilters(prev => ({
      ...prev,
      [filterName]: `$${formatted}`,
    }));

    if (props.immediatelyApply) {
      handlers.current.applyFiltersImmediately({
        ...filters,
        [filterName]: formatted,
      });
    }
  };

  /**
   * Normalize value.
   */
  const rangeValue = () => {
    const { priceStart, priceEnd } = filters;

    let start = priceStart.replace(REGEX, '');
    start = parseInt(start, 10);

    let end = priceEnd.replace(REGEX, '');
    end = parseInt(end, 10);

    if (Number.isNaN(start)) {
      start = 0;
    }

    if (Number.isNaN(end)) {
      end = 0;
    }

    if (start > FILTERS.PRICE_BOUNDARIES.MAX) {
      start = FILTERS.PRICE_BOUNDARIES.MAX;
    }

    if (end > FILTERS.PRICE_BOUNDARIES.MAX) {
      end = FILTERS.PRICE_BOUNDARIES.MAX;
    }

    return [start, end];
  };

  /**
   * On blur handler
   */
  const onBlurHandler = (filterName) => () => {
    let filter = R.prop(filterName, filters);

    filter = filter.replace(REGEX, '');

    filter = parseInt(filter, 10);

    if (filterName === 'priceStart' && Number.isNaN(filter)) {
      filter = `$${FILTERS.PRICE_BOUNDARIES.MIN}`;
    }

    if (filterName === 'priceEnd' && Number.isNaN(filter)) {
      filter = `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    if (filter >= FILTERS.PRICE_BOUNDARIES.MAX) {
      filter = `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    const value = typeof filter === 'number'
      ? `$${filter}`
      : filter;

    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));

    return true;
  };

  /**
   * Is filter applied.
   */
  const getPriceString = () => {
    if (R.isNil(persistedFilters.priceStart) && R.isNil(persistedFilters.priceEnd)) {
      return null;
    }

    if (
      persistedFilters.priceStart === FILTERS.PRICE_BOUNDARIES.MIN
      && persistedFilters.priceEnd === FILTERS.PRICE_BOUNDARIES.MIN
    ) {
      return null;
    }

    if (
      persistedFilters.priceStart === FILTERS.PRICE_BOUNDARIES.MIN
      && persistedFilters.priceEnd === FILTERS.PRICE_BOUNDARIES.MAX
    ) {
      return null;
    }

    if (
      persistedFilters.priceStart >= FILTERS.PRICE_BOUNDARIES.MAX
      && persistedFilters.priceEnd >= FILTERS.PRICE_BOUNDARIES.MAX
    ) {
      return `$${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    let priceStart = R.prop('priceStart', persistedFilters);
    let priceEnd = R.prop('priceEnd', persistedFilters);

    if (priceStart >= FILTERS.PRICE_BOUNDARIES.MAX) {
      priceStart = `${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    if (priceEnd >= FILTERS.PRICE_BOUNDARIES.MAX) {
      priceEnd = `${FILTERS.PRICE_BOUNDARIES.MAX}+`;
    }

    return `$${priceStart} - $${priceEnd}`;
  };

  /**
   * Render price widget
   */
  const renderPriceWidget = () => (
    <>
      <div className="d-flex align-items-center justify-content-space-between mb-24 w-280">
        <div className="w-120">
          <div className="font-12 mb-4">
            <FormattedMessage id="shared.from" />
          </div>
          <Input
            className="mb-0"
            autoComplete="off"
            onChange={onChangePrice('priceStart')}
            value={filters.priceStart}
            onBlur={onBlurHandler('priceStart')}
          />
        </div>
        <div className="search-page__filters-popover__line" />
        <div className="w-120">
          <div className="font-12 mb-4">
            <FormattedMessage id="shared.to" />
          </div>
          <Input
            className="mb-0"
            autoComplete="off"
            onChange={onChangePrice('priceEnd')}
            value={filters.priceEnd}
            onBlur={onBlurHandler('priceEnd')}
          />
        </div>
      </div>
      <Slider
        value={rangeValue()}
        max={FILTERS.PRICE_BOUNDARIES.MAX}
        range
        tipFormatter={tipFormatter(FILTERS.PRICE_BOUNDARIES.MAX)}
        onChange={onChangePriceBySlider}
      />
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
      priceStart: prepareInitialValue('priceStart'),
      priceEnd: prepareInitialValue('priceEnd'),
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
    checkFilterUpdates,
    prepareInitialValue,
    onChangePriceBySlider,
    clearFilters,
    applyFilters,
    priceString: getPriceString(),
    filters,
    onChangePrice,
    rangeValue: rangeValue(),
    onBlurHandler,
    renderPriceWidget,
    setFilters,
  };
}

export default useContainer;
