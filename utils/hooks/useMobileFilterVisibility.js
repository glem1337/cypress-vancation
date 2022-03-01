import { useSelector, useDispatch } from 'react-redux';

import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { toggleMobileFiltersVisibility as toggleMobileFiltersVisibilityAction } from 'state/concepts/search-destinations/actions';

function useMobileFilterVisibility() {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  /**
   * Toggle mobile filter visibility.
   */
  const toggleMobileFiltersVisibility = () => {
    dispatch(toggleMobileFiltersVisibilityAction());
  };

  return {
    isMobileVisible: persistedFilters?.isMobileVisible,
    toggleMobileFiltersVisibility,
  };
}

export default useMobileFilterVisibility;
