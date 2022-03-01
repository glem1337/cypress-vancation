import { useSelector } from 'react-redux';
import { path } from 'ramda';

import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import { campersSelector } from 'state/concepts/campervan-rental/selectors';

function useContainer() {
  const campers = useSelector(campersSelector);

  const searchParams = useSelector(searchDestinationParamsSelector);

  return {
    areCampersExist: campers.length > 0,
    description: path(['location', 'description'], searchParams),
  };
}

export default useContainer;
