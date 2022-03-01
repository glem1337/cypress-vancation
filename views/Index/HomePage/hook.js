import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearSearchDestinationParams } from 'state/concepts/search-destinations/actions';

function useContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSearchDestinationParams());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}

export default useContainer;
