import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import { CHOOSE_DESTINATION_WIDGET_SIZE } from 'constants/searchDestinations';
import isMobileView from 'utils/breakpoints/isMobileView';
import ChooseDestinationWidget from 'views/shared/ChooseDestinationWidget';

const SearchSectionComponent = ({
  isStartInputVisible,
  isChooseDestinationVisible,
  intl,
  onStartInputFocus,
}) => (
  <div className="choose-destination__search-section">
    {isStartInputVisible && (
      <div className="choose-destination__start-search-wrapper">
        <Input
          className="choose-destination__start-search"
          onFocus={onStartInputFocus}
          prefix={<i className="icon icon-search in-gray-500" />}
          placeholder={intl.formatMessage({ id: 'shared.startYourSearch' })}
        />
        <Button
          className="main-btn--gradient ant-btn-icon-only choose-destination__start-search-button"
          size="small"
          shape="circle"
          icon={<i className="icon icon-search font-20" />}
        >
          <span className="main-btn__gradient-inner" />
        </Button>
      </div>
    )}
    {isChooseDestinationVisible && (
      <ChooseDestinationWidget
        size={CHOOSE_DESTINATION_WIDGET_SIZE.SMALL}
        focusOnMount={!isMobileView()}
      />
    )}
  </div>
);

SearchSectionComponent.propTypes = {
  isStartInputVisible: PropTypes.bool,
  isChooseDestinationVisible: PropTypes.bool,
  intl: PropTypes.shape().isRequired,
  onStartInputFocus: PropTypes.func.isRequired,
};

SearchSectionComponent.defaultProps = {
  isStartInputVisible: true,
  isChooseDestinationVisible: false,
};

export default SearchSectionComponent;
