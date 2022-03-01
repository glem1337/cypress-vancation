import { useSelector } from 'react-redux';
import { path } from 'ramda';

import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';

function useContainer() {
  const searchParams = useSelector(searchDestinationParamsSelector);

  return {
    title: path(['location', 'seoInfo', 'pageHeaderTitle'], searchParams),
    subTitle: path(['location', 'subtitle'], searchParams),
  };
}

export default useContainer;
