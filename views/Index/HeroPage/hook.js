import { useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';

function useContainer({ isChooseDestinationVisible }) {
  const intl = useIntl();

  const chooseDestinationRef = useRef();

  /**
   * Close all pickers.
   */
  const closeAllPickers = () => {
    if (!chooseDestinationRef.current?.closeAllPickers || isChooseDestinationVisible) {
      return false;
    }

    chooseDestinationRef.current.closeAllPickers();

    return true;
  };

  /**
   * Updating.
   */
  useEffect(() => {
    closeAllPickers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChooseDestinationVisible]);

  return {
    intl,
    chooseDestinationRef,
    closeAllPickers,
  };
}

export default useContainer;
