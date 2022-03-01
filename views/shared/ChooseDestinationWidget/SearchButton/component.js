import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import useButtonGradient from 'utils/hooks/useButtonGradient';

const SearchButton = ({ onClick }) => {
  const { containerRef } = useButtonGradient();

  return (
    <Button
      className="main-btn--gradient ant-btn-icon-only d-none d-md-inline-block choose-destination__search_btn"
      size="large"
      shape="circle"
      icon={<i className="icon icon-search" />}
      onClick={onClick}
      ref={containerRef}
    >
      <span className="main-btn__gradient-inner" />
    </Button>
  );
};

SearchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchButton;
