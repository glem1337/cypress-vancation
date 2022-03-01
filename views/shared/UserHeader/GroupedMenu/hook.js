import { useSelector } from 'react-redux';

import { isUserLoggedInSelector } from 'state/concepts/session/selectors';

function useContainer() {
  const isUserLoggedIn = useSelector(isUserLoggedInSelector);

  return isUserLoggedIn;
}

export default useContainer;
