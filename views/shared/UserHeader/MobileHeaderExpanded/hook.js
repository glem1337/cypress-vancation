import { useDispatch } from 'react-redux';

import { setExpandCondition } from 'state/concepts/header/actions';

function useContainer() {
  const dispatch = useDispatch();

  /**
   * Collapse mobile header
   */
  const collapseMobileHeader = () => {
    dispatch(setExpandCondition(false));
  };

  return {
    collapseMobileHeader,
    query: {
      shouldGoBack: true,
    },
  };
}

export default useContainer;
