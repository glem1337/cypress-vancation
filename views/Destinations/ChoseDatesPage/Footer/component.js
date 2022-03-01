import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import GradientButton from 'views/shared/GradientButton';

const Footer = ({ search }) => (
  <div className="search-destinations__footer">
    <GradientButton
      size="large"
      className="min-w-140"
      onClick={search}
      text={{ id: 'shared.search' }}
      icon={<SearchOutlined style={{ fontSize: 22 }} />}
    />
  </div>
);

Footer.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Footer;
