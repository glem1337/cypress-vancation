import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from 'views/shared/Input';

const SearchListComponent = ({ onChange, onClear, value, className }) => (
  <div className={classNames('flex-grow-1 relative', className)}>
    <span className="main-page__search-icon icon icon-search" />

    <Input
      className="mb-0"
      placeholder={{ id: 'shared.search' }}
      size="small"
      kind="search"
      onChange={onChange}
      value={value}
    />

    {value && (
      <button
        className="main-page__search-icon main-page__search-icon--clear icon icon-cross"
        type="button"
        onClick={onClear}
      />
    )}
  </div>
);

SearchListComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SearchListComponent.defaultProps = {
  className: '',
};

export default SearchListComponent;
