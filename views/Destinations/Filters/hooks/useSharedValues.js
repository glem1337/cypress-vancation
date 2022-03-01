import { useDispatch, useSelector } from 'react-redux';

import { clearAllFilter as clearAllFilterAction } from 'state/concepts/search-destinations/actions';
import { campersTotalSelector } from 'state/concepts/campervan-rental/selectors';
import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { loadingSelector } from 'state/data/selectors';

function useContainer() {
  const dispatch = useDispatch();

  const campersTotal = useSelector(campersTotalSelector);

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  const areCampersFetching = useSelector(state => loadingSelector(
    state, fetchCampersEndpoint.endpoint,
  ));

  /**
   * Tip formatter.
   */
  const tipFormatter = (maxValue) => (value) => {
    if (value >= maxValue) {
      return `$${maxValue}+`;
    }

    return `$${value}`;
  };

  /**
   * Get popup container.
   */
  const getPopupContainer = () => document.querySelector('.search-page__filters-wrap');

   /**
   * Clear all filters.
   */
  const clearAllFilters = () => {
    dispatch(clearAllFilterAction());
  };

  return {
    tipFormatter,
    getPopupContainer,
    clearAllFilters,
    campersTotal,
    persistedFilters,
    areCampersFetching,
  };
}

export default useContainer;
