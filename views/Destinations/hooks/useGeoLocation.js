import { useEffect, useCallback, useState } from 'react';

function useContainer({ location, state }) {
  const [coords, setCoords] = useState({});

  /**
   * User geolocation success callback.
   */
  const currentPositionSuccess = useCallback((position) => {
    setCoords(position.coords);
  }, []);

  /**
   * User geolocation error callback.
   */
  const currentPositionError = useCallback((error) => {
    if (error.code === 1) {
      // TODO: API request
      return false;
    }

    return true;
  }, []);

  /**
   * Did mount.
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError);

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    coords,
    location,
    state,
    currentPositionSuccess,
    currentPositionError,
  };
}

export default useContainer;
