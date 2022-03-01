import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Switch } from 'antd';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

const ToggleMap = () => {
  const {
    isSearchResultsPage,
    isDesktopMapVisible,
    toggleDesktopMapVisibility,
  } = useDestinationPageStats();

  if (!isSearchResultsPage) {
    return null;
  }

  return (
    <div className="d-flex align-items-center ml-auto">
      <span className="mr-8">
        <FormattedMessage id="shared.mapView" />
      </span>
      <Switch
        defaultChecked={isDesktopMapVisible}
        onChange={toggleDesktopMapVisibility}
      />
    </div>
  );
};

export default ToggleMap;
