import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';

import { FILTERS } from 'constants/searchDestinations';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { setFilterValue } from 'state/concepts/search-destinations/actions';
import isPresent from 'utils/isPresent';

function useContainer(props) {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  /**
   * State
   */
  const [filter, setFilter] = useState(persistedFilters.delivery);

  /**
   * Clear filters.
   */
  const clearFilters = () => {
    dispatch(setFilterValue({
      name: 'delivery',
      value: null,
    }));

    props.toggleOpenedState(null)();
  };

  /**
   * Apply filters.
   */
  const applyFilters = () => {
    dispatch(setFilterValue({
      name: 'delivery',
      value: filter,
    }));

    props.toggleOpenedState(null)();
  };

  /**
   * Persisted handlers.
   */
  const handlers = useRef({
    /**
     * Immediately Apply filters.
     */
    applyFiltersImmediately: debounce((value) => {
      dispatch(setFilterValue({
        name: 'delivery',
        value,
      }));
    }, FILTERS.DEBOUNCE_TIME),
  });

  /**
   * On change handler.
   */
  const onChangeHandler = (name) => () => {
    const newValue = filter === name
      ? null
      : name;

    setFilter(newValue);

    if (props.immediatelyApply) {
      handlers.current.applyFiltersImmediately(newValue);
    }
  };

  /**
   * Render delivery
   */
   const renderDeliveryWidget = () => (
     <div className="search-page__filters-popover__grid">
       {Object.values(FILTERS.DELIVERY).map(item => (
         <Checkbox
           key={item.name}
           className="main-checkbox-card"
           onChange={onChangeHandler(item.name)}
           checked={filter === item.name}
         >
           <i className="icon icon-activate-f main-checkbox-card__icon" />
           <div className="d-flex flex-column flex-1">
             <div className="d-flex align-items-center mb-16">
               <img src="/images/listing/Modern-Van.svg" alt="" />
               <span className="text-subheader font-400 ml-8">
                 <FormattedMessage {...item.message} />
               </span>
             </div>
             <div className="mr-40">
               <FormattedMessage {...item.description} />
             </div>
           </div>
         </Checkbox>
      ))}
     </div>
  );

  /**
   * Check filter updates
   */
  const checkFilterUpdates = () => {
    if (!persistedFilters.uuid) {
      return false;
    }

    setFilter(persistedFilters.delivery);

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
    clearFilters,
    applyFilters,
    isFilterApplied: isPresent(persistedFilters.delivery),
    onChangeHandler,
    filter,
    renderDeliveryWidget,
    checkFilterUpdates,
  };
}

export default useContainer;
