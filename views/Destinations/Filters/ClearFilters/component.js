import React from 'react';
import { Divider, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

const ClearFilters = () => {
  const {
    isAnyFilterApplied,
    clearAllFilters,
  } = useDestinationPageStats();

  if (!isAnyFilterApplied) {
    return null;
  }

  return (
    <>
      <Divider type="vertical" />
      <Button
        type="simple-text"
        size="large"
        onClick={clearAllFilters}
      >
        <FormattedMessage id="shared.clearFilters" />
      </Button>
    </>
  );
};

export default ClearFilters;
