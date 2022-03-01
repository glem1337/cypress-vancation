import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'antd';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';

import { FILTERS } from 'constants/searchDestinations';
import { setFilterValue } from 'state/concepts/search-destinations/actions';
import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';

function useContainer() {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  const [isChecked, setIsChecked] = useState(persistedFilters.glamper || false);

  /**
   * Persisted handlers.
   */
  const handlers = useRef({
    /**
     * On change handler.
     */
    onChangeHandler: debounce((checked) => {
     const value = checked ? true : null;

      dispatch(setFilterValue({
        name: 'glamper',
        value,
      }));
    }, FILTERS.DEBOUNCE_TIME),
  });

  /**
   * On change handler.
   */
  const onChangeHandler = (checked) => {
    setIsChecked(checked);
  };

  /**
   * Render glamper only widget
   */
  const renderGlamperOnlyWidget = () => (
    <>
      <span className="font-600 mr-12">
        <FormattedMessage id="campervan-rental.filter.glampersOnly" />
      </span>
      <Switch
        size="small"
        onChange={onChangeHandler}
        checked={isChecked}
      />
    </>
  );

  /**
   * Updating
   */
  useEffect(() => {
    if (persistedFilters.glamper !== isChecked) {
      setIsChecked(persistedFilters.glamper || false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedFilters.uuid]);

  /**
   * Updating
   */
  useEffect(() => {
    if (isChecked !== persistedFilters.glamper) {
      handlers.current.onChangeHandler(isChecked);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return {
    renderGlamperOnlyWidget,
    isGlamper: persistedFilters.glamper,
    onChangeHandler,
  };
}

export default useContainer;
