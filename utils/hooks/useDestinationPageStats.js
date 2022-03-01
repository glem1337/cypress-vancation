import { useSelector, useDispatch } from 'react-redux';

import { MAPBOX_FEATURE_TYPE } from 'constants/searchDestinations';
import {
  searchDestinationParamsSelector,
  searchDestinationFiltersSelector,
  desktopMapVisibilitySelector,
} from 'state/concepts/search-destinations/selectors';
import isPresent from 'utils/isPresent';
import {
  clearAllFilter as clearAllFilterAction,
  toggleDesktopMapVisibility as toggleDesktopMapVisibilityAction,
} from 'state/concepts/search-destinations/actions';
import { loadingSelector } from 'state/data/selectors';
import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { campersSelector } from 'state/concepts/campervan-rental/selectors';

function useDestinationPageStats() {
  const dispatch = useDispatch();

  const campers = useSelector(campersSelector);

  const searchParams = useSelector(searchDestinationParamsSelector);

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  const isDesktopMapVisible = useSelector(desktopMapVisibilitySelector);

  const areCampersFetching = useSelector(
    state => loadingSelector(state, fetchCampersEndpoint.endpoint),
  );

  /**
   * Is any filter applied.
   */
  const isAnyFilterApplied = () => {
    const keys = Object.keys(persistedFilters);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      if (
        key === 'uuid'
        || key === 'isMobileVisible'
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const value = persistedFilters[key];

      if (isPresent(value)) {
        return true;
      }
    }

    return false;
  };

  /**
   * Clear all filters.
   */
  const clearAllFilters = () => {
    dispatch(clearAllFilterAction());
  };

  /**
   * Toggle desktop map visibility
   */
  const toggleDesktopMapVisibility = () => {
    dispatch(toggleDesktopMapVisibilityAction());
  };

  return {
    isSearchResultsPage: searchParams?.location?.type === MAPBOX_FEATURE_TYPE,
    isAnyFilterApplied: isAnyFilterApplied(),
    clearAllFilters,
    isDesktopMapVisible,
    toggleDesktopMapVisibility,
    areCampersFetching,
    campers,
  };
}

export default useDestinationPageStats;
