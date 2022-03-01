import React from 'react';
import { Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import ReactCalendar from 'react-calendar';

import { MAPBOX_FEATURE_TYPE, CHOOSE_DESTINATION_WIDGET_SIZE } from 'constants/searchDestinations';
import isPresent from 'utils/isPresent';

import SearchButton from './SearchButton';

const ChooseDestinationWidgetComponent = ({
  intl,
  destinations,
  listHeight,
  onDestinationsChange,
  onDestinationsSearch,
  onRangeFocus,
  isRangePickerVisible,
  dateRange,
  onDateRangeChanged,
  isPairMonthVisible,
  rangeInputValue,
  clearDateRange,
  clearDestinations,
  size,
  destinationValue,
  chooseRangeRef,
  chooseDestinationRef,
  isMobile,
  onMobileSelectFocus,
  tileContent,
  formatShortWeekday,
  onRangeInputChange,
  tileDisabled,
  searchDestinations,
  onDestinationsFocus,
}) => {
  if (isMobile) {
    return (
      <div className={
        classNames(
          'choose-destination',
          { 'choose-destination--small': size === CHOOSE_DESTINATION_WIDGET_SIZE.SMALL },
          { 'choose-destination--hide-close-icon': !isPresent(destinationValue) },
        )}
      >
        <div className="choose-destination__select-wrapper w-100">
          <i className="icon icon-search in-gray-500" />
          <Select
            className="choose-destination-location main-input__field choose-destination__select-wrapper"
            showSearch
            placeholder={intl.formatMessage({ id: 'shared.whereAreYouGoing' })}
            listHeight={0}
            value={destinationValue}
            autoComplete="off"
            dropdownClassName="d-none"
            onFocus={onMobileSelectFocus}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('choose-destination', { 'choose-destination--small': size === CHOOSE_DESTINATION_WIDGET_SIZE.SMALL })}>
      <div className="choose-destination__select-wrapper">
        <i className="icon icon-search in-gray-500" />
        <Select
          id="choose-destination__destination-input"
          className={classNames(
            'main-input__field',
            { 'choose-destination__location--small': size === CHOOSE_DESTINATION_WIDGET_SIZE.SMALL },
            { 'choose-destination__location--big': size !== CHOOSE_DESTINATION_WIDGET_SIZE.SMALL },
            { 'choose-destination--hide-close-icon': !isPresent(destinationValue) },
          )}
          showSearch
          placeholder={intl.formatMessage({ id: 'shared.whereAreYouGoing' })}
          listHeight={listHeight}
          onSearch={onDestinationsSearch}
          value={destinationValue}
          dropdownMatchSelectWidth={false}
          filterOption={false}
          allowClear
          onClear={clearDestinations}
          ref={chooseDestinationRef}
          getPopupContainer={() => document.querySelector('div.choose-destination__select-wrapper')}
          onFocus={onDestinationsFocus}
          dropdownClassName="choose-destination__destination-popup"
          showAction={['focus', 'click']}
        >
          {destinations.map(item => {
            if (item.type === 'loader') {
              return (
                <Select.Option key={item.id}>
                  <div className="d-flex align-items-center">
                    <div className="main-dropdown__item-home-search">
                      <img src="/images/home/LocationBack.svg" alt="" />
                      <i className="icon icon-location-f in-black font-16 location" />
                    </div>
                    <span>
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </span>
                  </div>
                </Select.Option>
              );
            }

            if (item.id === 'shared.exploreCampervansNearYour') {
              return (
                <Select.Option key="shared.exploreCampervansNearYour">
                  <div
                    className="d-flex align-items-center"
                    role="button"
                    onClick={onDestinationsChange(item)}
                  >
                    <div className="main-dropdown__item-home-search">
                      <img src="/images/home/LocationBack.svg" alt="" />
                      <i className="icon icon-location-f in-black font-16 location" />
                    </div>
                    <span>
                      <FormattedMessage id="shared.exploreCampervansNearYour" />
                    </span>
                  </div>
                </Select.Option>
              );
            }

            if (item.type === 'shared.explorePopularDestinations') {
              return (
                <Select.Option key="shared.explorePopularDestinations">
                  <div
                    className="d-flex align-items-center"
                    role="button"
                    onClick={onDestinationsChange(item)}
                  >
                    <div className="main-dropdown__item-home-search">
                      <img src="/images/home/LocationBack.svg" alt="" />
                      <i className="icon icon-location-f in-black font-16 location" />
                    </div>
                    <span>
                      <FormattedMessage id="shared.explorePopularDestinations" />
                    </span>
                  </div>
                </Select.Option>
              );
            }

            if (item.landingType) {
              return (
                <Select.Option key={item.id}>
                  <div
                    className="d-flex align-items-center"
                    role="button"
                    onClick={onDestinationsChange(item)}
                  >
                    <div className="main-dropdown__item-home-search">
                      <img src={item.mainPhotoUrl360} alt="" />
                    </div>
                    <span>{item.landingName}</span>
                  </div>
                </Select.Option>
              );
            }

            if (item.type === MAPBOX_FEATURE_TYPE) {
              return (
                <Select.Option key={item.id}>
                  <div
                    className="d-flex align-items-center"
                    role="button"
                    onClick={onDestinationsChange(item)}
                  >
                    <div className="main-dropdown__item-home-search">
                      <i className="icon icon-city in-black" />
                    </div>
                    <span>{item.placeName}</span>
                  </div>
                </Select.Option>
              );
            }

            return null;
          })}
        </Select>
      </div>
      <div className="choose-destination__range_input-wrapper">
        <i className="icon icon-calendar in-gray-500" />
        <Select
          className={classNames(
            'main-input__field',
            'choose-destination__range_input',
            { 'choose-destination__dates--small': size === CHOOSE_DESTINATION_WIDGET_SIZE.SMALL },
            { 'choose-destination__dates--big': size !== CHOOSE_DESTINATION_WIDGET_SIZE.SMALL },
            { 'choose-destination--hide-close-icon': !isPresent(rangeInputValue) },
          )}
          onFocus={onRangeFocus}
          id="choose-destination__calendar-input"
          placeholder={intl.formatMessage({ id: 'shared.whenIsYourTrip' })}
          value={rangeInputValue}
          onChange={onRangeInputChange}
          autoComplete="off"
          allowClear
          dropdownClassName="d-none"
          onClear={clearDateRange}
          ref={chooseRangeRef}
          listHeight={0}
        />
      </div>
      <SearchButton onClick={searchDestinations} />
      <div
        id="choose-destination__calendar-wrapper"
        className={classNames('choose-destination__calendar-wrapper', {
          'choose-destination__calendar-wrapper--small': size === CHOOSE_DESTINATION_WIDGET_SIZE.SMALL,
          'choose-destination__calendar-wrapper--invisible': !isRangePickerVisible,
        })}
      >
        <ReactCalendar
          onChange={onDateRangeChanged}
          selectRange
          value={dateRange}
          showDoubleView={isPairMonthVisible}
          formatShortWeekday={formatShortWeekday}
          tileContent={tileContent}
          tileDisabled={tileDisabled}
        />
        <div className="choose-destination__clear-section mb-20 ml-20">
          <span
            onClick={clearDateRange}
            role="button"
          >
            <FormattedMessage id="shared.clear" />
          </span>
        </div>
      </div>
    </div>
  );
};

ChooseDestinationWidgetComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  destinations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  listHeight: PropTypes.number.isRequired,
  onDestinationsChange: PropTypes.func.isRequired,
  onDestinationsSearch: PropTypes.func.isRequired,
  onRangeFocus: PropTypes.func.isRequired,
  isRangePickerVisible: PropTypes.bool.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onDateRangeChanged: PropTypes.func.isRequired,
  isPairMonthVisible: PropTypes.bool.isRequired,
  rangeInputValue: PropTypes.string,
  clearDateRange: PropTypes.func.isRequired,
  size: PropTypes.string,
  destinationValue: PropTypes.string,
  clearDestinations: PropTypes.func.isRequired,
  chooseRangeRef: PropTypes.shape().isRequired,
  chooseDestinationRef: PropTypes.shape().isRequired,
  isMobile: PropTypes.bool.isRequired,
  onMobileSelectFocus: PropTypes.func,
  formatShortWeekday: PropTypes.func.isRequired,
  tileContent: PropTypes.func.isRequired,
  onRangeInputChange: PropTypes.func.isRequired,
  tileDisabled: PropTypes.func.isRequired,
  searchDestinations: PropTypes.func.isRequired,
  onDestinationsFocus: PropTypes.func.isRequired,
};

ChooseDestinationWidgetComponent.defaultProps = {
  dateRange: null,
  size: CHOOSE_DESTINATION_WIDGET_SIZE.LARGE,
  rangeInputValue: null,
  destinationValue: null,
  onMobileSelectFocus: undefined,
};

export default ChooseDestinationWidgetComponent;
