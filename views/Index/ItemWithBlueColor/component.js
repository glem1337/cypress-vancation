import React from 'react';
import PropTypes from 'prop-types';

const ItemWithBlueColor = ({
  id,
  content,
  state,
}) => (
  <React.Fragment key={id}>
    {
      state ? <span className="in-blue-1000">{content}</span> : content
    }
  </React.Fragment>
);

ItemWithBlueColor.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
};

export default ItemWithBlueColor;
