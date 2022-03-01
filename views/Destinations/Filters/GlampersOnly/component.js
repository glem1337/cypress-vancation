import React from 'react';
import classnames from 'classnames';

import useGlamperOnly from '../hooks/useGlamperOnly';

const GlampersOnly = () => {
  const { renderGlamperOnlyWidget, isGlamper } = useGlamperOnly();

  return (
    <div
      className={
        classnames(
          'search-page__filters-toggle',
          { 'search-page__filters-toggle--inactive': !isGlamper },
        )
      }
    >
      <div className="search-page__filters-toggle-inner">
        {renderGlamperOnlyWidget()}
      </div>
    </div>
  );
};

export default GlampersOnly;
