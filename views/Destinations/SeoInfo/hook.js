import { useSelector } from 'react-redux';
import { path } from 'ramda';

import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

function useContainer() {
  const searchParams = useSelector(searchDestinationParamsSelector);

  return {
    seoInfo: path(['location', 'seoInfo'], searchParams),
  };
}

export default useContainer;
