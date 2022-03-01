import { useEffect, useState } from 'react';

export const FILTER_NAMES = {
  GUESTS: 'quests',
  PRICE: 'price',
  VEHICLE: 'vehicle',
  DELIVERY: 'delivery',
  MORE: 'more',
};

function useContainer() {
  const [openedFilterName, setOpenedFilterName] = useState(null);

  /**
   * Toggle opened filter name.
   */
  const toggleOpenedState = (filterName) => () => {
    setOpenedFilterName(prev => {
      const newValue = prev === filterName
        ? null
        : filterName;

      return newValue;
    });
  };

  /**
   * Close all filters.
   */
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('search-page__filters-btn')) {
      return false;
    }

    const popoverWrapper = document.querySelector('.ant-popover:not(.ant-popover-hidden) ');

    if (popoverWrapper && popoverWrapper.contains(event.target)) {
      return false;
    }

    setOpenedFilterName(null);

    return true;
  };

  /**
   * Mounting.
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    openedFilterName,
    toggleOpenedState,
    handleClickOutside,
  };
}

export default useContainer;
