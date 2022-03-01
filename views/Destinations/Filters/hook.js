import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import deepEqual from 'fast-deep-equal';

import { fetchVehicleTypes } from 'state/concepts/camper/actions';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { fetchCampers } from 'state/concepts/campervan-rental/actions';
import usePrevious from 'utils/hooks/usePrevious';

function useContainer() {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  const prevPersistedFilters = usePrevious(persistedFilters);

  /**
   * Mounting.
   */
   useEffect(() => {
    dispatch(fetchVehicleTypes());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Detect fetch campers
   */
  const detectFetchCampers = (currentFilters, prevFilters) => {
    if (
      deepEqual(
        R.omit(['uuid'], currentFilters),
        R.omit(['uuid'], prevFilters),
      )
    ) {
      return false;
    }

    dispatch(fetchCampers());

    return true;
  };

  /**
   * Updating
   */
  useEffect(() => {
    if (persistedFilters.uuid !== null) {
      detectFetchCampers(persistedFilters, prevPersistedFilters);
    }

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedFilters.uuid]);

  return { detectFetchCampers };
}

export default useContainer;
