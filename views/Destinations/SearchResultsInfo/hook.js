import { useSelector } from 'react-redux';
import { path } from 'ramda';

import {
  areSearchResultsFetchingSelector,
  campersTotalSelector,
  campersSelector,
} from 'state/concepts/campervan-rental/selectors';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

function useContainer() {
  const campers = useSelector(campersSelector);
  const areFetching = useSelector(areSearchResultsFetchingSelector);
  const total = useSelector(campersTotalSelector);
  const searchParams = useSelector(searchDestinationParamsSelector);

  return {
    areExisted: campers?.length > 0,
    areFetched: areFetching === false,
    total,
    location: path(['location', 'locationName'], searchParams) || path(['location', 'placeShortName'], searchParams),
    state: path(['location', 'stateLanding', 'state'], searchParams)
      || path(['location', 'state'], searchParams)
      || path(['location', 'shortStateCode'], searchParams),
    slug: path(['location', 'stateLanding', 'slug'], searchParams)
      || path(['location', 'slug'], searchParams),
  };
}

export default useContainer;
