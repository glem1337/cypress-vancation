import { useSelector } from 'react-redux';
import { path } from 'ramda';

import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

function useContainer() {
  const searchParams = useSelector(searchDestinationParamsSelector);

  return {
    url: path(['location', 'mainPhotoUrl800'], searchParams),
  };
}

export default useContainer;
