import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as R from 'ramda';
import { Checkbox, Radio } from 'antd';
import { FormattedMessage } from 'react-intl';

import { searchDestinationFiltersSelector } from 'state/concepts/search-destinations/selectors';
import { setFilterBatchValue, setFilterValue } from 'state/concepts/search-destinations/actions';
import { FILTERS } from 'constants/searchDestinations';
import isPresent from 'utils/isPresent';

function useContainer(props) {
  const dispatch = useDispatch();

  const persistedFilters = useSelector(searchDestinationFiltersSelector);

  /**
   * Detect initial values.
   */
  const detectInitialValues = () => ({
    rating: isPresent(persistedFilters.rating)
      ? `${persistedFilters.rating}`
      : FILTERS.RATING.ALL,
    allowPets: persistedFilters.allowPets || false,
    allowSmoking: persistedFilters.allowSmoking || false,
    festivalApproved: persistedFilters.festivalApproved || false,
    allowUnlimitedMiles: persistedFilters.allowUnlimitedMiles || false,
    insideHeight: persistedFilters.insideHeight || [],
    standardAmenities: persistedFilters.standardAmenities || [],
    luxuryAmenities: persistedFilters.luxuryAmenities || [],
  });

  /**
   * State
   */
  const [filters, setFilters] = useState(detectInitialValues(persistedFilters));

  /**
   * Clear filters.
   */
  const clearFilters = () => {
    let array = [];

    const keys = Object.keys(filters);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      array = [...array, {
        name: key,
        value: null,
      }];
    }

    dispatch(setFilterBatchValue(array));

    props.toggleOpenedState(null)();

    return array;
  };

  /**
   * Apply filters.
   */
  const applyFilters = () => {
    let array = [];

    const keys = Object.keys(filters);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = filters[key];

      if (key === 'rating') {
        const rating = value !== FILTERS.RATING.ALL
          ? parseInt(value, 10)
          : null;

        array = [...array, {
          name: 'rating',
          value: rating,
        }];

        // eslint-disable-next-line no-continue
        continue;
      }

      array = [...array, {
        name: key,
        value: value === false ? null : value,
      }];
    }

    dispatch(setFilterBatchValue(array));

    if (props.toggleOpenedState) {
      props.toggleOpenedState(null)();
    }

    return array;
  };

  /**
   * On change rating.
   */
  const onChangeRating = ({ target: { value } }) => {
    setFilters(prev => ({
      ...prev,
      rating: value,
    }));

    if (props.immediatelyApply) {
      const rating = value !== FILTERS.RATING.ALL
          ? parseInt(value, 10)
          : null;

      dispatch(setFilterValue({
        name: 'rating',
        value: rating,
      }));
    }
  };

  /**
   * On change rules.
   */
  const onChangeRules = (filterName) => ({ target: { checked } }) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: checked,
    }));

    if (props.immediatelyApply) {
      dispatch(setFilterValue({
        name: filterName,
        value: checked === false ? null : checked,
      }));
    }
  };

  /**
   * On inside height change.
   */
  const onInsideHeightChange = (value) => () => {
    let array = [...filters.insideHeight];

    const index = R.findIndex(R.propEq('name', value.name), array);

    if (index !== -1) {
      array = R.remove(index, 1, array);
    }

    if (index === -1) {
      array = [...array, value];
    }

    setFilters(prev => ({
      ...prev,
      insideHeight: array,
    }));

    if (props.immediatelyApply) {
      dispatch(setFilterValue({
        name: 'insideHeight',
        value: array,
      }));
    }
  };

  /**
   * On amenity change handler.
   */
  const onStandardAmenityChange = (amenity) => () => {
    let array = [...filters.standardAmenities];

    const index = R.findIndex(R.propEq('name', amenity.name), array);

    if (index !== -1) {
      array = R.remove(index, 1, array);
    }

    if (index === -1) {
      array = [...array, amenity];
    }

    setFilters(prev => ({
      ...prev,
      standardAmenities: array,
    }));

    if (props.immediatelyApply) {
      dispatch(setFilterValue({
        name: 'standardAmenities',
        value: array,
      }));
    }
  };

  /**
   * On luxury amenity change handler.
   */
   const onLuxuryAmenityChange = (amenity) => () => {
    let array = [...filters.luxuryAmenities];

    const index = R.findIndex(R.propEq('name', amenity.name), array);

    if (index !== -1) {
      array = R.remove(index, 1, array);
    }

    if (index === -1) {
      array = [...array, amenity];
    }

    setFilters(prev => ({
      ...prev,
      luxuryAmenities: array,
    }));

    if (props.immediatelyApply) {
      dispatch(setFilterValue({
        name: 'luxuryAmenities',
        value: array,
      }));
    }
  };

  /**
   * Detect is standard amenity checked.
   */
  const isStandardAmenityChecked = (name) => R.includes(name, filters.standardAmenities);

  /**
   * Detect is luxury amenity checked.
   */
  const isLuxuryAmenityChecked = (name) => R.includes(name, filters.luxuryAmenities);

  /**
   * Is inside height checked.
   */
  const isInsideHeightChecked = (value) => R.includes(value, filters.insideHeight);

  /**
   * Is any filter applied.
   */
  const isAnyFilterApplied = () => {
    const keys = Object.keys(filters);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      const value = persistedFilters[key];

      if (isPresent(value)) {
        return true;
      }
    }

    return false;
  };

  /**
   * Count applied filters
   */
  const countFilterApplied = () => {
    let count = 0;

    const keys = Object.keys(filters);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      const value = persistedFilters[key];

      if (Array.isArray(value)) {
        for (let j = 0; j < value.length; j += 1) {
          count += 1;
        }
      }

      if (!Array.isArray(value) && value === true) {
        count += 1;
      }

      if (key === 'rating' && value !== FILTERS.RATING.ALL && isPresent(value)) {
        count += 1;
      }
    }

    return count;
  };

  /**
   * Render standard amenities
   */
  const renderStandardAmenities = () => (
    <>
      {Object.values(FILTERS.STANDARD_AMENITY).map(amenity => (
        <Checkbox
          key={amenity.name}
          className="main-checkbox-card"
          checked={isStandardAmenityChecked(amenity)}
          onChange={onStandardAmenityChange(amenity)}
        >
          <div className="d-flex flex-column flex-1">
            <div className="d-flex align-items-center">
              <img
                src={amenity.image}
                className="mr-12"
                alt=""
              />
              <span className="in-black">
                <FormattedMessage {...amenity.message} />
              </span>
            </div>
          </div>
        </Checkbox>
      ))}
    </>
  );

  /**
   * Render standard amenities
   */
  const renderLuxuryAmenities = () => (
    <>
      {Object.values(FILTERS.LUXURY_AMENITY).map(amenity => (
        <Checkbox
          key={amenity.name}
          className="main-checkbox-card"
          checked={isLuxuryAmenityChecked(amenity)}
          onChange={onLuxuryAmenityChange(amenity)}
        >
          <div className="d-flex flex-column flex-1">
            <div className="d-flex align-items-center">
              <img
                src={amenity.image}
                className="mr-12"
                alt=""
              />
              <span className="in-black">
                <FormattedMessage {...amenity.message} />
              </span>
            </div>
          </div>
        </Checkbox>
      ))}
    </>
  );

  /**
   * Render inside height widget.
   */
  const renderInsideHeight = () => (
    <>
      {Object.values(FILTERS.INSIDE_HEIGHT).map(height => (
        <div className="search-page__filters-mob__input-row__item" key={height.name}>
          <img
            className="mr-12"
            src={height.image}
            alt=""
          />
          <Checkbox
            checked={isInsideHeightChecked(height)}
            onChange={onInsideHeightChange(height)}
          >
            <FormattedMessage {...height.message} />
          </Checkbox>
        </div>
      ))}
    </>
  );

  /**
   * Render rules widget.
   */
  const renderRules = () => (
    <>
      {Object.values(FILTERS.RULES).map(rule => (
        <Checkbox
          key={rule.name}
          className="main-checkbox-card"
          checked={filters[rule.name]}
          onChange={onChangeRules(rule.name)}
        >
          <div className="d-flex flex-column flex-1">
            <div className="d-flex align-items-center">
              <img
                src={rule.image}
                className="mr-12"
                alt=""
              />
              <span className="in-black">
                <FormattedMessage {...rule.message} />
              </span>
            </div>
          </div>
        </Checkbox>
      ))}
    </>
  );

  /**
   * Render rating widget.
   */
  const renderRating = ({ isMobile } = {}) => (
    <Radio.Group
      onChange={onChangeRating}
      value={filters.rating}
      className={
        isMobile
          ? 'search-page__filters-mob__input-row'
          : 'mb-0'
      }
    >
      {Object.values(FILTERS.RATING).map((rating) => {
        if (rating === FILTERS.RATING.ALL) {
          return (
            <div
              className={
                isMobile
                  ? 'search-page__filters-mob__input-row__item'
                  : 'mb-16'
              }
              key={FILTERS.RATING.ALL}
            >
              <Radio
                value={FILTERS.RATING.ALL}
                checked={filters.rating === FILTERS.RATING.ALL}
              >
                <span className="ml-12">
                  <FormattedMessage id="shared.all" />
                </span>
              </Radio>
            </div>
          );
        }

        return (
          <div
            className={
              isMobile
                ? 'search-page__filters-mob__input-row__item'
                : 'mb-8'
            }
            key={rating}
          >
            <Radio
              value={rating}
              className="ant-radio-centered"
              checked={filters.rating === rating}
            >
              <div className="search-page__filters-rating">
                <div className="search-page__filters-rating-icon-90">
                  <img src="/images/Like - White.svg" alt="" />
                </div>
                <span className="font-600 ml-8">{`${rating}%`}</span>
              </div>
            </Radio>
          </div>
        );
      })}
    </Radio.Group>
  );

  /**
   * Check filter updates
   */
   const checkFilterUpdates = () => {
    if (!persistedFilters.uuid) {
      return false;
    }

    setFilters(detectInitialValues(persistedFilters));

    return true;
  };

  /**
   * Updating
   */
  useEffect(() => {
    checkFilterUpdates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedFilters.uuid]);

  /**
   * Updating
   */
  useEffect(() => {
    checkFilterUpdates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openedFilterName]);

  return {
    setFilters,
    detectInitialValues,
    checkFilterUpdates,
    clearFilters,
    applyFilters,
    filters,
    onChangeRating,
    onChangeRules,
    onInsideHeightChange,
    isInsideHeightChecked,
    isStandardAmenityChecked,
    onStandardAmenityChange,
    isLuxuryAmenityChecked,
    onLuxuryAmenityChange,
    isAnyFilterApplied: isAnyFilterApplied(),
    countFilterApplied: countFilterApplied(),
    renderStandardAmenities,
    renderLuxuryAmenities,
    renderInsideHeight,
    renderRules,
    renderRating,
  };
}

export default useContainer;
