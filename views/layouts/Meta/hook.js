import { useSelector } from 'react-redux';

import { openGraphDataSelector } from 'state/app/selectors';

const useContainer = () => {
  const openGraphData = useSelector(openGraphDataSelector);

  return openGraphData;
};

export default useContainer;
