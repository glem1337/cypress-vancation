import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as R from 'ramda';
import { Checkbox } from 'antd';
import { debounce } from 'lodash';

import { FILTERS } from 'constants/searchDestinations';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { setFilterValue } from 'state/concepts/search-destinations/actions';
import { vehicleTypeSelector } from 'state/concepts/camper/selectors';

function useContainer(props) {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  const vehicleTypes = useSelector(vehicleTypeSelector);

  const [filters, setFilters] = useState(persistedFilters.vehicles || []);

  /**
   * Persisted handlers.
   */
  const handlers = useRef({
    /**
     * Immediately Apply filters.
     */
    applyFiltersImmediately: debounce((value) => {
      dispatch(setFilterValue({
        name: 'vehicles',
        value,
      }));
    }, FILTERS.DEBOUNCE_TIME),
  });

  /**
   * Clear filters.
   */
  const clearFilters = () => {
    dispatch(setFilterValue({
      name: 'vehicles',
      value: null,
    }));

    props.toggleOpenedState(null)();
  };

  /**
   * Apply filters.
   */
  const applyFilters = () => {
    dispatch(setFilterValue({
      name: 'vehicles',
      value: filters,
    }));

    props.toggleOpenedState(null)();

    return filters;
  };

  /**
   * On change handler.
   */
  const onChangeHandler = (id) => () => {
    let array = [...filters];

    const index = array.indexOf(id);

    if (index !== -1) {
      array = R.remove(index, 1, array);
    }

    if (index === -1) {
      array = [...array, id];
    }

    setFilters(array);

    if (props.immediatelyApply) {
      handlers.current.applyFiltersImmediately(array);
    }
  };

  /**
   * Detect is checked.
   */
  const isChecked = (id) => R.includes(id, filters);

  /**
   * Render vehicle widget.
   */
  const renderVehiclesWidget = () => (
    <>
      {R.defaultTo([], vehicleTypes).map(item => (
        <Checkbox
          key={item.id}
          className="main-checkbox-card"
          onChange={onChangeHandler(item.name)}
          checked={isChecked(item.name)}
        >
          <i className="icon icon-activate-f main-checkbox-card__icon" />
          <div className="d-flex flex-column flex-1">
            <div className="d-flex align-items-center mb-16">
              <img src="/images/listing/Modern-Van.svg" alt="" />
              <span className="text-subheader font-400 ml-8">{item.name}</span>
            </div>
            <div className="mr-40">{item.description}</div>
          </div>
        </Checkbox>
      ))}
    </>
  );

  /**
   * Check filter updates
   */
  const checkFilterUpdates = () => {
    if (!persistedFilters.uuid) {
      return false;
    }

    setFilters(persistedFilters.vehicles || []);

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
    vehicleTypes,
    clearFilters,
    applyFilters,
    isChecked,
    onChangeHandler,
    badge: persistedFilters.vehicles?.length,
    renderVehiclesWidget,
    setFilters,
    filters,
    checkFilterUpdates,
  };
}

export default useContainer;
