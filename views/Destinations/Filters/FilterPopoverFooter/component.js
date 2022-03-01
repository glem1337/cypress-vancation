import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import GradientButton from 'views/shared/GradientButton';

import useSharedValues from '../hooks/useSharedValues';

const FilterPopoverFooter = ({
  clearFilters,
  applyFilters,
}) => {
  const { areCampersFetching } = useSharedValues();

  return (
    <div className="search-page__filters-popover__footer">
      <Button
        type="link"
        size="large"
        onClick={clearFilters}
      >
        <FormattedMessage id="shared.clear" />
      </Button>
      <GradientButton
        className="min-w-140 ml-16"
        text={{ id: 'shared.apply' }}
        size="large"
        onClick={applyFilters}
        loading={areCampersFetching}
        disabled={areCampersFetching}
      />
    </div>
  );
};

FilterPopoverFooter.propTypes = {
  clearFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
};

export default FilterPopoverFooter;
