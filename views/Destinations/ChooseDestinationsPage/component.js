import React from 'react';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { MAPBOX_FEATURE_TYPE } from 'constants/searchDestinations';

const SearchDestinationsComponent = ({
  onClose,
  onDestinationsSearch,
  onDestinationSelect,
  onDestinationsClear,
  intl,
  destinations,
  destinationName,
}) => (
  <div className="search-destinations">
    <div className="search-destinations__header">
      <button
        className="search-destinations__header-button"
        type="button"
        onClick={onClose}
      >
        <i className="icon icon-cross search-destinations__close-icon" />
      </button>
      <div className="search-destinations__input-wrapper">
        <i className="icon icon-search in-gray-500" />
        <Select
          className="main-input__field"
          placeholder={intl.formatMessage({ id: 'shared.whereAreYouGoing' })}
          value={destinationName}
          autoComplete="off"
          dropdownClassName="d-none"
          onClear={onDestinationsClear}
          listHeight={0}
          showSearch
          onSearch={onDestinationsSearch}
          allowClear
          autoFocus
        />
      </div>
    </div>
    {destinations.map(item => {
      if (item.type === 'loader') {
        return (
          <div
            className="search-destinations__result-item"
            key="loader"
          >
            <div className="d-flex align-items-center">
              <div className="main-dropdown__item-home-search">
                <img src="/images/home/LocationBack.svg" alt="" />
                <div className="main-dropdown__item-home-search-icon">
                  <i className="icon icon-location-f in-black font-16" />
                </div>
              </div>
              <span>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              </span>
            </div>
          </div>
        );
      }

      if (item.id === 'shared.exploreCampervansNearYour') {
        return (
          <div
            className="search-destinations__result-item"
            key="shared.exploreCampervansNearYour"
          >
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={onDestinationSelect(item)}
            >
              <div className="main-dropdown__item-home-search">
                <img src="/images/home/LocationBack.svg" alt="" />
                <div className="main-dropdown__item-home-search-icon">
                  <i className="icon icon-location-f in-black font-16" />
                </div>
              </div>
              <span>
                <FormattedMessage id="shared.exploreCampervansNearYour" />
              </span>
            </div>
          </div>
        );
      }

      if (item.type === 'shared.explorePopularDestinations') {
        return (
          <div
            className="search-destinations__result-item"
            key="shared.explorePopularDestinations"
          >
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={onDestinationSelect(item)}
            >
              <div className="main-dropdown__item-home-search">
                <img src="/images/home/LocationBack.svg" alt="" />
                <div className="main-dropdown__item-home-search-icon">
                  <i className="icon icon-location-f in-black font-16" />
                </div>
              </div>
              <span>
                <FormattedMessage id="shared.explorePopularDestinations" />
              </span>
            </div>
          </div>
        );
      }

      if (item.landingType) {
        return (
          <div
            className="search-destinations__result-item"
            key={item.id}
          >
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={onDestinationSelect(item)}
            >
              <div className="main-dropdown__item-home-search">
                <img src={item.mainPhotoUrl360} alt="" />
              </div>
              <span>{item.landingName}</span>
            </div>
          </div>
        );
      }

      if (item.type === MAPBOX_FEATURE_TYPE) {
        return (
          <div
            className="search-destinations__result-item"
            key={item.id}
          >
            <div
              className="d-flex align-items-center"
              role="button"
              onClick={onDestinationSelect(item)}
            >
              <div className="main-dropdown__item-home-search">
                <i className="icon icon-city in-black" />
              </div>
              <span>{item.placeName}</span>
            </div>
          </div>
        );
      }

      return null;
    })}
  </div>
);

SearchDestinationsComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDestinationsSearch: PropTypes.func.isRequired,
  intl: PropTypes.shape().isRequired,
  onDestinationSelect: PropTypes.func.isRequired,
  onDestinationsClear: PropTypes.func.isRequired,
  destinations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  destinationName: PropTypes.string,
};

SearchDestinationsComponent.defaultProps = {
  destinationName: null,
};

export default SearchDestinationsComponent;
