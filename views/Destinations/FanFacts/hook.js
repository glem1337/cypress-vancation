import { useSelector } from 'react-redux';
import { path } from 'ramda';

import { campersSelector } from 'state/concepts/campervan-rental/selectors';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

function useContainer() {
  const campers = useSelector(campersSelector);
  const searchParams = useSelector(searchDestinationParamsSelector);

  return {
    areCampersExist: campers.length > 0,
    description: path(['location', 'funFactsTitle'], searchParams),
    facts: path(['location', 'funFacts'], searchParams),
  };
}

export default useContainer;
