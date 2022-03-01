import { useDispatch } from 'react-redux';

import { setExpandCondition } from 'state/concepts/header/actions';
import useMobileFilterVisibility from 'utils/hooks/useMobileFilterVisibility';

function useContainer() {
  const dispatch = useDispatch();

  const { toggleMobileFiltersVisibility } = useMobileFilterVisibility();

  /**
   * Expand mobile header
   */
  const expandMobileHeader = () => {
    dispatch(setExpandCondition(true));
  };

  /**
   * On click handler
   */
  const onClickHandler = (e) => {
    e.stopPropagation();
    toggleMobileFiltersVisibility();
  };

  return {
    expandMobileHeader,
    onClickHandler,
  };
}

export default useContainer;
