import { useState } from 'react';

import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

const useContainer = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  /**
   * On click handler.
   */
  const setPriceCardVisibility = (isVisible) => () => {
    if (isMobileView() || isTabletView()) {
      setIsCardVisible(isVisible);
    }
  };

  return {
    isCardVisible,
    setPriceCardVisibility,
  };
};

export default useContainer;
